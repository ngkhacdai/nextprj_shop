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

export const getoverview = async (year) => {
  const response = await GET(`/shop/overview/${year}`);
  return response.message;
};
export const getanalysis = async (year) => {
  const response = await GET(`/shop/analysis/${year}`);
  return response.message.revenue;
};
