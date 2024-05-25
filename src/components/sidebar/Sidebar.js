import dynamic from "next/dynamic";

const SidebarClient = dynamic(() => import("./SidebarClient"), { ssr: false });

const Sidebar = async () => {
  return (
    <div>
      <SidebarClient />
    </div>
  );
};

export default Sidebar;
