const interpretWMOCode = (code) => {
  switch (code) {
    case 0:
      return "Clear"
    case 1:
    case 2:
    case 3:
      return "Partly Cloudy"
    case 45:
    case 48:
      return "Foggy"
    case 51:
    case 53:
    case 55:
      return "Light Rain"
    case 56:
    case 57:
      return "Freezing Drizzle"
    case 61:
    case 63:
    case 65:
      return "Light Rain"
    case 66:
    case 67:
      return "Freezing Rain"
    case 71:
    case 73:
    case 75:
      return "Snow"
    case 77:
      return "Snow Grains"
    case 80:
    case 81:
    case 82:
      return "Rain Showers"
    case 85:
    case 86:
      return "Snow Showers"
    case 95:
      return "Thunderstorm"
    case 96:
    case 99:
      return "Heavy Thunderstorm"
    default:
      return ""
  }
}
export default interpretWMOCode