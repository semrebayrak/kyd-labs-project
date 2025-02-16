import Papa from "papaparse";

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("File reading failed"));
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

export const parseCSV = (fileText: string, hasHeader: boolean) => {
  const parsed = Papa.parse(fileText, {
    header: hasHeader,
    skipEmptyLines: "greedy", // skip empty lines
  });

  if (hasHeader) {
    // When header: true, Papa parse returns actual column names in parsed.meta.fields
    if (parsed.meta.fields) {
      // For example: ["Name", "Email", "Age"]
      return {
        // Remove _ prefixed columns because they are empty
        columns: parsed.meta.fields.map((field) =>
          field.startsWith("_") ? "" : field
        ),
        rows: parsed.data as string[][],
      };
    }
  } else {
    // header: false means data is array of arrays
    const rows = parsed.data as string[][];
    // Generate "Column X" for the widest row's column count
    const columnCount = Math.max(...rows.map((r) => r.length));
    const generatedCols = Array.from(
      { length: columnCount },
      (_, i) => `Column ${i + 1}`
    );
    return {
      columns: generatedCols,
      rows: rows,
    };
  }
};

export const calculateMissingFields = (
  rows: string[][],
  columnIndex: number
) => {
  const missingFields = rows.map((row) => {
    return Object.values(row)[columnIndex] === "";
  });
  return missingFields.filter((field) => field);
};
