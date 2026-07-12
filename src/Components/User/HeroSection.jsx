export default function HeroSection() {
  return (
    <div className="relative h-[260px] md:h-[340px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/50 to-black/30 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-black text-[#AA7D36]">
          KHUYẾN MÃI HOT
        </h1>
        <p className="text-gray-300 mt-2">
          Ưu đãi đặc biệt dành cho bạn mỗi tuần
        </p>
      </div>
    </div>
  );
}
