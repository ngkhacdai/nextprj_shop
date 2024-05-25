import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "../loading";

const SidebarClient = dynamic(
  () => import("@/components/sidebar/SidebarClient"),
  { ssr: false }
);

export default function Layout({ children }) {
  return (
    <SidebarClient>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </SidebarClient>
  );
}
