import TimeButton from "./TimeButton";

export default function TimeSelector({ times, selectedTime, setSelectedTime }) {
  return (
    <div className="flex flex-wrap gap-4">
      {times.map((schedule) => (
        <TimeButton
          key={schedule.idSchedule}
          schedule={schedule}
          selectedTime={selectedTime}
          onSelect={setSelectedTime}
        />
      ))}
    </div>
  );
}
