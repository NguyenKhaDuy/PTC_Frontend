import { useEffect, useState } from "react";
import {
  Film,
  Users,
  Ticket,
  Wallet,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [prevStats, setPrevStats] = useState(null);
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const currentMonth = new Date().getMonth() + 1;
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;

        const fetchAPI = async (url) => {
          const res = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || "API error");

          return data;
        };

        const [currentStats, prevStatsRes, revenueRes] = await Promise.all([
          fetchAPI(
            `http://localhost:3000/api/admin/statistics?month=${currentMonth}`,
          ),
          fetchAPI(
            `http://localhost:3000/api/admin/statistics?month=${prevMonth}`,
          ),
          fetchAPI(`http://localhost:3000/api/admin/revenues?year=${year}`),
        ]);

        setStats(currentStats.data);
        setPrevStats(prevStatsRes.data);
        setRevenues(revenueRes.data.revenues);
      } catch (err) {
        console.log("Dashboard API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, year]);

  // ===== GROWTH =====
  const calcGrowth = (current, prev) => {
    if (prev === null || prev === undefined) return 0;
    if (prev === 0) return current > 0 ? 100 : 0;

    return ((current - prev) / prev) * 100;
  };

  const cards = stats
    ? [
        {
          title: "Tổng doanh thu",
          value: `${stats.totalRevenue.toLocaleString()}đ`,
          growth: calcGrowth(stats.totalRevenue, prevStats?.totalRevenue),
          icon: Wallet,
          color: "bg-green-500/20 text-green-400",
        },
        {
          title: "Vé đã bán",
          value: stats.totalTicketsSold,
          growth: calcGrowth(
            stats.totalTicketsSold,
            prevStats?.totalTicketsSold,
          ),
          icon: Ticket,
          color: "bg-blue-500/20 text-blue-400",
        },
        {
          title: "Phim đang chiếu",
          value: stats.totalMovies,
          growth: calcGrowth(stats.totalMovies, prevStats?.totalMovies),
          icon: Film,
          color: "bg-[#AA7D36]/20 text-[#AA7D36]",
        },
        {
          title: "Khách hàng",
          value: stats.totalUser,
          growth: calcGrowth(stats.totalUser, prevStats?.totalUser),
          icon: Users,
          color: "bg-purple-500/20 text-purple-400",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Thống kê hệ thống CMC Cinema</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181818] border border-[#2a2a2a]">
          <CalendarDays size={18} className="text-[#AA7D36]" />
          <span className="text-gray-300">
            {new Date().toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-400">Đang tải dữ liệu...</p>}

      {/* CARDS */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{card.title}</p>
                  <h2 className="text-3xl font-bold text-white mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>

              {/* GROWTH */}
              <div
                className={`flex items-center gap-2 mt-6 ${
                  card.growth > 0
                    ? "text-green-400"
                    : card.growth < 0
                      ? "text-red-400"
                      : "text-gray-400"
                }`}
              >
                <TrendingUp
                  size={16}
                  className={card.growth < 0 ? "rotate-180" : ""}
                />

                <span className="text-sm">
                  {card.growth > 0 ? "+" : ""}
                  {card.growth.toFixed(1)}% so với tháng trước
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHART */}
      <div className="bg-[#181818] rounded-2xl border border-[#2a2a2a] p-6">
        {/* HEADER CHART + YEAR SELECT */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Doanh thu theo tháng
          </h2>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-[#111] border border-[#333] text-white px-4 py-2 rounded-xl outline-none"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>
        </div>

        <div className="h-[350px]">
          {revenues.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenues}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />

                <XAxis
                  dataKey="month"
                  stroke="#888"
                  tickFormatter={(m) => `T${m}`}
                />

                <YAxis stroke="#888" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    borderRadius: "10px",
                  }}
                  labelFormatter={(label) => `Tháng ${label}`}
                  formatter={(value) => [
                    `${value.toLocaleString()} đ`,
                    "Doanh thu",
                  ]}
                />

                <Bar dataKey="revenue" fill="#AA7D36" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No data
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
