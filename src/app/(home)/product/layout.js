import Loading from "@/app/loading";
import dynamic from "next/dynamic";
const ProductNav = dynamic(() => import("@/components/product/ProductNav"), {
  ssr: false,
});
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <ProductNav>{children}</ProductNav>
    </Suspense>
  );
}
