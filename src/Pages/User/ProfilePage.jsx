import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Ticket, History, Settings } from "lucide-react";

import ProfileHeader from "../../Components/User/ProfileHeader";
import ProfileTabs from "../../Components/User/ProfileTabs";
import TicketList from "../../Components/User/TicketList";
import TicketModal from "../../Components/User/TicketModal";
import HistoryTab from "../../Components/User/HistoryTab";
import InfoTab from "../../Components/User/InfoTab";
import SettingsTab from "../../Components/User/SettingsTab";
import GlobalLoading from "../../Components/Common/GlobalLoading";

const tabs = [
  { id: "info", label: "Hồ sơ", icon: User },
  { id: "tickets", label: "Vé của tôi", icon: Ticket },
  { id: "history", label: "Lịch sử", icon: History },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

export default function ProfilePage() {
  const [tab, setTab] = useState("tickets");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/customer/id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Fetch profile failed");

    const result = await res.json();

    setUser(result.data);
    localStorage.setItem("user", JSON.stringify(result.data));

    return result.data;
  };

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3000/api/customer/bill/id-user=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) throw new Error("Fetch history failed");

    const result = await res.json();
    const bills = result.data || [];

    setTickets(
      bills.filter(
        (bill) => bill.status === "UNUSE" || bill.status === "PAIDED",
      ),
    );
    setHistory(
      bills.filter((bill) => bill.status === "USED" || bill.status === "RATED"),
    );

    return bills;
  };

  const loadData = async () => {
    try {
      setLoading(true);

      await Promise.all([fetchProfile(), fetchHistory()]);
    } catch (err) {
      console.error("Load profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, refreshKey]);

  const calcTotal = (t) => {
    const food = t.food.reduce((a, b) => a + b.price, 0);
    return t.ticketPrice + food - (t.voucher?.discount || 0);
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B] to-black">
      <div className="max-w-6xl mx-auto pt-24 pb-20 px-4">
        <ProfileHeader user={user} />

        <ProfileTabs tabs={tabs} tab={tab} setTab={setTab} />

        <div className="mt-6 space-y-4">
          {tab === "tickets" && (
            <TicketList
              tickets={tickets}
              setSelectedTicket={setSelectedTicket}
            />
          )}

          {tab === "history" && (
            <HistoryTab
              history={history}
              setSelectedTicket={setSelectedTicket}
            />
          )}

          {tab === "info" && (
            <InfoTab
              user={user}
              onUserUpdate={(u) => {
                setUser(u);
                setRefreshKey((prev) => prev + 1);
              }}
            />
          )}

          {tab === "settings" && <SettingsTab navigate={navigate} />}
        </div>
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          calcTotal={calcTotal}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
