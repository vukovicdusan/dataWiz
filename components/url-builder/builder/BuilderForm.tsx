"use client";

import { useState } from "react";
import {
  EXAMPLE_VALUES,
  OPTIONAL_PARAMS,
  REQUIRED_PARAMS,
  UTM_PARAMS,
  type UtmParam,
} from "@/lib/utm/channels";
import { buildUrl, buildQueryString, type UtmValues } from "@/lib/utm/build";
import { collectWarnings } from "@/lib/utm/validate";
import {
  saveCustomValue,
  deleteCustomValue,
  saveBaseUrl,
  saveGeneratedUrl,
} from "@/app/url-builder/dashboard/builder-actions";
import type { TeamCustomValues } from "@/lib/url-builder/customValues";
import type { TeamHistoryValues } from "@/lib/url-builder/historyValues";
import type { ResolvedChannel } from "@/lib/url-builder/teamChannels";
import ParamField from "@/components/url-builder/builder/ParamField";
import BaseUrlField from "@/components/url-builder/builder/BaseUrlField";
import PreviewPanel from "@/components/url-builder/builder/PreviewPanel";
import ChannelNotice from "@/components/url-builder/builder/ChannelNotice";
import ChannelPicker from "@/components/url-builder/builder/ChannelPicker";

const EMPTY_VALUES: UtmValues = {
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
};

type BuilderFormProps = {
  channels: ResolvedChannel[];
  initialCustomValues: TeamCustomValues;
  initialBaseUrls: string[];
  historyValues: TeamHistoryValues;
};

const BuilderForm = ({
  channels,
  initialCustomValues,
  initialBaseUrls,
  historyValues,
}: BuilderFormProps) => {
  const [channelKey, setChannelKey] = useState("");
  const [baseUrl, setBaseUrl] = useState(initialBaseUrls[0] ?? "");
  const [savedBaseUrls, setSavedBaseUrls] = useState(initialBaseUrls);
  const [values, setValues] = useState<UtmValues>(EMPTY_VALUES);
  const [customValues, setCustomValues] =
    useState<TeamCustomValues>(initialCustomValues);

  const channel: ResolvedChannel | null =
    channels.find((candidate) => candidate.key === channelKey) ?? null;
  const isNoticeOnly = channel?.noticeOnly ?? false;

  const handleChannelChange = (nextKey: string) => {
    setChannelKey(nextKey);
    const next = channels.find((candidate) => candidate.key === nextKey);
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

  const handleSaveBaseUrl = async (valueToSave: string) => {
    return saveBaseUrl(valueToSave);
  };

  const handleBaseUrlSaved = (normalized: string) => {
    setSavedBaseUrls((previous) =>
      previous.includes(normalized)
        ? previous
        : [normalized, ...previous]
    );
  };

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

  const handleDeleteForTeam =
    (param: UtmParam) => async (valueToDelete: string) => {
      // Optimistic: drop the value right away, restore it if the server
      // says no so the list never lies for long.
      setCustomValues((previous) => ({
        ...previous,
        [param]: previous[param].filter((value) => value !== valueToDelete),
      }));
      const result = await deleteCustomValue(param, valueToDelete);
      if (!result.ok) {
        setCustomValues((previous) =>
          previous[param].includes(valueToDelete)
            ? previous
            : {
                ...previous,
                [param]: [...previous[param], valueToDelete].sort(),
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
  const queryString = buildQueryString(values);
  const warnings = collectWarnings({
    baseUrl,
    values,
    templateDefaults,
    historyValues,
  });
  // channel === null also covers a stale key whose channel was hidden or
  // deleted by a teammate after selection.
  const copyDisabled =
    isNoticeOnly ||
    channel === null ||
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
      channel: channelKey,
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
      onDeleteForTeam={handleDeleteForTeam(param)}
      infoNote={
        param === "content"
          ? "The template values are recommended values. Feel free to change them."
          : undefined
      }
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
        <ChannelPicker
          channels={channels}
          value={channelKey}
          onChange={handleChannelChange}
        />

        {isNoticeOnly ? (
          <div className="mt-6">
            <ChannelNotice />
          </div>
        ) : (
          <>
            <div className="mt-5">
              <BaseUrlField
                value={baseUrl}
                savedUrls={savedBaseUrls}
                onChange={setBaseUrl}
                onSave={handleSaveBaseUrl}
                onSaved={handleBaseUrlSaved}
              />
            </div>

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
          queryString={queryString}
          warnings={warnings}
          copyDisabled={copyDisabled}
          onCopy={handleCopy}
        />
      )}
    </div>
  );
};

export default BuilderForm;
