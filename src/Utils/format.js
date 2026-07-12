export const formatTime = (time) => {
  if (!time) return "";

  if (Array.isArray(time)) {
    const [hour = 0, minute = 0] = time;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  if (typeof time === "string") {
    return time.slice(0, 5);
  }

  return "";
};

export const formatDate = (date) => {
  if (!date) return "";

  if (Array.isArray(date)) {
    const [year, month, day] = date;
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  }

  return date;
};
