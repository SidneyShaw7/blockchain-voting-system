interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const Modal = ({ title, message, onConfirm, onCancel, isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">
            No
          </button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
