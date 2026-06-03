import type { CaseStudyTableData } from "@/lib/caseStudies";

type CaseStudyTableProps = {
  table?: CaseStudyTableData;
};

const fallbackTable: CaseStudyTableData = {
  columns: [
    "PLATFORM",
    "BASELINE",
    "INDUSTRY AVERAGE",
    "PROJECT TARGET",
    "FINAL OUTCOME",
    "UPLIFT",
  ],
  rows: [],
};

function getCellValue(cell: CaseStudyTableData["rows"][number]["cells"][number]) {
  return typeof cell === "object" ? cell.value : cell;
}

function getCellClassName(cell: CaseStudyTableData["rows"][number]["cells"][number]) {
  const tone = typeof cell === "object" ? cell.tone : undefined;

  if (tone === "red") {
    return "text-red-500";
  }

  if (tone === "green") {
    return "text-green-400";
  }

  if (tone === "blue") {
    return "text-blue-400";
  }

  return "";
}

const AwesomeBooksTable1 = ({ table = fallbackTable }: CaseStudyTableProps) => {
  return (
    <table className="w-full border-collapse border border-gray-300 text-xs md:text-sm">
      <thead>
        <tr>
          {table.columns.map((column) => (
            <th
              key={column}
              className="border border-gray-300 p-2 text-left text-[1rem]"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, rowIndex) => (
          <tr key={`${row.cells.join("-")}-${rowIndex}`} className="hover:bg-gray-50/30">
            {row.cells.map((cell, cellIndex) => (
              <td
                key={`${getCellValue(cell)}-${cellIndex}`}
                className={`border border-gray-300 p-2 text-[1rem] ${getCellClassName(cell)}`}
              >
                {getCellValue(cell)}
              </td>
            ))}
          </tr>
        ))}
        {table.footer ? (
          <tr className="font-semibold">
            <td
              className="border border-gray-300 p-2 text-center"
              colSpan={table.footer.labelColSpan ?? Math.floor(table.columns.length / 2)}
            >
              {table.footer.label}
            </td>
            <td
              className="border border-gray-300 p-2 text-center"
              colSpan={
                table.footer.valueColSpan ??
                table.columns.length - Math.floor(table.columns.length / 2)
              }
            >
              {table.footer.value}
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

export default AwesomeBooksTable1;
