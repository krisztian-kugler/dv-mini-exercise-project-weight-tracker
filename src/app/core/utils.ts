export function formatForDateInput(d: Date): string {
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  const hour = ("0" + d.getHours()).slice(-2);
  const minute = ("0" + d.getMinutes()).slice(-2);
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

export function dateFormatter(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);

  if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate()) {
    return `today at ${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
  }

  if (
    yesterday.getFullYear() === date.getFullYear() &&
    yesterday.getMonth() === date.getMonth() &&
    yesterday.getDate() === date.getDate()
  ) {
    return `yesterday at ${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
  }

  if (today.getFullYear() === date.getFullYear()) {
    return `${("0" + date.getDate()).slice(-2)} ${months[date.getMonth()]} at ${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
  }

  return `${("0" + date.getDate()).slice(-2)} ${months[date.getMonth()]} ${date.getFullYear()} at ${date.getHours()}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
}
