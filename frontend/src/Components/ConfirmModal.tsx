// ConfirmModal.tsx
import React from "react";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded shadow-md w-80 text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
