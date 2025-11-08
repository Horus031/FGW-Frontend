export const formatDate = (d?: string | Date) => {
  if (!d) return "-";
  let date: Date;
  if (typeof d === "string") {
    date = new Date(d);
  } else {
    date = d;
  }
  if (isNaN(date.getTime())) return typeof d === "string" ? d : date.toString();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayName = weekdays[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName} ${day} ${monthName}, ${year}`;
};
