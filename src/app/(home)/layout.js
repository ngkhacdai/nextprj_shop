import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "../loading";
import Sidebar from "@/components/sidebar/Sidebar";

const SidebarClient = dynamic(
  () => import("@/components/sidebar/SidebarClient"),
  { ssr: false }
);

export default function Layout({ children }) {
  return (
    <Sidebar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Sidebar>
  );
}
