import addIcon from "@/assets/icons/add.svg";
import { ChangeEvent } from "react";

export default function UploadFile({
  onFileUpload,
}: {
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="flex justify-center mb-8">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <img src={addIcon} alt="add" className="w-6 h-6" />
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
}
