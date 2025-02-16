import React from "react";
import Select from "@/ui/Select";
import Switch from "@/ui/Switch";

export interface ColumnMappingProps {
  columns: string[];
  mapping: {
    firstName: number;
    lastName: number;
    numberOfTickets: number;
    notes: number;
  };
  onChange: (
    field: keyof ColumnMappingProps["mapping"],
    colName: string
  ) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const FIELD_LABELS: Record<keyof ColumnMappingProps["mapping"], string> = {
  firstName: "First Name Column (Required)",
  lastName: "Last Name Column (Optional)",
  numberOfTickets: "Number Of Tickets Column (Optional)",
  notes: "Notes Column (Optional)",
};

const ColumnMapping: React.FC<ColumnMappingProps> = ({
  columns,
  mapping,
  onChange,
  onConfirm,
  onCancel,
}) => {
  const noneOption = { value: "", label: "(None)" };
  const dropdownOptions = [
    noneOption,
    ...columns.map((c) => ({ value: c, label: c })),
  ];

  // If mapping value is -1 return (None), otherwise match with columns[mapping[field]]
  const getCurrentColumnName = (idx: number) =>
    idx >= 0 && idx < columns.length ? columns[idx] : "";

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Column Mapping</h2>

      {(
        Object.keys(FIELD_LABELS) as (keyof ColumnMappingProps["mapping"])[]
      ).map((field) => {
        const currentIndex = mapping[field];
        const currentColName = getCurrentColumnName(currentIndex);

        return (
          <div key={field} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {FIELD_LABELS[field]}
            </label>
            <Select
              options={dropdownOptions}
              value={currentColName}
              onChange={(val) => onChange(field, val)}
              placeholder="Select a column..."
            />
          </div>
        );
      })}

      <div className="mt-6 flex gap-4">
        <button
          className="w-36 !bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="flex-1 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={onConfirm}
        >
          Confirm Mapping
        </button>
      </div>
    </div>
  );
};

export default ColumnMapping;
