import ScheduleCard from "./ScheduleCard";

export default function ScheduleList({ schedules, handlers }) {
  return (
    <div className="space-y-5">
      {schedules.map((item) => (
        <ScheduleCard
          key={item.idSchedule}
          item={item}
          onView={() => handlers.view(item.idSchedule)}
          onEdit={() => handlers.edit(item)}
          onDelete={() => handlers.delete(item.idSchedule)}
          onToggleStatus={() => handlers.toggleStatus(item)}
        />
      ))}
    </div>
  );
}
