function convertOtherDateFormat(dateTimeString) {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ]

  const datePart = dateTimeString.split("T")[0]
  const parts = datePart.split("-")
  const month = months[parseInt(parts[1], 10) - 1]
  const day = parseInt(parts[2], 10)

  return `${month} ${day}`
}
export default convertOtherDateFormat