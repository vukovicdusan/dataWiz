"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CHANNELS } from "@/lib/utm/channels";
import type { ResolvedChannel } from "@/lib/url-builder/teamChannels";
import {
  deleteChannels,
  reorderChannels,
  restoreDefaultChannels,
  setChannelsVisibility,
  upsertChannel,
  type ChannelActionResult,
} from "@/app/url-builder/channels/channel-actions";
import ChannelEditDialog, {
  type ChannelDialogValues,
} from "@/components/url-builder/channels/ChannelEditDialog";
import ConfirmDialog from "@/components/url-builder/channels/ConfirmDialog";

type ChannelsManagerProps = {
  /** Full team list in dropdown order, hidden channels included. */
  initialChannels: ResolvedChannel[];
};

type DialogState =
  | { type: "edit"; channel: ResolvedChannel }
  | { type: "create" }
  | { type: "confirm-delete"; keys: string[] }
  | { type: "confirm-restore" }
  | null;

type Status =
  | { kind: "saving" }
  | { kind: "success" | "error"; text: string };

const GENERIC_ERROR = "Something went wrong. Your change was not saved.";

/** The factory list, used to render the restore result instantly. */
const builtinChannels = (): ResolvedChannel[] =>
  CHANNELS.map((template) => ({
    key: template.id,
    label: template.label,
    noticeOnly: template.noticeOnly,
    visible: true,
    isBuiltin: true,
    defaults: { ...template.defaults },
  }));

const countText = (count: number, suffix: string) =>
  count === 1 ? `1 channel ${suffix}` : `${count} channels ${suffix}`;

