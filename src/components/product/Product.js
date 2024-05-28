import { getALlProductByStatus } from "@/api/Product";
import TableProduct from "./TableProduct";
import { getAllCategory } from "@/api/Category";

const Product = async ({ productStatus }) => {
  const productData = await getALlProductByStatus(productStatus);
  const categoryData = await getAllCategory();
  return (
    <div>
      <TableProduct categoryData={categoryData} productData={productData} />
    </div>
  );
};

export default Product;