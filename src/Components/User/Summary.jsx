import { FaFileInvoiceDollar } from "react-icons/fa";

export default function Summary({
  selectedBranch,
  selectedTime,
  selectedSeats,
  selectedFoods,
  selectedDrinks,
  discount,
  basePrice,
  onPay
}) {

  const seatTotal = selectedSeats.reduce((total, seat) => {
    const multiplier =
      seat.seatTypeDTO?.priceMultiplier || seat.seatType?.priceMultiplier || 1;

    return total + basePrice * multiplier;
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

  return (
    <div className="max-w-6xl mx-auto mt-12 bg-[#151515] rounded-2xl border border-[#2b2b2b] p-6">
      <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
        <FaFileInvoiceDollar className="text-[#AA7D36]" />
        Thông tin thanh toán
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-5">
          <div>
            <p className="text-gray-500 text-sm">Rạp</p>
            <p className="font-semibold">
              {selectedBranch?.name || "Chưa chọn"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Suất chiếu</p>
            <p className="font-semibold">{selectedTime?.time || "Chưa chọn"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Ghế</p>
            <p className="font-semibold">
              {selectedSeats.length
                ? selectedSeats.map((seat) => seat.name).join(", ")
                : "Chưa chọn"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <div>
            <p className="text-gray-500 text-sm mb-2">Đồ ăn</p>

            {selectedFoods.length ? (
              <div className="space-y-2">
                {selectedFoods.map((item) => (
                  <div
                    key={item.idFood}
                    className="flex justify-between bg-[#1d1d1d] rounded-lg px-4 py-3"
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-gray-400">
                        Size {item.size} × {item.quantity}
                      </p>
                    </div>

                    <p className="text-[#AA7D36]">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Không chọn</p>
            )}
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-2">Thức uống</p>

            {selectedDrinks.length ? (
              <div className="space-y-2">
                {selectedDrinks.map((item) => (
                  <div
                    key={item.idDrink}
                    className="flex justify-between bg-[#1d1d1d] rounded-lg px-4 py-3"
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-gray-400">
                        Size {item.size} × {item.quantity}
                      </p>
                    </div>

                    <p className="text-[#AA7D36]">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Không chọn</p>
            )}
          </div>

          <div className="border-t border-[#333] pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Tiền vé</span>
              <span>{seatTotal.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between">
              <span>Đồ ăn</span>
              <span>{foodTotal.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between">
              <span>Thức uống</span>
              <span>{drinkTotal.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between">
              <span>Voucher ({discount}%)</span>
              <span className="text-green-400">
                -{discountAmount.toLocaleString()}đ
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[#333] pt-6 flex justify-between items-center">
        <div>
          <p className="text-gray-400">Tổng thanh toán</p>

          <p className="text-3xl font-bold text-[#AA7D36]">
            {total.toLocaleString()}đ
          </p>
        </div>

        <button
          onClick={onPay}
          className="px-10 py-4 rounded-xl bg-[#AA7D36] hover:bg-[#8b652d]"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
