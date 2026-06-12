"use client";

import type { ResolvedChannel } from "@/lib/url-builder/teamChannels";
import SelectMenu from "@/components/url-builder/SelectMenu";

type ChannelPickerProps = {
  /** Visible team channels in dropdown order. */
  channels: ResolvedChannel[];
  /** Selected channel_key, or "" when none. */
  value: string;
  onChange: (key: string) => void;
};

// Thin wrapper over the shared SelectMenu. Keeps the exact public props,
// the "channel-picker" id (BuilderForm's label targets it via htmlFor at
// components/url-builder/builder/BuilderForm.tsx:158), and the builder's
// visuals, so the dashboard does not change.
const ChannelPicker = ({ channels, value, onChange }: ChannelPickerProps) => (
  <SelectMenu
    id="channel-picker"
    options={channels.map((channel) => ({
      value: channel.key,
      label: channel.label,
    }))}
    value={value}
    onChange={onChange}
    placeholder="Select a channel"
    ariaLabel="Channel"
    triggerClassName="mt-1"
  />
);

export default ChannelPicker;
