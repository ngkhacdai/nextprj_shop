"use server";

import { GET, PUT } from "./customFetch";

export const getShopInfor = async () => {
  const response = await GET("/shop/getShopForShop").catch(() => {
    return null;
  });
  return response;
};

export const updateShop = async (formData) => {
  const response = await PUT(`/shop/updateShop`, formData);
  return response.message;
};
