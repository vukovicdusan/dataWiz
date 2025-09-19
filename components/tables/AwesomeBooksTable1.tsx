import React from "react";

const AwesomeBooksTable1 = () => {
  return (
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="">
          <th className="border border-gray-300 p-2 text-left">PLATFORM</th>
          <th className="border border-gray-300 p-2 text-left">BASELINE</th>
          <th className="border border-gray-300 p-2 text-left">
            INDUSTRY AVERAGE
          </th>
          <th className="border border-gray-300 p-2 text-left">
            PROJECT TARGET
          </th>
          <th className="border border-gray-300 p-2 text-left">
            FINAL OUTCOME
          </th>
          <th className="border border-gray-300 p-2 text-left">UPLIFT</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2">GA4</td>
          <td className="border border-gray-300 p-2">61.3%</td>
          <td className="border border-gray-300 p-2">70-80%</td>
          <td className="border border-gray-300 p-2">90%</td>
          <td className="border border-gray-300 p-2">98.7%</td>
          <td className="border border-gray-300 p-2">37.4% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2">Google Ads</td>
          <td className="border border-gray-300 p-2">61.3%</td>
          <td className="border border-gray-300 p-2">70-80%</td>
          <td className="border border-gray-300 p-2">90%</td>
          <td className="border border-gray-300 p-2">99.2%</td>
          <td className="border border-gray-300 p-2">37.9% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2">Meta Ads</td>
          <td className="border border-gray-300 p-2">63.5%</td>
          <td className="border border-gray-300 p-2">70-80%</td>
          <td className="border border-gray-300 p-2">90%</td>
          <td className="border border-gray-300 p-2">99.1%</td>
          <td className="border border-gray-300 p-2">35.6% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2">TikTok Ads</td>
          <td className="border border-gray-300 p-2">62.9%</td>
          <td className="border border-gray-300 p-2">70-80%</td>
          <td className="border border-gray-300 p-2">90%</td>
          <td className="border border-gray-300 p-2">97.6%</td>
          <td className="border border-gray-300 p-2">34.7% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2">Microsoft Ads</td>
          <td className="border border-gray-300 p-2">60%</td>
          <td className="border border-gray-300 p-2">70-80%</td>
          <td className="border border-gray-300 p-2">90%</td>
          <td className="border border-gray-300 p-2">97.4%</td>
          <td className="border border-gray-300 p-2">37.4% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2">Pinterest Ads</td>
          <td className="border border-gray-300 p-2">No Tracking</td>
          <td className="border border-gray-300 p-2">70-80%</td>
          <td className="border border-gray-300 p-2">90%</td>
          <td className="border border-gray-300 p-2">97.9%</td>
          <td className="border border-gray-300 p-2">97.9% more data</td>
        </tr>
        <tr className="hover:bg-gray-50/30">
          <td className="border border-gray-300 p-2">Reddit Ads</td>
          <td className="border border-gray-300 p-2">No Tracking</td>
          <td className="border border-gray-300 p-2">70-80%</td>
          <td className="border border-gray-300 p-2">90%</td>
          <td className="border border-gray-300 p-2">97.2%</td>
          <td className="border border-gray-300 p-2">97.2% more data</td>
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
