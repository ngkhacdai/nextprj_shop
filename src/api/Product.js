"use server";
import { GET, POST, PUT } from "./customFetch";
import { revalidatePath } from "next/cache";

export const getALlProductByStatus = async (status) => {
  console.log(`/product/getAllProductByShop/${status}`);
  try {
    const response = await GET(`/product/getAllProductByShop/${status}`);
    return response.message;
  } catch (error) {
    return;
  }
};
export const createProduct = async (formData) => {
  try {
    const response = await POST(`/product/createProduct`, formData);
    return response;
  } catch (error) {
    return;
  }
};
export const getProduct = async (id) => {
  const response = await GET(`/product/getProduct/${id}`);
  return response.message;
};
export const publishById = async (id) => {
  const response = await PUT(`/product/publishById/${id}`);
  revalidatePath("/product", "page");
  return response;
};
export const unpublishById = async (id) => {
  const response = await PUT(`/product/unpublishById/${id}`);
  revalidatePath("/product/private", "page");
  return response;
};
