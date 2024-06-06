"use server";

import { cookies } from "next/headers";
import { GET, PUT } from "./customFetch";
import { API } from "./url";
import { revalidatePath } from "next/cache";

export const getShopInfor = async () => {
  const response = await GET("/shop/getShopForShop").catch(() => {
    return null;
  });
  return response?.message;
};

export const updateShop = async (formData) => {
  // const response = await PUT(`/shop/updateShop`, formData);
  const userID = cookies().get("userID")?.value;
  const token = cookies().get("token")?.value;
  const response = fetch(`${API}/shop/updateShop`, {
    method: "PUT",
    headers: {
      "x-xclient-id": userID,
      authorization: token,
    },
    body: formData,
  });
  revalidatePath("/infor");
  return response.message;
};

export const getoverview = async (year) => {
  try {
    const response = await GET(`/shop/overview/${year}`);
    return response.message;
  } catch (error) {}
};
export const getanalysis = async (year) => {
  try {
    const response = await GET(`/shop/analysis/${year}`);
    return response.message.revenue;
  } catch (error) {}
};
