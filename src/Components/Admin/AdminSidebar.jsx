import {
  LayoutDashboard,
  Film,
  Building2,
  CalendarDays,
  Ticket,
  Users,
  Tags,
  Clapperboard,
  UserSquare2,
  Popcorn,
  CupSoda,
  ShieldCheck,
  DoorOpen,
  Armchair,
  Sofa,
  Ruler,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import logo from "../../assets/PTC_LOGO.png";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Phim",
    icon: Film,
    path: "/admin/movies",
  },
  {
    title: "Thể loại",
    icon: Tags,
    path: "/admin/categories",
  },
  {
    title: "Diễn viên",
    icon: UserSquare2,
    path: "/admin/actors",
  },
  {
    title: "Rạp",
    icon: Building2,
    path: "/admin/branches",
  },
  {
    title: "Phòng chiếu",
    icon: DoorOpen,
    path: "/admin/rooms",
  },
  {
    title: "Ghế",
    icon: Armchair,
    path: "/admin/seats",
  },
  {
    title: "Loại ghế",
    icon: Sofa,
    path: "/admin/seat-types",
  },
  {
    title: "Lịch chiếu",
    icon: CalendarDays,
    path: "/admin/schedules",
  },
  {
    title: "Đặt vé",
    icon: Ticket,
    path: "/admin/bookings",
  },
  {
    title: "Khách hàng",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Voucher",
    icon: Tags,
    path: "/admin/vouchers",
  },
  {
    title: "Nước uống",
    icon: CupSoda,
    path: "/admin/drinks",
  },
  {
    title: "Thức ăn",
    icon: Popcorn,
    path: "/admin/foods",
  },
  {
    title: "Role",
    icon: ShieldCheck,
    path: "/admin/roles",
  },
  {
    title: "Size",
    icon: Ruler,
    path: "/admin/sizes",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-[#0B1120] border-r border-[#1f2937] flex flex-col">
      <div className="h-20 flex items-center justify-center gap-3 border-b border-[#1f2937]">
        <img src={logo} alt="logo" className="w-12" />
        <span className="font-bold text-xl">PTC ADMIN</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-[#AA7D36] scrollbar-track-transparent">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#AA7D36] text-white shadow-lg"
                    : "text-gray-400 hover:bg-[#1f2937] hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
