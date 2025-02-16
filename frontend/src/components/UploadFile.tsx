import addIcon from "@/assets/icons/add.svg";
import { ChangeEvent } from "react";

export default function UploadFile({
  file,
  onFileUpload,
  handleParseFile,
}: {
  file: File | null;
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleParseFile: (hasHeader: boolean) => void;
}) {
  if (!file) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex justify-center mb-8">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex gap-2 items-center px-8 py-4 rounded-lg bg-indigo-600 text-white shadow-lg transform hover:bg-indigo-700 hover:scale-105 transition-all"
          >
            <img src={addIcon} alt="Upload file icon" className="w-6 h-6" />
            Upload File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={onFileUpload}
            className="hidden"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Does your CSV file have a header row?
          </h3>
          <p className="text-gray-600 mb-8">
            A header row contains column names like "Name", "Email", etc.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleParseFile(false)}
              className="px-6 py-3 rounded-lg transition-all text-white hover:opacity-80"
            >
              No, it doesn't
            </button>
            <button
              onClick={() => handleParseFile(true)}
              className="px-6 py-3 rounded-lg !bg-indigo-600 transition-all text-white hover:opacity-80"
            >
              Yes, it has headers
            </button>
          </div>
        </div>
      </div>
    );
  }
}
