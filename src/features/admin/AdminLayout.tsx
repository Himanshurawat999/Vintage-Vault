import { Outlet } from "react-router";
import SideBar from "../../components/adminComponent/SideBar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <main className="w-full min-h-screen pl-18 pr-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
