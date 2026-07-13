import { CalendarDays, Percent, TicketPercent, Package } from "lucide-react";
import { useToast } from "../../Components/Common/ToastProvider";

function formatDate(date) {
  return `${date[2]}/${date[1]}/${date[0]}`;
}

export default function PromotionCard({ item }) {
  const { showToast } = useToast();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.code);
    showToast("Đã sao chép mã", "success");
  };
  return (
    <div className="group overflow-hidden rounded-3xl border border-[#AA7D36]/20 bg-[#151515] transition hover:-translate-y-2 hover:border-[#AA7D36] hover:shadow-[0_15px_40px_rgba(170,125,54,.18)]">
      <div className="bg-gradient-to-r from-[#AA7D36] to-[#c79b4a] p-6 text-black">
        <div className="flex items-center justify-between">
          <TicketPercent size={34} />

          <div className="text-right">
            <h2 className="text-4xl font-black">{item.discount}%</h2>

            <p className="text-sm font-semibold">OFF</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Mã voucher
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-wider text-[#AA7D36]">
            {item.code}
          </h3>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-3 text-gray-300">
            <CalendarDays size={18} className="text-[#AA7D36]" />
            <span>HSD: {formatDate(item.expiration)}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Package size={18} className="text-[#AA7D36]" />
            <span>Còn {item.quality} lượt sử dụng</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="mt-2 w-full rounded-xl bg-[#AA7D36] py-3 font-semibold text-white transition hover:bg-[#8f6424]"
        >
          Sao chép mã
        </button>
      </div>
    </div>
  );
}
