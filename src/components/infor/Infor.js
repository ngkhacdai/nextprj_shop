import React from "react";
import FormInfor from "./FormInfor";
import { getShopInfor } from "@/api/Shop";

const Infor = async () => {
  const shopInfor = await getShopInfor();
  console.log(shopInfor);
  return (
    <div>
      <FormInfor shopInfor={shopInfor} />
    </div>
  );
};

export default Infor;
