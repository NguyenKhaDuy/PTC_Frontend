import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminHeader from "../Components/Admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="h-screen flex bg-[#0B1120] text-white overflow-hidden">
      <AdminSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto bg-[#111827] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
