"use server";
import { revalidatePath } from "next/cache";
import { GET, PATCH } from "./customFetch";

export const getAllOrderForShop = async (status) => {
  const response = await GET(`/checkout/getAllOrderForShop/${status}`);
  if (response.message.message === "Không có đơn hàng nào") {
    return null;
  }
  return response.message.orderRes.user;
};

export const changeStatus = async (form, getPathName) => {
  const response = await PATCH("/checkout/changeStatus", form);
  revalidatePath(getPathName, "page");

  return response;
};
