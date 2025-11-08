import React from "react";

const AwesomeBooksTable1 = () => {
  return (
    <table className="w-full border-collapse border border-gray-300 md:text-sm text-xs">
      <thead>
        <tr className="">
          <th className="border border-gray-300 p-2 text-left text-[1rem]">PLATFORM</th>
          <th className="border border-gray-300 p-2 text-left text-[1rem]">BASELINE</th>
          <th className="border border-gray-300 p-2 text-left text-[1rem]">
            INDUSTRY AVERAGE
          </th>
          <th className="border border-gray-300 p-2 text-left text-[1rem]">
            PROJECT TARGET
          </th>
          <th className="border border-gray-300 p-2 text-left text-[1rem]">
            FINAL OUTCOME
          </th>
          <th className="border border-gray-300 p-2 text-left text-[1rem]">UPLIFT</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2 text-[1rem]">GA4</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-red-500">61.3%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">70-80%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">90%</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-green-400">98.7%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">37.4% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2 text-[1rem]">Google Ads</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-red-500">61.3%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">70-80%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">90%</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-green-400">99.2%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">37.9% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2 text-[1rem]">Meta Ads</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-red-500">63.5%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">70-80%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">90%</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-green-400">99.1%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">35.6% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2 text-[1rem]">TikTok Ads</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-red-500">62.9%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">70-80%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">90%</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-green-400">97.6%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">34.7% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2 text-[1rem]">Microsoft Ads</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-red-500">60%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">70-80%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">90%</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-green-400">97.4%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">37.4% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2 text-[1rem]">Pinterest Ads</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-red-500">No Tracking</td>
          <td className="border border-gray-300 p-2 text-[1rem]">70-80%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">90%</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-green-400">97.9%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">97.9% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2 text-[1rem]">Reddit Ads</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-red-500">No Tracking</td>
          <td className="border border-gray-300 p-2 text-[1rem]">70-80%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">90%</td>
          <td className="border border-gray-300 p-2 text-[1rem] text-green-400">97.2%</td>
          <td className="border border-gray-300 p-2 text-[1rem]">97.2% more data</td>
        </tr>
        <tr className="font-semibold">
          <td className="border border-gray-300 p-2 text-center" colSpan={3}>
            AVERAGE UPLIFT
          </td>
          <td className="border border-gray-300 p-2 text-center" colSpan={3}>
            54% more data
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AwesomeBooksTable1;
