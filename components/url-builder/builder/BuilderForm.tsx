"use client";

import { useState } from "react";
import {
  CHANNELS,
  EXAMPLE_VALUES,
  OPTIONAL_PARAMS,
  REQUIRED_PARAMS,
  UTM_PARAMS,
  type ChannelId,
  type ChannelTemplate,
  type UtmParam,
} from "@/lib/utm/channels";
import { buildUrl, type UtmValues } from "@/lib/utm/build";
import { collectWarnings } from "@/lib/utm/validate";
import {
  saveCustomValue,
  saveGeneratedUrl,
} from "@/app/url-builder/dashboard/builder-actions";
import type { TeamCustomValues } from "@/lib/url-builder/customValues";
import type { TeamHistoryValues } from "@/lib/url-builder/historyValues";
import ParamField from "@/components/url-builder/builder/ParamField";
import PreviewPanel from "@/components/url-builder/builder/PreviewPanel";
import ChannelNotice from "@/components/url-builder/builder/ChannelNotice";

const EMPTY_VALUES: UtmValues = {
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
};

type BuilderFormProps = {
  initialCustomValues: TeamCustomValues;
  historyValues: TeamHistoryValues;
};

const BuilderForm = ({
  initialCustomValues,
  historyValues,
}: BuilderFormProps) => {
  const [channelId, setChannelId] = useState<ChannelId | "">("");
  const [baseUrl, setBaseUrl] = useState("");
  const [values, setValues] = useState<UtmValues>(EMPTY_VALUES);
  const [customValues, setCustomValues] =
    useState<TeamCustomValues>(initialCustomValues);

  const channel: ChannelTemplate | null =
    CHANNELS.find((candidate) => candidate.id === channelId) ?? null;
  const isNoticeOnly = channel?.noticeOnly ?? false;

  const handleChannelChange = (nextId: string) => {
    setChannelId(nextId as ChannelId | "");
    const next = CHANNELS.find((candidate) => candidate.id === nextId);
    const nextValues = { ...EMPTY_VALUES };
    if (next && !next.noticeOnly) {
      UTM_PARAMS.forEach((param) => {
        nextValues[param] = next.defaults[param] ?? "";
      });
    }
    setValues(nextValues);
  };

  const setParamValue = (param: UtmParam, nextValue: string) =>
    setValues((previous) => ({ ...previous, [param]: nextValue }));

  const handleSaveForTeam =
    (param: UtmParam) => async (valueToSave: string) => {
      const result = await saveCustomValue(param, valueToSave);
      if (result.ok) {
        setCustomValues((previous) =>
          previous[param].includes(valueToSave)
            ? previous
            : {
                ...previous,
                [param]: [...previous[param], valueToSave].sort(),
              }
        );
      }
      return result;
    };

  // Explicit annotation: without it TS infers a union with {} from the
  // ternary, which cannot be indexed by UtmParam.
  const templateDefaults: Partial<Record<UtmParam, string>> =
    channel && !channel.noticeOnly ? channel.defaults : {};
  const fullUrl = buildUrl(baseUrl, values);
  const warnings = collectWarnings({
    baseUrl,
    values,
    templateDefaults,
    historyValues,
  });
  const copyDisabled =
    isNoticeOnly ||
    channelId === "" ||
    baseUrl.trim() === "" ||
    REQUIRED_PARAMS.some((param) => values[param].trim() === "");

  const handleCopy = () =>
    saveGeneratedUrl({
      baseUrl,
      source: values.source,
      medium: values.medium,
      campaign: values.campaign,
      term: values.term,
      content: values.content,
      channel: channelId,
    });

  const renderField = (param: UtmParam, required: boolean) => (
    <ParamField
      key={param}
      param={param}
      required={required}
      value={values[param]}
      onChange={(nextValue) => setParamValue(param, nextValue)}
      templateDefault={templateDefaults[param] ?? null}
      exampleValues={EXAMPLE_VALUES[param]}
      teamValues={customValues[param]}
      onSaveForTeam={handleSaveForTeam(param)}
    />
  );

  return (
    <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-6 shadow-2xl">
        <h1 className="text-2xl font-bold text-white">Build a tagged link</h1>

        <label
          htmlFor="channel-picker"
          className="mt-5 block text-sm font-bold text-gray-200"
        >
          Channel <span className="text-primaryAccent">*</span>
        </label>
        <select
          id="channel-picker"
          value={channelId}
          onChange={(event) => handleChannelChange(event.target.value)}
          className="mt-1 w-full rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200 focus:border-primaryAccent focus:outline-none"
        >
          <option value="">Select a channel</option>
          {CHANNELS.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.label}
            </option>
          ))}
        </select>

        {isNoticeOnly ? (
          <div className="mt-6">
            <ChannelNotice />
          </div>
        ) : (
          <>
            <label
              htmlFor="base-url"
              className="mt-5 block text-sm font-bold text-gray-200"
            >
              Base URL <span className="text-primaryAccent">*</span>
            </label>
            <input
              id="base-url"
              type="text"
              value={baseUrl}
              onChange={(event) => setBaseUrl(event.target.value)}
              placeholder="https://example.com/page"
              autoComplete="off"
              className="mt-1 w-full rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200 focus:border-primaryAccent focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-400">
              Only tag links that point to other websites, never your own
              internal links.
            </p>

            <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-gray-400">
              Required
            </h2>
            <div className="mt-2 space-y-4">
              {REQUIRED_PARAMS.map((param) => renderField(param, true))}
            </div>

            <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-gray-400">
              Optional
            </h2>
            <div className="mt-2 space-y-4">
              {OPTIONAL_PARAMS.map((param) => renderField(param, false))}
            </div>
          </>
        )}
      </section>

      {!isNoticeOnly && (
        <PreviewPanel
          fullUrl={fullUrl}
          warnings={warnings}
          copyDisabled={copyDisabled}
          onCopy={handleCopy}
        />
      )}
    </div>
  );
};

export default BuilderForm;
