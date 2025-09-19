import React from "react";

const AwesomeBooksTable2 = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">PLATFORM</th>
            <th className="border border-gray-300 p-2 text-left">
              HEALTH BASELINE
            </th>
            <th className="border border-gray-300 p-2 text-left">
              FINAL OUTCOME
            </th>
            <th className="border border-gray-300 p-2 text-left">UPLIFT</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2">GA4 Direct</td>
            <td className="border border-gray-300 p-2">12%</td>
            <td className="border border-gray-300 p-2">6%</td>
            <td className="border border-gray-300 p-2">
              6% more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2">Google Ads User Data</td>
            <td className="border border-gray-300 p-2">No Data</td>
            <td className="border border-gray-300 p-2">—</td>
            <td className="border border-gray-300 p-2">
              100% more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2">Meta Ads User Data</td>
            <td className="border border-gray-300 p-2">No Data</td>
            <td className="border border-gray-300 p-2">—</td>
            <td className="border border-gray-300 p-2">
              100% more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2">TikTok Ads User Data</td>
            <td className="border border-gray-300 p-2">No Data</td>
            <td className="border border-gray-300 p-2">—</td>
            <td className="border border-gray-300 p-2">
              100% more events attributed
            </td>
          </tr>
          <tr className="hover:bg-gray-50/30">
            <td className="border border-gray-300 p-2">
              Microsoft Ads User Data
            </td>
            <td className="border border-gray-300 p-2">No Data</td>
            <td className="border border-gray-300 p-2">—</td>
            <td className="border border-gray-300 p-2">
              100% more events attributed
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AwesomeBooksTable2;
