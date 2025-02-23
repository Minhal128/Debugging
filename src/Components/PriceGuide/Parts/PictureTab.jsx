/** @format */

import React, { useState } from "react";
import { Upload, Input, Button, Select } from "antd";
import { UploadCloud } from "lucide-react";
import { QuestionCircleOutlined } from "@ant-design/icons";

const PictureComponent = () => {
  const [filePath, setFilePath] = useState("");

  return (
    <div className="flex p-4 gap-8 justify-between items-start w-full">
      {/* Left Side - Upload Section and Default Button */}
      <div className="flex flex-col items-center">
        <Upload.Dragger
          name="file"
          accept=".png,.jpg,.jpeg,.gif,.svg"
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess("ok");
              setFilePath(file.name);
            }, 1000);
          }}
          className="w-[500px] h-[350px] flex items-center justify-center rounded-2xl border border-gray-300 shadow-sm bg-white"
        >
          <div className="text-center">
            {/* Circular Icon Background with Lucide UploadCloud */}
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3">
              <UploadCloud className="text-gray-600 w-8 h-8" /> {/* Lucide UploadCloud */}
            </div>

            {/* Upload Text */}
            <p className="text-sm">
              <span className="text-[#3498db] font-semibold cursor-pointer">Click to upload</span>
              <span className="text-gray-600"> or drag and drop</span>
            </p>

            <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800×400px)</p>
          </div>
        </Upload.Dragger>

        <Button
          className="mt-4 bg-[#05A5CB] text-white border-none hover:bg-[#05A5CB] rounded-lg"
          style={{ marginLeft: "265px", borderRadius: "8px" }}
        >
          Set Pictures to Default Directory
        </Button>
      </div>

      {/* Right Side - File Path Input and Buttons (Aligned to Right Edge) */}
      <div className="flex flex-col items-end w-[500px] ml-auto">
        <label className="text-sm font-medium mb-2 w-full">Picture File Name:</label>
        <Input value={filePath} readOnly className="w-full" placeholder="Picture File Name" />

        <div className="flex gap-2 mt-4 w-full justify-end">
          <Button className="bg-[#05A5CB] text-white border-none rounded-lg" style={{ borderRadius: "8px" }}>
            Get Picture File
          </Button>
          <Button className="bg-[#DDDDDD] text-black border-none opacity-50 rounded-lg" style={{ borderRadius: "8px" }}>
            Copy Previous Picture
          </Button>
        </div>

        <div className="flex justify-end w-full" style={{ marginTop: "320px" }}>
          <div className="flex space-x-2">
            <div className="mt-2 flex space-x-2">
              <Select placeholder="Find Part#" className="bg-gray-200 w-[110px] text-black" />
              <Select placeholder="Find Part" className="bg-gray-200 w-[100px] text-black" />
              <Select placeholder="Get Index Cat" className="bg-gray-200 w-[130px] text-black" />
              <Select placeholder="Get MFG" className="bg-gray-200 w-[100px] text-black" />
            </div>
            <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
              <QuestionCircleOutlined className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureComponent;
