import { getCookie } from "@/api/customFetch";
import dynamic from "next/dynamic";

const SidebarClient = dynamic(() => import("./SidebarClient"), { ssr: false });

const Sidebar = async ({ children }) => {
  const cookie = await getCookie();

  return (
    <div>
      <SidebarClient cookie={cookie}>{children}</SidebarClient>
    </div>
  );
};

export default Sidebar;
