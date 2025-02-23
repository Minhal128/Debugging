import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import CalculatorIcon from "../../assets/icons/tab icons/calculator-icon-white.svg";

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
        isShow
          ? "fixed inset-0 z-50 flex items-center justify-center"
          : "hidden"
      } bg-black bg-opacity-70 backdrop-blur-sm`}
      onClick={handleOverlayClick}
    >
      {/* Modal Content */}
      <div className="relative bg-white  rounded-2xl shadow-xl w-[900px] pb-2 scale-custom-1">
        {/* Close Button */}
        <button
          className="absolute -top-2 -right-2 bg-white rounded-md shadow-lg p-1 hover:bg-gray-200 transition"
          onClick={closeModal}
        >
          <CloseOutlined className="text-lg text-gray-700" />
        </button>
        <div className="flex items-end gap-5 pl-8 pb-7 mt-7 border-b-2">
          <div className="job-dtl-cid-box">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Job Time (Hrs):
            </h3>
            <Input
              defaultValue="0"
              className="w-[180px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
            />
          </div>
          <div className="job-dtl-cid-box">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Company / Last name:
            </h3>
            <Input
              defaultValue="Job Profit %:"
              className="w-[180px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
            />
          </div>
          <div className="job-dtl-cid-box">
            <Button className="shadow-md w-[42px] p-2 h-[40px] border border-[#EAECF0] bg-[#05A5CB] rounded-[10px]">
              <img src={CalculatorIcon} alt="Calculator" className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-end p-7">
          <div className="md:w-1/6">
            <h3 className="text-[#344054] text-[16px] pb-4 font-medium">
              Overhead:
            </h3>
            <h3 className="text-[#344054] text-[16px] pb-4 font-medium">
              Labor:
            </h3>
            <h3 className="text-[#344054] text-[16px] pb-4 font-medium">
              Material:
            </h3>
            <h3 className="text-[#344054] text-[16px] pb-4 font-medium">
              Sub Contractor
            </h3>
            <h3 className="text-[#344054] text-[16px] pb-4 font-medium">
              Other Costs:
            </h3>
            <h3 className="text-[#344054] text-[16px] pb-4 font-medium">
              Profit:
            </h3>
            <h3 className=" text-[#344054] text-[16px] pb-4 font-medium">
              Job Sell Price:
            </h3>
          </div>

          <div className="md:w-1/6">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Total $
            </h3>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
          </div>
          <div className="md:w-1/6">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Job Percent
            </h3>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
          </div>
          <div className="md:w-1/6">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Profit Percent
            </h3>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
          </div>
          <div className="md:w-1/6">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Profit
            </h3>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="site-name-box mb-2">
              <Input
                defaultValue="$0.00"
                className="w-full shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
          </div>
        </div>
        <div className="mb-5 pl-6 pr-6">
          <p className="text-[#777777] text-[16px] font-medium mb-5">*Review Prices For Accuracy. Your Profits Depend</p>
          <Button
                       className="!bg-[#F5F5F5] block !border-1 !border-[#DDDDDD] !font-[600] !text-[#777777] !w-[250px] !h-[40px] !rounded-[12px] text-[16px] capitalize mt-[15px]"

          >
            data entry fields
          </Button>
          <Button
            className="!bg-[#F5F5F5] !border-1 !border-[#DDDDDD] !font-[600] !text-[#777777] !w-[250px] !h-[40px] !rounded-[12px] text-[16px] capitalize mt-[15px]"
          >
            custom costs
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
