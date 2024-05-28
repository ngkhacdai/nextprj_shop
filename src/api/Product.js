import { GET, POST } from "./customFetch";

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
    console.log("res", response);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};
