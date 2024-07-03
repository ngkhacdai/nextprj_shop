"use server";
import { GET, POST, PUT, getCookie } from "./customFetch";
import { revalidatePath } from "next/cache";
import { API } from "./url";
import { cookies } from "next/headers";

export const getALlProductByStatus = async (status) => {
  try {
    const response = await GET(`/product/getAllProductByShop/${status}`);
    return response.message;
  } catch (error) {
    return;
  }
};
export const createProduct = async (formData, pathName) => {
  try {
    console.log(formData);
    const userID = cookies().get("userID")?.value;
    const token = cookies().get("token")?.value;
    await fetch(`${API}/product/createProduct`, {
      method: "POST",
      headers: {
        "x-xclient-id": userID,
        authorization: token,
      },
      body: formData,
    });

    revalidatePath(pathName);
    return true;
  } catch (error) {
    console.log(error);
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
