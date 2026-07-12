import { useState } from "react";
import HeroSection from "../../Components/User/HeroSection";
import PromotionFilter from "../../Components/User/PromotionFilter";
import PromotionGrid from "../../Components/User/PromotionGrid";
import MemberBanner from "../../Components/User/MemberBanner";

const promotionsData = [
  {
    id: 1,
    title: "Giảm 50% vé thứ 2",
    desc: "Áp dụng cho tất cả rạp vào thứ 2 hàng tuần",
    type: "voucher",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
  },
  {
    id: 2,
    title: "Combo bắp nước siêu rẻ",
    desc: "Mua combo chỉ từ 49K khi đặt online",
    type: "combo",
    image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff",
  },
  {
    id: 3,
    title: "Thành viên VIP giảm 30%",
    desc: "Ưu đãi đặc biệt cho hội viên VIP",
    type: "member",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58c9c4",
  },
];

const tabs = [
  { label: "Tất cả", value: "all" },
  { label: "Voucher", value: "voucher" },
  { label: "Combo", value: "combo" },
  { label: "Member", value: "member" },
];

export default function PromotionsPage() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? promotionsData
      : promotionsData.filter((p) => p.type === active);

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white">
      <HeroSection />

      <PromotionFilter tabs={tabs} active={active} setActive={setActive} />

      <PromotionGrid data={filtered} />

      <MemberBanner />
    </div>
  );
}
