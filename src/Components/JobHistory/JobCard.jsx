import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Calendar } from "lucide-react";

const JobCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-3 mb-3">
      {/* Top section: Technician info */}
      <div className="flex items-center">
        <Avatar icon={<UserOutlined />} className="mr-3" />
        <div>
          <h4 className="font-semibold">Mike Roy</h4>
          <p className="text-sm text-gray-500">Technician</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-base">KC002</p>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <div className="flex flex-col items-center mt-2 gap-x-2">
            <span className="text-sm font-semibold text-gray-500">
              Standard
            </span>
            <span className="text-sm font-semibold">$4,734.43</span>
          </div>
          <div className="flex flex-col mt-2 items-center  gap-x-2">
            <span className="text-sm font-semibold text-gray-500">Value</span>
            <span className="text-sm font-semibold">$4,234.43</span>
          </div>
        </div>
      </div>

      {/* Job details */}
      <div className="mt-3">
        <p className="text-sm text-gray-600">
          Kitchen Comfort Cooking Layout Upgrade
        </p>
      </div>

      {/* Description */}
      <div className="mt-2 text-xs text-gray-500">
        New premium appliances, custom cabinets, and high-end finishes...
      </div>

      {/* Date */}
      <div className="my-4 text-xs flex items-center gap-x-2 font-semibold text-black ">
        <p>
          <Calendar  />
        </p>
        <p>30 Jan 2025</p>
      </div>
    </div>
  );
};

export default JobCard;
