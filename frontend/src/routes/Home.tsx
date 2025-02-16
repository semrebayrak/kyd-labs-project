import ColumnMapping from "@/components/ColumnMapping";
import UploadFile from "@/components/UploadFile";
import { uploadCSV } from "@/services/apiClient";
import Success from "@/ui/Success";
import { calculateMissingFields, parseCSV, readFileAsText } from "@/utils/csv";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
/**
 * Mapping stores which column index corresponds to firstName, lastName etc.
 * -1 => Can be used as None
 */
interface ColumnMappingState {
  firstName: number;
  lastName: number;
  numberOfTickets: number;
  notes: number;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  // columns array -> Column names to show in dropdown to user
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [hasHeader, setHasHeader] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  // User selection -> which index maps to which field
  const [columnMapping, setColumnMapping] = useState<ColumnMappingState>({
    firstName: -1,
    lastName: -1,
    numberOfTickets: -1,
    notes: -1,
  });

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleParseFile = async (hasHeader: boolean) => {
    setHasHeader(hasHeader);
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

  // When user selects a column in dropdown, find its index in columns array and update state
  const handleMappingChange = (
    field: keyof ColumnMappingState,
    selectedColumnName: string
  ) => {
    const idx = columns.indexOf(selectedColumnName);
    setColumnMapping((prev) => ({
      ...prev,
      [field]: idx,
    }));
  };

  const handleConfirmMapping = async () => {
    setIsLoading(true);
    // firstName is required
    if (columnMapping.firstName === -1) {
      setError(
        "First Name column is required. Please select a column for First Name."
      );
      return;
    }

    if (!file) {
      setError("No file selected.");
      return;
    }

    // When sending to backend as multipart/form-data, include hasHeader info
    const formData = new FormData();
    formData.append("file", file);
    formData.append("columnMapping", JSON.stringify(columnMapping));
    formData.append("hasHeader", JSON.stringify(hasHeader));

    try {
      const res = await uploadCSV(formData);
      if (res.success) {
        setShareLink(res.shareableLink);
      } else {
        setError("Upload failed. Check console for details.");
      }
    } catch (_err) {
      setError("Error uploading CSV.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelMapping = () => {
    setShareLink(null);
    setFile(null);
    setColumns([]);
    setRows([]);
    setHasHeader(undefined);
    setColumnMapping({
      firstName: -1,
      lastName: -1,
      numberOfTickets: -1,
      notes: -1,
    });
  };

  // Validate that firstName is not missing
  useEffect(() => {
    // Skip validation if no rows exist
    if (rows.length === 0) {
      setError(null);
      return;
    }

    // Check for missing first names
    const missingFirstNames = calculateMissingFields(
      rows,
      columnMapping.firstName
    );

    if (missingFirstNames.length > 0) {
      const message = `Found ${missingFirstNames.length} ${
        missingFirstNames.length === 1 ? "attendee" : "attendees"
      } with missing first name. They will not be added to the list.`;

      setError(message);
      return;
    }

    // Clear any existing errors if validation passes
    setError(null);
  }, [rows, columnMapping.firstName]);

  if (shareLink) {
    return (
      <Success
        onConfirm={handleCancelMapping}
        confirmText="Upload Another File"
        content={
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Upload Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Shareable link:{" "}
              <Link to={shareLink} target="_blank">
                {shareLink}
              </Link>
            </p>
          </>
        }
      />
    );
  }
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">File Upload</h1>
          <p className="text-lg text-gray-600">
            Upload your CSV file and map its columns to the required fields.
          </p>
        </div>
        {hasHeader !== undefined ? (
          <ColumnMapping
            columns={columns}
            mapping={columnMapping}
            onChange={handleMappingChange}
            onConfirm={handleConfirmMapping}
            onCancel={handleCancelMapping}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <UploadFile
            file={file}
            onFileUpload={handleFileUpload}
            handleParseFile={handleParseFile}
          />
        )}
      </div>
    </div>
  );
}
