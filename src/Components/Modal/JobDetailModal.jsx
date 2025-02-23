import { CloseOutlined,DeleteOutlined } from "@ant-design/icons";
import { Input,Button } from "antd";

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
      <div className="relative bg-white  rounded-2xl shadow-xl w-[900px] pb-2 scale-custom">
        {/* Close Button */}
        <button
          className="absolute -top-10 right-2 bg-white rounded-md shadow-lg p-1 hover:bg-gray-200 transition"
          onClick={closeModal}
        >
          <CloseOutlined className="text-lg text-gray-700" />
        </button>
        <div className="flex justify-between pl-6 pr-6 pb-3 mt-5 border-b-2">
          <div className="job-dtl-cid-box">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              CID:
            </h3>
            <Input
              defaultValue="123"
              className="w-[180px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
            />
          </div>
          <div className="job-dtl-cid-box">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Company / Last name:
            </h3>
            <Input
              defaultValue="The Smith Company"
              className="w-[180px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
            />
          </div>
          <div className="job-dtl-cid-box">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Contact First Name:
            </h3>
            <Input
              defaultValue="Tom"
              className="w-[180px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
            />
          </div>
          <div className="job-dtl-cid-box">
            <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
              Last Name:
            </h3>
            <Input
              defaultValue="Smith"
              className="w-[180px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pl-6 pr-6 mt-3">
          <div className="site-name-box">
            <h3 className="text-[#344054] text-[16px] pb-1 font-medium">
              Site Name:
            </h3>
            <Input
              defaultValue="Primary Smith Site"
              className="w-[600px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
            />
          </div>

          <div className="flex mt-8 gap-2">
            <input
              type="checkbox"
              name="export"
              className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"
            />
            <label className="block text-[#475467] font-medium text-[16px]">
              Primary Location
            </label>
          </div>
        </div>

        <div className="flex justify-between pl-5 pb-3 pr-5 mt-4 gap-3">
          <div className="md:w-7/12">
            <div className="flex justify-between items-end">
              <h3 className="text-[#344054] text-[16px] pb-2 font-medium">
                Contact:
              </h3>
              <div className="site-name-box">
                <h3 className="text-[#344054] text-[14px] pb-1 font-medium">
                  Title
                </h3>
                <Input
                  defaultValue="123"
                  className="w-[110px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="site-name-box">
                <h3 className="text-[#344054] text-[14px] pb-1 font-medium">
                  First Name:
                </h3>
                <Input
                  defaultValue="Tom"
                  className="w-[110px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="site-name-box">
                <h3 className="text-[#344054] text-[14px] pb-1 font-medium">
                  Last Name:
                </h3>
                <Input
                  defaultValue="Smith"
                  className="w-[110px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <h3 className="text-[#344054] text-[16px] font-medium">
                Company:
              </h3>
              <Input
                defaultValue="The Smith Company"
                className="w-[400px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <h3 className="text-[#344054] text-[15px]  font-medium">
                Street:
              </h3>
              <Input
                defaultValue="PO Box 118"
                className="w-[400px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <h3 className="text-[#344054] text-[15px]  font-medium">
                Address2:
              </h3>
              <Input
                defaultValue=""
                className="w-[400px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="flex mt-3 items-center justify-between">
              <h3 className="text-[#344054] text-[15px]  font-medium">
                City ST Zip:
              </h3>
              <div className="site-name-box">
                <Input
                  defaultValue="Harrington Park"
                  className="w-[210px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="site-name-box">
                <Input
                  defaultValue="NJ"
                  className="w-[55px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="site-name-box">
                <Input
                  defaultValue="0764"
                  className="w-[90px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <h3 className="text-[#344054] text-[15px]  font-medium">
                Phone1:
              </h3>
              <Input
                defaultValue="201-767-5520"
                className="w-[150px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
              <h3 className="text-[#344054] text-[15px]  font-medium">
              Fax:
              </h3>
              <Input
                defaultValue=""
                className="w-[150px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <h3 className="text-[#344054] text-[15px]  font-medium">
              Phone2:
              </h3>
              <Input
                defaultValue=""
                className="w-[130px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
              <h3 className="text-[#344054] text-[15px]  font-medium">
                Beeper:
              </h3>
              <Input
                defaultValue="Smith"
                className="w-[150px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="flex items-center justify-between mt-3 mb-4">
              <h3 className="text-[#344054] text-[15px]  font-medium">
                Email:
              </h3>
              <Input
                defaultValue="nspginfo@nspgweb.com"
                className="w-[405px] shadow-sm h-[34px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="">
            <Button
  type="danger"
  className="shadow-sm !w-[120px]  !h-[34px] border border-[#EAECF0] text-[16px] text-[#344054] font-[500] rounded-[12px] flex items-center gap-2"
>
  Delete
  <DeleteOutlined />
</Button>


            </div>
          </div>

          <div className="md:w-5/12">
          
          <div className="">
            <h4 className="text-[#344054] text-[14px] pb-2 font-medium">Notes</h4>
            <div className="md:w-full	">
                <div className="shadow-sm border border-[#EAECF0] rounded-[16px] p-4 w-full h-[350px]"></div>
              </div>
          </div>
          
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
