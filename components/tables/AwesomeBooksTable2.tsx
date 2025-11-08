import React from "react";

const AwesomeBooksTable2 = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 md:text-sm text-xs">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-[1rem] text-left">PLATFORM</th>
            <th className="border border-gray-300 p-2 text-[1rem] text-left">HEALTH</th>
            <th className="border border-gray-300 p-2 text-[1rem] text-left">BASELINE</th>
            <th className="border border-gray-300 p-2 text-[1rem] text-left">
              FINAL OUTCOME
            </th>
            <th className="border border-gray-300 p-2 text-[1rem] text-left">UPLIFT</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2 text-[1rem]">GA4</td>
            <td className="border border-gray-300 p-2 text-[1rem]">Direct</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-red-500">12%</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-green-400">6%</td>
            <td className="border border-gray-300 p-2 text-[1rem]">
              6% more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2 text-[1rem]">Google Ads</td>
            <td className="border border-gray-300 p-2 text-[1rem]">User Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-red-500">No Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-green-400">100%</td>
            <td className="border border-gray-300 p-2 text-[1rem]">
              more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2 text-[1rem]">Meta Ads</td>
            <td className="border border-gray-300 p-2 text-[1rem]">User Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-red-500">No Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-green-400">100%</td>
            <td className="border border-gray-300 p-2 text-[1rem]">
              more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2 text-[1rem]">TikTok Ads</td>
            <td className="border border-gray-300 p-2 text-[1rem]">User Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-red-500">No Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-green-400">100%</td>
            <td className="border border-gray-300 p-2 text-[1rem]">
              more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2 text-[1rem]">Microsoft Ads</td>
            <td className="border border-gray-300 p-2 text-[1rem]">User Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-red-500">No Data</td>
            <td className="border border-gray-300 p-2 text-[1rem] text-green-400">100%</td>
            <td className="border border-gray-300 p-2 text-[1rem]">
              more events attributed
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AwesomeBooksTable2;
