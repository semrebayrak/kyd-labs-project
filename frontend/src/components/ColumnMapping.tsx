import React from "react";
import Select from "@/ui/Select";

export interface ColumnMappingProps {
  mapping: {
    firstName: string;
    lastName: string;
    numberOfTickets: string;
    notes: string;
  };
  onConfirm: () => void;
  columns: string[];
  onChange: (field: keyof ColumnMappingProps["mapping"], value: string) => void;
}

const FIELD_LABELS: Record<keyof ColumnMappingProps["mapping"], string> = {
  firstName: "First Name Column (Required)",
  lastName: "Last Name Column (Optional)",
  numberOfTickets: "Number Of Tickets Column (Optional)",
  notes: "Notes Column (Optional)",
};

const ColumnMapping: React.FC<ColumnMappingProps> = ({
  mapping,
  columns,
  onChange,
  onConfirm,
}) => {
  const options = columns.map((col) => ({ value: col, label: col }));
  const noneOption = { value: "", label: "None" };
  const optionsWithNone = [noneOption, ...options];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Column Mapping
        </h2>
        <p className="text-gray-600 text-sm">
          Note: If your CSV file does not include a header row, the columns will
          be matched in the order they appear.
        </p>
      </div>
      <div className="grid gap-6">
        {(
          Object.keys(FIELD_LABELS) as (keyof ColumnMappingProps["mapping"])[]
        ).map((field) => (
          <div key={field} className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {FIELD_LABELS[field]}
            </label>
            <Select
              options={optionsWithNone}
              value={
                optionsWithNone.find((opt) => opt.value === mapping[field])
                  ?.value || noneOption.value
              }
              onChange={(value) => onChange(field, value)}
              placeholder="Select a column..."
            />
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={onConfirm}
        >
          Confirm Mapping
        </button>
      </div>
    </div>
  );
};

export default ColumnMapping;
