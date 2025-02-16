import { parseCSV, readFileAsText } from "@/utils/csv";
import { useState } from "react";

export const useCsvParse = () => {
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  const parse = async (file: File | null, hasHeader: boolean) => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    try {
      const fileText = await readFileAsText(file);
      const result = parseCSV(fileText, hasHeader);

      if (!result) {
        setError("Error reading CSV file. Please try again.");
        return;
      }

      const { columns, rows } = result;

      setColumns(columns);
      setRows(rows);
    } catch (_error) {
      setError("Error reading CSV file. Please try again.");
    }
  };

  return {
    error,
    columns,
    rows,
    parse,
  };
};
