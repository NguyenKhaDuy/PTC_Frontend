import { Receipt, CreditCard, CalendarDays } from "lucide-react";

export default function BookingStatsCards({ stats }) {
  const cards = [
    {
      title: "Tổng Bill",
      value: stats.totalBills,
      icon: Receipt,
      color: "text-blue-400",
    },
    {
      title: "Đã thanh toán",
      value: stats.paidBills,
      icon: CreditCard,
      color: "text-green-400",
    },
    {
      title: "Tổng doanh thu",
      value: stats.totalAmount.toLocaleString() + "đ",
      icon: CalendarDays,
      color: "text-[#AA7D36]",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-[#181818] border border-[#2d2d2d] rounded-2xl p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>

              <div
                className={`w-14 h-14 flex items-center justify-center ${item.color}`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
