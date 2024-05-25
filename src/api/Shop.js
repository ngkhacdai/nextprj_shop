"use server";

import { GET } from "./customFetch";

export const getShopInfor = async () => {
  const response = await GET("/shop/getShopForShop").catch(() => {
    return null;
  });
  return response;
};