const ChannelsManager = ({ initialChannels }: ChannelsManagerProps) => {
  const router = useRouter();
  const [items, setItems] = useState(initialChannels);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dialog, setDialog] = useState<DialogState>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // router.refresh() after each successful action re-renders the server
  // page with fresh props; adopt them as the confirmed state. Also prune
  // any selected keys that no longer exist in the fresh list so the bulk
  // bar cannot reference phantom channels.
  useEffect(() => {
    setItems(initialChannels);
    setSelected((previous) => {
      const valid = new Set(initialChannels.map((channel) => channel.key));
      const next = Array.from(previous).filter((key) => valid.has(key));
      return next.length === previous.size ? previous : new Set(next);
    });
  }, [initialChannels]);

  useEffect(
    () => () => {
      if (statusTimer.current) clearTimeout(statusTimer.current);
    },
    []
  );

  const showStatus = (kind: Status["kind"], text: string) => {
    if (statusTimer.current) clearTimeout(statusTimer.current);
    setStatus({ kind, text });
    statusTimer.current = setTimeout(() => setStatus(null), 4000);
  };

  // In-flight feedback. No auto-dismiss timer: the saving state persists
  // until the action resolves and showStatus replaces it (or the dialog
  // path clears it). Clearing any pending timer stops an old success or
  // error message from wiping out a fresh "Saving..." mid-flight.
  const showSaving = () => {
    if (statusTimer.current) clearTimeout(statusTimer.current);
    setStatus({ kind: "saving" });
  };

  // Optimistic update: show `next` immediately, run the action, revert
  // to the previous server-confirmed state on failure.
  const runAction = async (
    next: ResolvedChannel[],
    action: () => Promise<ChannelActionResult>,
    successText: string
  ): Promise<ChannelActionResult> => {
    const previous = items;
    setItems(next);
    showSaving();
    try {
      const result = await action();
      if (result.ok) {
        showStatus("success", successText);
        router.refresh();
      } else {
        setItems(previous);
        showStatus("error", result.error);
      }
      return result;
    } catch {
      setItems(previous);
      showStatus("error", GENERIC_ERROR);
      return { ok: false, error: GENERIC_ERROR };
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((channel) => channel.key === active.id);
    const newIndex = items.findIndex((channel) => channel.key === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(items, oldIndex, newIndex);
    void runAction(
      next,
      () => reorderChannels(next.map((channel) => channel.key)),
      "Order saved"
    );
  };

  const handleToggleVisible = (channel: ResolvedChannel) => {
    const visible = !channel.visible;
    const next = items.map((candidate) =>
      candidate.key === channel.key ? { ...candidate, visible } : candidate
    );
    void runAction(
      next,
      () => setChannelsVisibility([channel.key], visible),
      visible ? "Channel shown" : "Channel hidden"
    );
  };

  const handleBulkVisibility = (visible: boolean) => {
    const keys = Array.from(selected);
    if (keys.length === 0) return;
    const keySet = new Set(keys);
    const next = items.map((candidate) =>
      keySet.has(candidate.key) ? { ...candidate, visible } : candidate
    );
    void runAction(
      next,
      () => setChannelsVisibility(keys, visible),
      countText(keys.length, visible ? "shown" : "hidden")
    );
  };

  // Shared by the bulk Delete button and the dialog's "Delete channel".
  const confirmDelete = (keys: string[]) => async () => {
    const keySet = new Set(keys);
    const next = items.filter((candidate) => !keySet.has(candidate.key));
    const result = await runAction(
      next,
      () => deleteChannels(keys),
      keys.length === 1 ? "Channel deleted" : countText(keys.length, "deleted")
    );
    if (result.ok) {
      setSelected(
        (previous) =>
          new Set(Array.from(previous).filter((key) => !keySet.has(key)))
      );
    }
    return result;
  };

  const handleDialogSave =
    (key: string | null) =>
    async (values: ChannelDialogValues): Promise<ChannelActionResult> => {
      showSaving();
      try {
        const result = await upsertChannel({ key, ...values });
        if (result.ok) {
          showStatus("success", key ? "Channel saved" : "Channel created");
          router.refresh();
        } else {
          // The dialog shows the error itself (its own role="alert" line),
          // exactly as before. Just stop the spinner.
          setStatus(null);
        }
        return result;
      } catch (err) {
        setStatus(null);
        throw err;
      }
    };

  const toggleSelected = (key: string, checked: boolean) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (checked) next.add(key);
      else next.delete(key);
      return next;
    });

  const selectedCount = selected.size;

  // One link, two jobs: with nothing selected it selects everything, with
  // any selection (even partial) it clears, matching its visible label.
  const handleSelectAll = () =>
    setSelected(
      selectedCount > 0
        ? new Set()
        : new Set(items.map((channel) => channel.key))
    );

  return (
    <section className="w-full rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Channels</h1>
          <p className="mt-1 text-sm text-gray-400">
            Reorder, hide, edit, or add the channels your team uses in the
            builder. Changes apply to the whole team right away.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDialog({ type: "create" })}
          className="rounded-md bg-primaryAccent px-4 py-2 text-sm font-bold text-white transition hover:bg-primaryAccent/80"
        >
          + Create custom channel
        </button>
      </div>

      <div aria-live="polite" className="mt-3 min-h-[1.25rem]">
        {status?.kind === "saving" && (
          <p role="status" className="flex items-center gap-2 text-sm text-blue-300">
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-blue-300/30 border-t-blue-300"
            />
            Saving...
          </p>
        )}
        {status?.kind === "success" && (
          <p role="status" className="text-sm text-green-300">
            {status.text}
          </p>
        )}
        {status?.kind === "error" && (
          <p role="alert" className="text-sm text-red-300">
            {status.text}
          </p>
        )}
      </div>

      {/* Bulk actions share the always-present Select all row so the channel
          list never jumps when a checkbox is ticked. The left side is made
          invisible (not unmounted) while nothing is selected: that keeps
          Select all pinned right and removes the hidden buttons from tab
          order and the accessibility tree. min-h matches the buttons so the
          row height is the same with and without a selection. */}
      <div className="mt-4 flex min-h-[1.875rem] flex-wrap items-center justify-between gap-2.5">
        <div
          className={`flex flex-wrap items-center gap-2.5 ${
            selectedCount === 0 ? "invisible" : ""
          }`}
        >
          <span className="text-xs text-gray-300">
            {selectedCount === 1 ? "1 selected" : `${selectedCount} selected`}
          </span>
          <button
            type="button"
            onClick={() => handleBulkVisibility(false)}
            className="rounded-md border border-secondaryBg/60 px-3 py-1.5 text-xs font-bold text-gray-200 transition hover:bg-secondaryBg/30"
          >
            Hide
          </button>
          <button
            type="button"
            onClick={() => handleBulkVisibility(true)}
            className="rounded-md border border-secondaryBg/60 px-3 py-1.5 text-xs font-bold text-gray-200 transition hover:bg-secondaryBg/30"
          >
            Show
          </button>
          <button
            type="button"
            onClick={() =>
              setDialog({ type: "confirm-delete", keys: Array.from(selected) })
            }
            className="rounded-md border border-red-500/60 px-3 py-1.5 text-xs font-bold text-red-300 transition hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-xs text-blue-300 underline transition hover:text-blue-200"
        >
          {selectedCount > 0 ? "Clear selection" : "Select all"}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((channel) => channel.key)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="mt-2 space-y-2">
            {items.map((channel, index) => (
              <SortableRow
                key={channel.key}
                channel={channel}
                index={index}
                checked={selected.has(channel.key)}
                onCheck={(checked) => toggleSelected(channel.key, checked)}
                onToggleVisible={() => handleToggleVisible(channel)}
                onEdit={() => setDialog({ type: "edit", channel })}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="mt-5 border-t border-secondaryBg/40 pt-4">
        <button
          type="button"
          onClick={() => setDialog({ type: "confirm-restore" })}
          className="text-sm text-blue-300 underline transition hover:text-blue-200"
        >
          Restore default channels
        </button>
      </div>

      {dialog?.type === "create" && (
        <ChannelEditDialog
          channel={null}
          onSave={handleDialogSave(null)}
          onClose={() => setDialog(null)}
        />
      )}

      {dialog?.type === "edit" && (
        <ChannelEditDialog
          channel={dialog.channel}
          onSave={handleDialogSave(dialog.channel.key)}
          onRequestDelete={() =>
            setDialog({ type: "confirm-delete", keys: [dialog.channel.key] })
          }
          onClose={() => setDialog(null)}
        />
      )}

      {dialog?.type === "confirm-delete" && (
        <ConfirmDialog
          title={
            dialog.keys.length === 1
              ? "Delete this channel?"
              : `Delete ${dialog.keys.length} channels?`
          }
          body="It disappears from the builder dropdown for the whole team. Links already in History keep their channel name."
          confirmLabel={
            dialog.keys.length === 1
              ? "Delete channel"
              : `Delete ${dialog.keys.length} channels`
          }
          workingLabel="Deleting..."
          onConfirm={confirmDelete(dialog.keys)}
          onClose={() => setDialog(null)}
        />
      )}

      {dialog?.type === "confirm-restore" && (
        <ConfirmDialog
          title="Restore default channels?"
          body="This resets names, values, order, and visibility to the factory list. Custom channels are removed permanently."
          confirmLabel="Restore defaults"
          workingLabel="Restoring..."
          onConfirm={() =>
            runAction(
              builtinChannels(),
              restoreDefaultChannels,
              "Defaults restored"
            )
          }
          onClose={() => setDialog(null)}
        />
      )}
    </section>
  );
};

type SortableRowProps = {
  channel: ResolvedChannel;
  index: number;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  onToggleVisible: () => void;
  onEdit: () => void;
};

const SortableRow = ({
  channel,
  index,
  checked,
  onCheck,
  onToggleVisible,
  onEdit,
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: channel.key });

  const preview = channel.noticeOnly
    ? "Tags links automatically"
    : channel.defaults.source || channel.defaults.medium
      ? [channel.defaults.source, channel.defaults.medium]
          .filter(Boolean)
          .join(" / ")
      : "No template values";

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-xl border border-secondaryBg/50 bg-primaryBg/40 px-3 py-2.5 ${
        isDragging ? "relative z-10 opacity-80 shadow-2xl" : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Reorder ${channel.label}`}
        className="cursor-grab touch-none rounded p-1 text-gray-500 transition hover:text-gray-300"
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="9" cy="5" r="1.7" />
          <circle cx="15" cy="5" r="1.7" />
          <circle cx="9" cy="12" r="1.7" />
          <circle cx="15" cy="12" r="1.7" />
          <circle cx="9" cy="19" r="1.7" />
          <circle cx="15" cy="19" r="1.7" />
        </svg>
      </button>
      <span className="w-6 shrink-0 text-right text-sm text-gray-400">
        {index + 1}.
      </span>
      <div className={`min-w-0 flex-1 ${channel.visible ? "" : "opacity-50"}`}>
        <p className="truncate text-sm font-bold text-gray-200">
          {channel.label}
        </p>
        <p className="truncate text-xs text-gray-400">{preview}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={channel.visible}
        aria-label={
          channel.visible
            ? `Hide ${channel.label} in the builder`
            : `Show ${channel.label} in the builder`
        }
        onClick={onToggleVisible}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          channel.visible ? "bg-primaryAccent" : "bg-secondaryBg/60"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
            channel.visible ? "left-[18px]" : "left-0.5"
          }`}
        />
      </button>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${channel.label}`}
        className="shrink-0 rounded-md border border-secondaryBg/60 p-2 text-gray-300 transition hover:bg-secondaryBg/30"
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      </button>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheck(event.target.checked)}
        aria-label={`Select ${channel.label}`}
        className="shrink-0"
      />
    </li>
  );
};

export default ChannelsManager;
