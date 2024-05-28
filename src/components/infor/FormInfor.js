"use client";

import { Button } from "antd";
import { useState } from "react";
import FormUpdate from "./FormUpdate";
import InformationShop from "./InformationShop";
import { useSelector } from "react-redux";

const FormInfor = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const shopInfor = useSelector((state) => state.shop.shopInFor);
  console.log(shopInfor);
  return (
    <div>
      <Button
        onClick={() => {
          setShowUpdate(!showUpdate);
        }}
      >
        Sửa thông tin shop
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
