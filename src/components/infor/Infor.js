import React from "react";
import FormInfor from "./FormInfor";
import { getShopInfor } from "@/api/Shop";

const Infor = async () => {
  const shopInfor = await getShopInfor();
  return (
    <div>
      <FormInfor shopInfor={shopInfor} />
    </div>
  );
};

export default Infor;
