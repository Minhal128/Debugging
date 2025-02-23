/** @format */

import React from "react";
import { Card } from "antd";

const PriceGuide = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card title="Price Guide" bordered={true} style={{ width: 600, borderRadius: "8px" }}>
        <p>This is the Price Guide page.</p>
        {/* Add more content related to the Price Guide here */}
      </Card>
    </div>
  );
};

export default PriceGuide;
