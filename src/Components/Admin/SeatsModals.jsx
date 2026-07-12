import SeatDetailModal from "../Admin/SeatDetailModal";
import SeatEditModal from "../Admin/SeatEditModal";
import ConfirmDeleteModal from "../Admin/ConfirmDeleteModal";

export default function SeatsModals(props) {
  const {
    detailOpen,
    seatDetail,
    seatModalOpen,
    modalMode,
    editingSeat,
    seatTypes,
    selectedRoom,
    deleteOpen,
    deleteSeat,

    setDetailOpen,
    setSeatDetail,
    setSeatModalOpen,
    setEditingSeat,
    setDeleteOpen,
    setDeleteSeat,

    handleAddSeat,
    handleUpdateSeat,
    handleDeleteSeat,
  } = props;

  return (
    <>
      <SeatDetailModal
        open={detailOpen}
        seat={seatDetail}
        onClose={() => {
          setDetailOpen(false);
          setSeatDetail(null);
        }}
      />

      <SeatEditModal
        open={seatModalOpen}
        mode={modalMode}
        seat={editingSeat}
        seatTypes={seatTypes}
        roomId={selectedRoom}
        onClose={() => {
          setSeatModalOpen(false);
          setEditingSeat(null);
        }}
        onSave={(data) => {
          modalMode === "add" ? handleAddSeat(data) : handleUpdateSeat(data);
        }}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title="Xóa ghế"
        message={`Bạn có chắc muốn xóa ghế "${deleteSeat?.name}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteSeat(null);
        }}
        onConfirm={() => {
          handleDeleteSeat(deleteSeat.idSeat);
          setDeleteOpen(false);
          setDeleteSeat(null);
        }}
      />
    </>
  );
}
