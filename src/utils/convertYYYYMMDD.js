function convertYYYYMMDD(dateString) {
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

  const parts = dateString.split("-")
  const month = months[parseInt(parts[1], 10) - 1]
  const day = parseInt(parts[2], 10)

  return `${month} ${day}`
}
export default convertYYYYMMDD
