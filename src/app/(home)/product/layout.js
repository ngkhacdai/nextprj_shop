import Loading from "@/app/loading";
import ProductNav from "@/components/product/ProductNav";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <ProductNav>{children}</ProductNav>
    </Suspense>
  );
}
