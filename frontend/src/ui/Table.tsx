import { Column } from "@/types/table";
import { ReactNode } from "react";
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={String(column.accessor)}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  <div className="text-sm text-gray-900">
                    {column.cell
                      ? column.cell(item)
                      : (item[column.accessor] as ReactNode)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
