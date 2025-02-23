/** @format */

import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import { PlusOutlined } from "@ant-design/icons";
import TechnicianTable from "../../Components/Tenant/Employee/TechnicianTable";
import TechnicianCreateModal from "../../Components/Tenant/Employee/TechnicianCreateModal";

const Technicians = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleUpdateClick = (data) => {
    console.log(data, "sackmsakcassanascn");
    setEditData(data);
    setIsShowModal(true);
  };

  return (
    <div>
      <Header
        title="Technicians"
        actions={
          <Button
            onClick={() => setIsShowModal(true)}
            className="!rounded-xl px-3"
          >
            <span>Register Technician</span> <PlusOutlined />
          </Button>
        }
      ></Header>

      <div>
        <TechnicianTable onUpdate={handleUpdateClick} />
      </div>

      <div className="relative">
        <TechnicianCreateModal
          visible={isShowModal}
          onClose={() => setIsShowModal(false)}
          editData={editData}
        />
      </div>
    </div>
  );
};

export default Technicians;
