import Papa from "papaparse";

interface ColumnMapping {
  firstName: number; // Column index for firstName
  lastName: number; // Column index for lastName
  numberOfTickets?: number;
  notes?: number;
}

interface MappedEntry {
  order: number;
  firstName: string;
  lastName: string;
  numberOfTickets: number;
  notes: string;
}

/**
 * Parses CSV data as rows of arrays, then uses columnMapping to pick fields.
 * If hasHeader is true, we skip the first row (treated as a header row).
 */
export async function parseCSVAndMap(
  fileBuffer: Buffer,
  columnMapping: ColumnMapping,
  hasHeader: boolean
): Promise<MappedEntry[]> {
  return new Promise((resolve, reject) => {
    const csvString = fileBuffer.toString("utf8");

    // Always parse with header: false => each row is an array of strings
    const parsed = Papa.parse(csvString, {
      header: false,
      skipEmptyLines: true,
    });

    // rows => array of arrays
    let rows = parsed.data as string[][];

    // If hasHeader === true, skip the first row to ignore it during mapping
    if (hasHeader && rows.length > 0) {
      rows = rows.slice(1);
    }

    // Map rows to your fields
    const mappedData = rows.map((row, index) => {
      const order = index + 1;
      const firstName =
        columnMapping.firstName >= 0 ? row[columnMapping.firstName] || "" : "";
      const lastName =
        columnMapping.lastName !== undefined && columnMapping.lastName >= 0
          ? row[columnMapping.lastName] || ""
          : "";
      const numTickets =
        columnMapping.numberOfTickets !== undefined &&
        columnMapping.numberOfTickets >= 0
          ? parseInt(row[columnMapping.numberOfTickets] || "1", 10)
          : 1;
      const notes =
        columnMapping.notes !== undefined && columnMapping.notes >= 0
          ? row[columnMapping.notes] || ""
          : "";

      return {
        order,
        firstName,
        lastName,
        numberOfTickets: isNaN(numTickets) ? 1 : numTickets,
        notes,
      } as MappedEntry;
    });

    // Filter out rows where firstName is empty (required)
    const filtered = mappedData.filter(
      (entry) => entry.firstName.trim() !== ""
    );
    resolve(filtered);
  });
}
