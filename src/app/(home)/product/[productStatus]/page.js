import Product from "@/components/product/Product";

export default function Page({ params }) {
  return (
    <div>
      <Product productStatus={params.productStatus} />
    </div>
  );
}
