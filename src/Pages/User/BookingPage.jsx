import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import MovieHeader from "../../Components/User/MovieHeader";
import CinemaSelector from "../../Components/User/CinemaSelector";
import SeatSelector from "../../Components/User/SeatSelector";
import Summary from "../../Components/User/Summary";
import TimeSelector from "../../Components/User/TimeSelector";
import FoodSelector from "../../Components/User/FoodSelector";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import axios from "axios";

const getNext7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    days.push({
      label: d.toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      }),
      value: d.toISOString().split("T")[0],
    });
  }

  return days;
};

const formatDate = (arr) => {
  if (!arr) return "";
  const [y, m, d] = arr;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

const formatTime = (timeArray) => {
  if (!timeArray || timeArray.length < 2) return "";

  const [hour, minute] = timeArray;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const createBooking = async ({
  token,
  idUser,
  idBooking,
  idBranch,
  voucherCode,
  idMovie,
  totalAmount,
  idSchedule,
  selectedSeats,
  selectedFoods,
  selectedDrinks,
  bank,
}) => {
  const payload = {
    idUser,
    idBooking,
    idBranch,
    voucherCode,
    idMovie,
    totalAmount,
    idSchedule,

    idSeats: selectedSeats.map((seat) => seat.idSeat),

    bookingFoodRequests: selectedFoods.map((item) => ({
      idFood: item.idFood,
      idSize: item.idSize,
      quality: item.quantity,
    })),

    bookingDrinkRequests: selectedDrinks.map((item) => ({
      idDrink: item.idDrink,
      idSize: item.idSize,
      quality: item.quantity,
    })),

    bank,
  };

  const res = await axios.post(
    "http://localhost:3000/api/customer/booking",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

export default function BookingPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  const [voucher, setVoucher] = useState(null);
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [discount, setDiscount] = useState(0);

  const dates = useMemo(() => getNext7Days(), []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:3000/api/movie/id-movie=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) throw new Error("Fetch movie failed");

        const result = await res.json();

        setMovie(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  useEffect(() => {
    if (!movie?.scheduleDTOS?.length) {
      setBranches([]);
      return;
    }

    const map = new Map();

    movie.scheduleDTOS.forEach((schedule) => {
      const branch = schedule.roomDTO?.branchDTO;

      if (branch && !map.has(branch.idBranch)) {
        map.set(branch.idBranch, branch);
      }
    });

    setBranches([...map.values()]);
  }, [movie]);

  const times = useMemo(() => {
    if (!movie || !selectedBranch || !selectedDate) return [];

    return movie.scheduleDTOS
      .filter((schedule) => {
        const branch =
          schedule.roomDTO?.branchDTO?.idBranch === selectedBranch.idBranch;

        const date = formatDate(schedule.date) === selectedDate;

        return branch && date && schedule.status === true;
      })
      .map((schedule) => ({
        idSchedule: schedule.idSchedule,
        time: formatTime(schedule.timeStart),
        room: schedule.roomDTO,
        basePrice: schedule.basePrice,
        status: schedule.status,
      }));
  }, [movie, selectedBranch, selectedDate]);

  useEffect(() => {
    if (!selectedTime?.idSchedule) {
      setSeats([]);
      setSelectedSeats([]);
      return;
    }

    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:3000/api/seat/id-schedule=${selectedTime.idSchedule}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Fetch seats failed");
        }

        const result = await res.json();

        setSeats(result.data || []);
        setSelectedSeats([]); // đổi lịch chiếu thì bỏ chọn ghế cũ
      } catch (err) {
        console.error(err);
        setSeats([]);
        setSelectedSeats([]);
      }
    };

    fetchSeats();
  }, [selectedTime]);

  useEffect(() => {
    const fetchFoodsAndDrinks = async () => {
      try {
        const token = localStorage.getItem("token");

        const [foodRes, drinkRes] = await Promise.all([
          fetch("http://localhost:3000/api/food", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:3000/api/drink", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const foodData = await foodRes.json();
        const drinkData = await drinkRes.json();

        setFoods(foodData.data || []);
        setDrinks(drinkData.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFoodsAndDrinks();
  }, []);

  const applyVoucher = async () => {
    if (!voucher.trim()) {
      showToast("Vui lòng nhập mã voucher", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/customer/voucher/verify?code=${encodeURIComponent(voucher)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok || result.status !== "OK") {
        showToast(result.message || "Voucher không hợp lệ", "error");
        return;
      }

      setVoucherInfo(result.data);

      // discount = 10 (%)
      setDiscount(result.data.discount);

      showToast("Áp dụng voucher thành công", "success");
    } catch (err) {
      console.log(err);
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleSelectTime = (schedule) => {
    setSelectedTime(schedule);

    // Reset dữ liệu của suất chiếu cũ
    setSelectedSeats([]);
    setVoucher("");
    setVoucherInfo(null);
    setDiscount(0);
  };

  const seatTotal = selectedSeats.reduce((total, seat) => {
    const multiplier =
      seat.seatTypeDTO?.priceMultiplier || seat.seatType?.priceMultiplier || 1;

    return total + (selectedTime?.basePrice || 0) * multiplier;
  }, 0);

  const foodTotal = selectedFoods.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const drinkTotal = selectedDrinks.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const subTotal = seatTotal + foodTotal + drinkTotal;

  const discountAmount = (subTotal * discount) / 100;

  const total = subTotal - discountAmount;

  const user = JSON.parse(localStorage.getItem("user"));

  const handlePayment = async () => {
    try {
      if (!selectedBranch || !selectedTime) {
        showToast("Vui lòng chọn đầy đủ thông tin", "error");
        return;
      }

      setLoading(true);

      const paymentUrl = await createBooking({
        token: localStorage.getItem("token"),
        idUser: user?.id_user,
        idBooking: crypto.randomUUID(),
        idBranch: selectedBranch.idBranch,
        voucherCode: voucher,
        idMovie: movie?.idMovie,
        totalAmount: total,
        idSchedule: selectedTime.idSchedule,
        selectedSeats,
        selectedFoods,
        selectedDrinks,
        bank: "VNPAY",
      });

      window.location.href = paymentUrl;
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen px-6 py-10">
      <MovieHeader movie={movie} />

      {/* ================= CINEMA ================= */}
      <CinemaSelector
        branches={branches}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      {/* ================= DATE ================= */}
      {selectedBranch && (
        <div className="max-w-6xl mx-auto mb-10">
          <h2 className="text-xl font-bold mb-4">Chọn ngày</h2>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {dates.map((date) => (
              <button
                key={date.value}
                onClick={() => setSelectedDate(date.value)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                  selectedDate === date.value
                    ? "bg-[#AA7D36]"
                    : "bg-[#1c1c1c] hover:bg-[#333]"
                }`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= TIME ================= */}
      {selectedDate && (
        <div className="max-w-6xl mx-auto mb-10">
          <h2 className="text-xl font-bold mb-4">Chọn suất chiếu</h2>

          <TimeSelector
            times={times}
            selectedTime={selectedTime}
            setSelectedTime={handleSelectTime}
          />
        </div>
      )}

      {/* ================= SEAT ================= */}
      {selectedTime && (
        <>
          <SeatSelector
            seats={seats}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
          <FoodSelector
            foods={foods}
            drinks={drinks}
            selectedFoods={selectedFoods}
            setSelectedFoods={setSelectedFoods}
            selectedDrinks={selectedDrinks}
            setSelectedDrinks={setSelectedDrinks}
          />
        </>
      )}

      {/* ================= VOUCHER ================= */}
      <div className="max-w-6xl mx-auto mt-10 mb-6 p-6 bg-[#151515] rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Voucher giảm giá</h2>

        <div className="flex gap-3">
          <input
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            placeholder="Nhập mã voucher"
            className="flex-1 px-4 py-3 rounded-xl bg-[#1c1c1c] outline-none"
          />

          <button
            onClick={applyVoucher}
            className="px-6 py-3 bg-[#AA7D36] rounded-xl font-bold hover:bg-[#8d672f]"
          >
            Áp dụng
          </button>
        </div>

        {voucherInfo && (
          <div className="mt-4 rounded-xl border border-green-600 bg-green-900/20 p-4 space-y-2">
            <p className="text-green-400 font-semibold">
              ✔ Áp dụng voucher thành công
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                <span className="text-gray-400">Mã:</span>{" "}
                <span className="font-semibold">{voucherInfo.code}</span>
              </p>

              <p>
                <span className="text-gray-400">Giảm:</span>{" "}
                <span className="font-semibold text-[#AA7D36]">
                  {voucherInfo.discount}%
                </span>
              </p>

              <p>
                <span className="text-gray-400">Hết hạn:</span>{" "}
                {voucherInfo.expiration[2]}/{voucherInfo.expiration[1]}/
                {voucherInfo.expiration[0]}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= SUMMARY ================= */}
      <Summary
        selectedBranch={selectedBranch}
        selectedTime={selectedTime}
        selectedSeats={selectedSeats}
        selectedFoods={selectedFoods}
        selectedDrinks={selectedDrinks}
        discount={discount}
        basePrice={selectedTime?.basePrice || 0}
        onPay={handlePayment}
      />
      {loading && <GlobalLoading open={loading} text="Đang xử lý..." />}
    </div>
  );
}
