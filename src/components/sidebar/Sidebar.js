import { getCookie } from "@/api/customFetch";
import dynamic from "next/dynamic";

const SidebarClient = dynamic(() => import("./SidebarClient"), { ssr: false });

const Sidebar = async ({ children }) => {
  const cookie = await getCookie();

  return (
    <div>
      <SidebarClient children={children} cookie={cookie} />
    </div>
  );
};

export default Sidebar;
