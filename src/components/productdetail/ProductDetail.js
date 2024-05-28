import { getProduct } from "@/api/Product";
import { revalidatePath } from "next/cache";
import Product from "./Product";
import { getAllCategory } from "@/api/Category";

const ProductDetail = async ({ id }) => {
  if (!id) {
    return revalidatePath("/product");
  }
  const productDetail = await getProduct(id);
  const category = await getAllCategory(id);
  return (
    <div>
      <Product category={category} productDetail={productDetail} />
    </div>
  );
};

export default ProductDetail;
