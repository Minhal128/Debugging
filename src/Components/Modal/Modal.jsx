import { CloseOutlined } from "@ant-design/icons";

const Modal = ({ isShow, closeModal, children }) => {
  const handleOverlayClick = (e) => {
    // Only close the modal if the click target is the overlay (background)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={`${
        isShow ? "fixed inset-0 z-50 flex items-center justify-center" : "hidden"
      } bg-black bg-opacity-70 backdrop-blur-sm`}
      onClick={handleOverlayClick}
    >
      {/* Modal Content */}
      <div className="relative bg-white p-5 rounded-2xl shadow-xl w-96">
        {/* Close Button */}
        <button
          className="absolute -top-10 right-2 bg-white rounded-md shadow-lg p-1 hover:bg-gray-200 transition"
          onClick={closeModal}
        >
          <CloseOutlined className="text-lg text-gray-700" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
