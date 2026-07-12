import { Ticket, Tag } from "lucide-react";

export default function PromotionCard({ item }) {
  return (
    <div className="bg-[#141414] rounded-2xl overflow-hidden border border-[#222] hover:border-[#AA7D36]/50 transition group">
      {/* image */}
      <div className="h-44 overflow-hidden">
        <img
          src={item.image}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-[#AA7D36] text-xs mb-2">
          <Tag size={14} />
          <span className="uppercase">{item.type}</span>
        </div>

        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>

        <button className="mt-4 w-full py-2 rounded-lg bg-[#AA7D36] text-white font-semibold flex items-center justify-center gap-2">
          <Ticket size={16} />
          Lấy ưu đãi
        </button>
      </div>
    </div>
  );
}
