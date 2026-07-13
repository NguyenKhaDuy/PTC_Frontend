import { useState, useEffect } from "react";
import HeroSection from "../../Components/User/HeroSection";
import PromotionGrid from "../../Components/User/PromotionGrid";
import MemberBanner from "../../Components/User/MemberBanner";
import GlobalLoading from "../../Components/Common/GlobalLoading";

export default function PromotionsPage() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVouchers = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/voucher");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Lỗi tải voucher");
      }

      setVouchers(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);
  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white">
      <HeroSection />

      <PromotionGrid data={vouchers} />

      <MemberBanner />

      {loading && (
        <GlobalLoading open={loading} text="Đang tải danh sách voucher..." />
      )}
    </div>
  );
}
