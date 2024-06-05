"use client";

import { Button } from "antd";
import { useState } from "react";
import FormUpdate from "./FormUpdate";
import InformationShop from "./InformationShop";
import { useSelector } from "react-redux";

const FormInfor = ({ shopInfor }) => {
  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <div>
      <Button
        className="mb-2"
        onClick={() => {
          setShowUpdate(!showUpdate);
        }}
      >
        <p className="break-words">Sửa thông tin shop</p>
      </Button>
      {showUpdate ? (
        <FormUpdate shopInfor={shopInfor} />
      ) : (
        <InformationShop shopInfor={shopInfor} />
      )}
    </div>
  );
};

export default FormInfor;
