/** @format */

import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import { PlusOutlined } from "@ant-design/icons";
import TechnicianTable from "../../Components/Tenant/Employee/TechnicianTable";
import TechnicianCreateModal from "../../Components/Tenant/Employee/TechnicianCreateModal";
import JobHistory from "../../Components/JobHistory/JobHistory";

const JobHistoryPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleUpdateClick = (data) => {
    console.log(data, "sackmsakcassanascn");
    setEditData(data);
    setIsShowModal(true);
  };

  return (
    <div>
      <Header title="Job History"></Header>

      <div>
       <JobHistory/>
      </div>

    
    </div>
  );
};

export default JobHistoryPage;
