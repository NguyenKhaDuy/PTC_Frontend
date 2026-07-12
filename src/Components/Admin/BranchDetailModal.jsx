import {
  X,
  MapPin,
  Phone,
  MonitorPlay,
  Armchair,
  Calendar,
} from "lucide-react";

export default function BranchDetailModal({ open, branch, onClose }) {
  if (!open || !branch) return null;

  const totalSeats =
    branch.roomDTOS?.reduce(
      (sum, room) => sum + Number(room.capacity || 0),
      0,
    ) || 0;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-6" style={{margin: 0}}>
      <div className="bg-[#181818] rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-[#2d2d2d]">
          <h2 className="text-2xl font-bold">{branch.nameBranch}</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-[#2d2d2d] flex items-center justify-center"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#202020] rounded-xl p-5">
              <div className="flex gap-3 items-center mb-4">
                <MapPin className="text-[#AA7D36]" />
                <span>{branch.address}</span>
              </div>

              <div className="flex gap-3 items-center mb-4">
                <Phone className="text-[#AA7D36]" />
                <span>{branch.phone}</span>
              </div>

              <div className="flex gap-3 items-center mb-4">
                <MonitorPlay className="text-[#AA7D36]" />
                <span>{branch.roomDTOS?.length || 0} phòng</span>
              </div>

              <div className="flex gap-3 items-center">
                <Armchair className="text-[#AA7D36]" />
                <span>{totalSeats} ghế</span>
              </div>
            </div>

            <div className="bg-[#202020] rounded-xl p-5 flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-3">Thống kê</h3>

              <p>Tổng phòng: {branch.roomDTOS?.length || 0}</p>

              <p>Tổng ghế: {totalSeats}</p>
            </div>
          </div>

          {/* DANH SÁCH PHÒNG */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Danh sách phòng chiếu
            </h3>

            <div className="space-y-5">
              {branch.roomDTOS?.map((room) => (
                <div key={room.idRoom} className="bg-[#202020] rounded-xl p-5">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{room.name}</h4>

                      <p className="text-gray-400">
                        Diện tích: {room.totalArea} m²
                      </p>

                      <p className="text-gray-400">
                        Sức chứa: {room.capacity} ghế
                      </p>
                    </div>

                    <span className="bg-[#AA7D36]/20 text-[#AA7D36] px-4 py-2 rounded-full h-fit">
                      {room.scheduleDTOS?.length || 0} suất
                    </span>
                  </div>

                  {/* LỊCH CHIẾU */}
                  {room.scheduleDTOS?.length > 0 && (
                    <div className="mt-5">
                      <h5 className="font-semibold mb-3">Lịch chiếu</h5>

                      <div className="space-y-3">
                        {room.scheduleDTOS.map((schedule) => (
                          <div
                            key={schedule.idSchedule}
                            className="bg-[#2b2b2b] rounded-lg p-4"
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-semibold">
                                  {schedule.movieDTO?.nameMovie}
                                </p>

                                <p className="text-gray-400 text-sm">
                                  {schedule.timeStart?.join(":")} -{" "}
                                  {schedule.timeEnd?.join(":")}
                                </p>

                                <p className="text-gray-400 text-sm">
                                  {schedule.date?.join("/")}
                                </p>
                              </div>

                              <span className="text-[#AA7D36] font-semibold">
                                {schedule.basePrice.toLocaleString()}₫
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
