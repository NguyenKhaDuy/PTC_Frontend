import { useSeats } from "../../Components/Admin/useSeats";
import SeatsHeader from "../../Components/Admin/SeatsHeader";
import SeatsStats from "../../Components/Admin/SeatsStats";
import SeatsFilter from "../../Components/Admin/SeatsFilter";
import SeatsTable from "../../Components/Admin/SeatsTable";
import SeatsModals from "../../Components/Admin/SeatsModals";

import GlobalLoading from "../../Components/Common/GlobalLoading";

export default function Seats() {
  const seatsHook = useSeats();

  return (
    <div className="space-y-6">
      <SeatsHeader {...seatsHook} />

      <SeatsStats {...seatsHook} />

      <SeatsFilter {...seatsHook} />

      <SeatsTable {...seatsHook} />

      <SeatsModals {...seatsHook} />

      {seatsHook.loading && <GlobalLoading open={true} text="Đang xử lý..." />}
    </div>
  );
}
