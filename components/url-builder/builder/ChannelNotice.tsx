const ChannelNotice = () => {
  return (
    <div className="rounded-xl border border-secondaryBg/60 bg-primaryBg/60 p-5">
      <h2 className="text-lg font-bold text-white">
        Google Ads tags links automatically
      </h2>
      <p className="mt-3 text-sm text-gray-300">
        Google Ads adds a GCLID to every ad click and reports the campaign
        data in GA4 on its own. Do not add UTM parameters to Google Ads
        links: they can interfere with that automatic tagging.
      </p>
      <p className="mt-3 text-sm text-gray-300">
        No URL is generated for this channel. Pick another channel to build a
        tagged link.
      </p>
    </div>
  );
};

export default ChannelNotice;
