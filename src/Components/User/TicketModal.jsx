import { useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import {
  X,
  Calendar,
  MapPin,
  Armchair,
  Popcorn,
  Ticket,
  Receipt,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TicketModal({ ticket, onClose }) {
  const pdfRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!ticket) return null;

  const movie = ticket.scheduleDTO?.movieDTO;
  const branch = ticket.branchDTO;
  const seats = ticket.ticketDTO?.seatDTOS || [];
  const voucher = ticket.voucherDTO;

  const foods = [
    ...(ticket.billFoodDetailDTOS || []),
    ...(ticket.billDrinkDetailDTOS || []),
  ];

  const qrValue = ticket.qr
    ? `data:image/png;base64,${ticket.qr}`
    : ticket.idBill;

  const date = ticket.scheduleDTO?.date
    ? ticket.scheduleDTO.date.join("/")
    : "--";

  const start = ticket.scheduleDTO?.timeStart
    ? `${String(ticket.scheduleDTO.timeStart[0]).padStart(2, "0")}:${String(
        ticket.scheduleDTO.timeStart[1],
      ).padStart(2, "0")}`
    : "";

  const end = ticket.scheduleDTO?.timeEnd
    ? `${String(ticket.scheduleDTO.timeEnd[0]).padStart(2, "0")}:${String(
        ticket.scheduleDTO.timeEnd[1],
      ).padStart(2, "0")}`
    : "";

  const showTime = `${date} ${start} - ${end}`;

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("CMC CINEMA", 105, 18, { align: "center" });

    pdf.setFontSize(16);
    pdf.text(movie.nameMovie, 20, 35);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    pdf.text(`Ma ve: ${ticket.idBill}`, 20, 48);
    pdf.text(`Rap: ${branch.nameBranch}`, 20, 56);
    pdf.text(`Dia chi: ${branch.address}`, 20, 64);

    pdf.text(`Suat chieu: ${showTime}`, 20, 74);

    pdf.text(`Phong: ${seats[0].nameRoom}`, 20, 82);
    pdf.text(`Ghe: ${seats.map((s) => s.name).join(", ")}`, 20, 90);

    let y = 105;

    pdf.setFont("helvetica", "bold");
    pdf.text("Đo an & Nuoc uong", 20, y);

    pdf.setFont("helvetica", "normal");

    y += 10;

    foods.forEach((item) => {
      pdf.text(
        `${item.nameFood || item.nameDrink} (${item.size}) x${item.quality}`,
        20,
        y,
      );

      pdf.text(`${item.total.toLocaleString()}đ`, 170, y, {
        align: "right",
      });

      y += 8;
    });

    if (voucher) {
      y += 8;

      pdf.setTextColor(0, 120, 0);
      pdf.text(`Voucher: ${voucher.code} (-${voucher.discount}%)`, 20, y);

      pdf.setTextColor(0, 0, 0);
    }

    y += 18;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);

    pdf.text(`Tong tien: ${ticket.totalAmount.toLocaleString()}đ`, 20, y);

    if (ticket.qr) {
      const qrImage = `data:image/png;base64,${ticket.qr}`;

      pdf.addImage(
        qrImage,
        "PNG",
        145, // x
        20, // y
        45, // width
        45, // height
      );
    }

    pdf.save(`Ticket-${ticket.idBill}.pdf`);
  };

  return (
    <div
      onClick={onClose}
      className="
      fixed inset-0 z-[9999]
      bg-black/70 backdrop-blur-md
      flex items-center justify-center
      p-6
    "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        relative
        w-full
        max-w-5xl
        max-h-[90vh]
        bg-[#141414]
        rounded-3xl
        border border-[#2b2b2b]
        shadow-[0_30px_80px_rgba(0,0,0,.6)]
        flex flex-col
        overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2b2b2b] flex-shrink-0">
          <div>
            <h2 className="text-3xl font-bold">
              {movie?.nameMovie || "Không có tên phim"}
            </h2>

            <p className="text-gray-400 mt-2">Mã vé: {ticket.idBill}</p>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto">
          <div ref={pdfRef} className="grid lg:grid-cols-[2fr_1fr] gap-8 p-8">
            {/* LEFT */}
            <div className="space-y-5">
              <Info
                icon={<MapPin size={18} />}
                title="Rạp"
                value={branch?.nameBranch}
              />

              <Info
                icon={<Calendar size={18} />}
                title="Suất chiếu"
                value={showTime}
              />

              <Info
                icon={<Ticket size={18} />}
                title="Phòng"
                value={seats[0]?.nameRoom}
              />

              <Info
                icon={<Armchair size={18} />}
                title="Ghế"
                value={seats.map((s) => s.name).join(", ")}
              />

              {foods.length > 0 && (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Popcorn className="text-[#AA7D36]" />
                    Combo / Đồ ăn
                  </h3>

                  <div className="space-y-3">
                    {foods.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-white/10 pb-2"
                      >
                        <div>
                          <div>{item.nameFood || item.nameDrink}</div>

                          <div className="text-sm text-gray-400">
                            Size {item.size} × {item.quality}
                          </div>
                        </div>

                        <span className="text-[#AA7D36] font-semibold">
                          {item.total.toLocaleString()}đ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {voucher && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5">
                  <div className="flex justify-between">
                    <span>Voucher</span>

                    <span className="text-green-400 font-bold">
                      {voucher.code}
                    </span>
                  </div>

                  <p className="mt-2 text-green-300">
                    Giảm {voucher.discount}%
                  </p>
                </div>
              )}

              <div className="bg-[#AA7D36]/10 border border-[#AA7D36]/30 rounded-2xl p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Receipt className="text-[#AA7D36]" />
                    <span>Tổng thanh toán</span>
                  </div>

                  <span className="text-3xl font-bold text-[#AA7D36]">
                    {ticket.totalAmount.toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="sticky top-0 bg-white rounded-2xl p-6">
                {ticket.qr ? (
                  <img
                    src={qrValue}
                    alt="QR"
                    className="w-[220px] h-[220px] mx-auto"
                  />
                ) : (
                  <QRCode
                    value={ticket.idBill}
                    size={220}
                    className="mx-auto"
                  />
                )}

                <p className="text-center text-black font-bold mt-5">
                  {ticket.idBill}
                </p>

                <p className="text-center text-gray-600 text-sm mt-4">
                  Xuất trình mã QR tại cổng kiểm soát vé.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 border-t border-[#2b2b2b] flex justify-end gap-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20"
          >
            Đóng
          </button>

          <button
            onClick={downloadPDF}
            className="px-6 py-3 rounded-xl bg-[#AA7D36] hover:bg-[#8b652d]"
          >
            Tải PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-2xl p-5">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-[#AA7D36]/10 flex items-center justify-center text-[#AA7D36]">
          {icon}
        </div>

        <span className="text-lg text-gray-300">{title}</span>
      </div>

      <span className="font-bold text-lg text-white">{value || "--"}</span>
    </div>
  );
}
