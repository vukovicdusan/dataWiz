"use client";

import { useEffect, useState } from "react";
import { UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";
import type { ResolvedChannel } from "@/lib/url-builder/teamChannels";

type ActionResult = { ok: true } | { ok: false; error: string };

export type ChannelDialogValues = {
  name: string;
} & Record<UtmParam, string>;

type ChannelEditDialogProps = {
  /** Channel being edited, or null for "Create custom channel". */
  channel: ResolvedChannel | null;
  /** Runs upsertChannel. The dialog closes itself on success. */
  onSave: (values: ChannelDialogValues) => Promise<ActionResult>;
  /** Edit mode only: opens the delete confirmation (parent owns it). */
  onRequestDelete?: () => void;
  onClose: () => void;
};

const inputClass =
  "mt-1 w-full rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200 focus:border-primaryAccent focus:outline-none";

// Mount/unmount per open: state initializes on mount and is never synced after.
const ChannelEditDialog = ({
  channel,
  onSave,
  onRequestDelete,
  onClose,
}: ChannelEditDialogProps) => {
  const [name, setName] = useState(channel?.label ?? "");
  const [values, setValues] = useState<Record<UtmParam, string>>({
    source: channel?.defaults.source ?? "",
    medium: channel?.defaults.medium ?? "",
    campaign: channel?.defaults.campaign ?? "",
    term: channel?.defaults.term ?? "",
    content: channel?.defaults.content ?? "",
  });
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCreate = channel === null;
  const isNoticeOnly = channel?.noticeOnly ?? false;
  const title =
    channel === null ? "Create custom channel" : `Edit ${channel.label}`;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !working) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, working]);

  const handleSave = async () => {
    if (working) return;
    if (!name.trim()) {
      setError("Enter a channel name.");
      return;
    }
    setWorking(true);
    setError(null);
    try {
      const result = await onSave({ name: name.trim(), ...values });
      if (result.ok) {
        onClose();
      } else {
        setError(result.error);
        setWorking(false);
      }
    } catch {
      setError("Could not reach the server. Please try again.");
      setWorking(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBg/80 px-4"
      onClick={() => {
        if (!working) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-secondaryBg/60 bg-secondaryAccent p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white">{title}</h2>

        <label
          htmlFor="channel-name"
          className="mt-5 block text-sm font-bold text-gray-200"
        >
          Channel name <span className="text-primaryAccent">*</span>
        </label>
        <input
          id="channel-name"
          type="text"
          value={name}
          onChange={(event) => {
            setError(null);
            setName(event.target.value);
          }}
          autoComplete="off"
          className={inputClass}
        />

        {isNoticeOnly ? (
          <p className="mt-4 text-sm text-gray-300">
            Google Ads tags links automatically with a GCLID, so this channel
            has no template values to edit. It only shows a notice in the
            builder.
          </p>
        ) : (
          <div className="mt-4 space-y-3.5">
            {UTM_PARAMS.map((param) => (
              <div key={param}>
                <label
                  htmlFor={`channel-${param}`}
                  className="block text-sm font-bold text-gray-200"
                >
                  utm_{param}
                </label>
                <input
                  id={`channel-${param}`}
                  type="text"
                  value={values[param]}
                  onChange={(event) => {
                    setError(null);
                    setValues((previous) => ({
                      ...previous,
                      [param]: event.target.value,
                    }));
                  }}
                  autoComplete="off"
                  className={inputClass}
                />
              </div>
            ))}
            <p className="text-xs text-gray-400">
              All values are optional. Placeholders like {"{{campaign.name}}"}
              {" "}or [location] are kept as written.
            </p>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between gap-2.5">
          <div>
            {!isCreate && onRequestDelete && (
              <button
                type="button"
                onClick={onRequestDelete}
                disabled={working}
                className="text-sm font-bold text-red-300 underline transition hover:text-red-200 disabled:opacity-60"
              >
                Delete channel
              </button>
            )}
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={working}
              className="rounded-md border border-secondaryBg/60 px-4 py-2 text-sm font-bold text-gray-200 transition hover:bg-secondaryBg/30 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={working}
              className="rounded-md bg-primaryAccent px-4 py-2 text-sm font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
            >
              {working ? "Saving..." : isCreate ? "Create channel" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelEditDialog;
