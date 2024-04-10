const generalizeWMOCode = (code) => {
  switch (code) {
    case 0:
      return "Clear"
    case 1:
    case 2:
    case 3:
      return "Partly cloudy"
    case 45:
    case 48:
      return "Foggy"
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "Rainy"
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "Snow"
    case 95:
    case 96:
    case 99:
      return "Thunderstorm"
    // Additional cases can be added if needed.
    default:
      return ""
  }
}

const generalizeCode = (code) => {
  const description = generalizeWMOCode(parseInt(code))

  switch (description) {
    case "Clear":
      return 1
    case "Partly cloudy":
      return 2
    case "Foggy": // Assuming foggy is mapped to 'cloudy' for the generalized code
      return 4
    case "Rainy":
      return 9
    case "Snow":
      return 13
    case "Thunderstorm":
      return 11
    // Additional mappings can be added if needed.
    default:
      return 0 // default code for unmatched descriptions
  }
}

function formatGeneralizedCode(code) {
  const generalizedCode = generalizeCode(code)

  // Ensure the code is a two-digit string
  const formattedCode = String(generalizedCode).padStart(2, "0")

  // Determine if it's daytime or nighttime
  // Using the previously defined time ranges
  const hour = parseInt(formattedCode, 10)
  const suffix = hour >= 6 && hour <= 17 ? "d" : "n"

  return formattedCode + suffix
}
export default formatGeneralizedCode
