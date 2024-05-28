import ProductDetail from "@/components/productdetail/ProductDetail";

export default function Page({ searchParams }) {
  return (
    <div>
      <ProductDetail id={searchParams.id} />
    </div>
  );
}
