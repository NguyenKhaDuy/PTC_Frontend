import { Menu, X } from "lucide-react";

export default function ChatHeader({ logo, onClose, onHistory }) {
  return (
    <div className="bg-[#1b1b1b] border-b border-[#2d2d2d] px-4 py-3 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* History button */}
        <button
          onClick={onHistory}
          className="p-2 rounded-lg hover:bg-[#242424] transition"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <img src={logo} alt="CMC AI" className="w-10 h-10 object-contain" />
        </div>

        {/* Text */}
        <div className="leading-tight">
          <h2 className="font-semibold text-white text-sm">CMC AI</h2>

          <p className="text-[11px] text-gray-400">Hỗ trợ đặt vé phim</p>
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={onClose}
        className="p-2 rounded-lg hover:bg-[#242424] transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}
