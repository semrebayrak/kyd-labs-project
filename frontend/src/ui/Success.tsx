import { checkIcon } from "@/assets/icons";

interface SuccessProps {
  onConfirm: () => void;
  content?: React.ReactNode;
  confirmText?: string;
}

export default function Success({
  onConfirm,
  content,
  confirmText,
}: SuccessProps) {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <img
              src={checkIcon}
              alt="Check icon"
              className="w-8 h-8 text-green-500"
            />
          </div>
          {content}
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
