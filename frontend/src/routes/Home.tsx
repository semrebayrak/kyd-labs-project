import { ChangeEvent, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(uploadedFiles)]);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">File Upload</h1>
          <p className="text-lg text-gray-600">
            Upload and manage your files easily
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex justify-center mb-8">
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Upload Files
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Uploaded Files
              </h2>
              <span className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium text-gray-700">
                {files.length} files
              </span>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-4 text-gray-500 text-lg">
                  No files uploaded yet
                </p>
                <p className="mt-2 text-gray-400">
                  Upload files to see them here
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-4 hover:bg-gray-100 rounded-lg px-4 transition-colors"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-8 h-8 text-gray-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <span className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
