export default function TimeButton({ schedule, selectedTime, onSelect }) {
  const isActive = selectedTime?.idSchedule === schedule.idSchedule;

  return (
    <button
      onClick={() => onSelect(schedule)}
      className={`px-6 py-3 rounded-xl transition ${
        isActive ? "bg-[#AA7D36]" : "bg-[#1c1c1c] hover:bg-[#333]"
      }`}
    >
      {schedule.time}
    </button>
  );
}
