/** @format */

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Header = ({ title = "Hey, Welcome Back", actions, children }) => {
  return (
    <header className="mt-4 pl-7 pr-7 pt-4 pb-4 rounded-tl-[20px] rounded-tr-[14px] bg-white shadow-sm border-[#EAECF0] border-b-[3px]">
      {/* Title Row */}
      <div className="flex items-center justify-between ">
        <h1 className="text-[23px] capitalize font-medium text-[#222222]">{title}</h1>

        {/* Search Field + Button (Side by Side) */}
        <div className="flex justify-between items-center gap-x-8">
          <div className="w-[300px]">
            <Input
              type="text"
              prefix={<SearchOutlined className="text-[#667085]" />}
              placeholder="Search..."
              className="border border-gray-300 w-[320px] h-[45px] text-[#667085] text-[17px] shadow-md rounded-[12px] px-3 py-1 flex justify-start items-center text-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>{actions}</div>
        </div>
      </div>

      {/* Tabs Below Title */}
      <div className="mt-0">{children}</div>
    </header>
  );
};

export default Header;
