import { FaFilm, FaTicketAlt, FaCouch, FaStar } from "react-icons/fa";

export default function FeatureSection() {
  const features = [
    {
      icon: <FaFilm size={30} />,
      title: "Phim bom tấn",
      desc: "Cập nhật nhanh những bộ phim mới nhất trong và ngoài nước.",
    },
    {
      icon: <FaTicketAlt size={30} />,
      title: "Đặt vé dễ dàng",
      desc: "Đặt vé online chỉ với vài thao tác đơn giản.",
    },
    {
      icon: <FaCouch size={30} />,
      title: "Ghế cao cấp",
      desc: "Không gian hiện đại, ghế ngồi êm ái, trải nghiệm tốt nhất.",
    },
    {
      icon: <FaStar size={30} />,
      title: "Dịch vụ 5 sao",
      desc: "Đồ ăn, nước uống đa dạng cùng nhiều ưu đãi hấp dẫn.",
    },
  ];

  return (
    <section className="-mt-14 relative z-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-[#AA7D36]/20 bg-[#161616]/95 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-[#AA7D36] hover:shadow-[0_0_25px_rgba(170,125,54,0.35)]"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#AA7D36] text-black transition group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>

              <p className="text-sm leading-6 text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
