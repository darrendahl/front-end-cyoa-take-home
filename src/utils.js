export function formatDateTime(dateTime) {
  return new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
    dateStyle: "full",
  }).format(dateTime);
}
