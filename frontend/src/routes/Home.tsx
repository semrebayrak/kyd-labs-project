import { ChangeEvent, useState } from "react";
import Papa from "papaparse";
import ColumnMapping from "@/components/ColumnMapping";
import { readFileAsText } from "@/utils/csv";
import UploadFile from "@/components/UploadFile";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState({
    firstName: "",
    lastName: "",
    numberOfTickets: "",
    notes: "",
  });

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      try {
        const fileText = await readFileAsText(selectedFile);
        const parsed = Papa.parse(fileText, { header: true });
        if (parsed.meta.fields) {
          const headers = parsed.meta.fields;
          setColumns(headers);
          // By default place everything in order 1st row firstName, 2nd row lastName...
          setColumnMapping({
            firstName: headers[0] || "",
            lastName: headers[1] || "",
            numberOfTickets: headers[2] || "",
            notes: headers[3] || "",
          });
        } else {
          alert("CSV file does not contain header fields. Please try again.");
        }
      } catch (error) {
        alert("Error reading CSV file. Please try again.");
      }
    }
  };

  const handleMappingChange = (
    field: keyof typeof columnMapping,
    value: string
  ) => {
    setColumnMapping((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirmMapping = () => {
    if (!columnMapping.firstName) {
      alert(
        "First Name column is required. Please select a column for First Name before continuing."
      );
      return;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">File Upload</h1>
          <p className="text-lg text-gray-600">
            Upload your CSV file and map its columns to the required fields.
          </p>
        </div>
        {file ? (
          <ColumnMapping
            columns={columns}
            mapping={columnMapping}
            onChange={handleMappingChange}
            onConfirm={handleConfirmMapping}
          />
        ) : (
          <UploadFile onFileUpload={handleFileUpload} />
        )}
      </div>
    </div>
  );
}
