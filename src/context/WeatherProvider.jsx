import { createContext } from "react"
import useChromeStorage from "../hooks/useChromeStorage"

const WeatherEnabledContext = createContext()
const WeatherEnabled_default = true
const WeatherEnabled = ({ children }) => {
  const [weatherEnabled, setWeatherEnabled] = useChromeStorage("weatherEnabled", WeatherEnabled_default)
  return (
    <WeatherEnabledContext.Provider value={{ weatherEnabled, setWeatherEnabled }}>
      {children}
    </WeatherEnabledContext.Provider>
  )
}
export { WeatherEnabledContext }

const WeatherCelsiusContext = createContext()
const WeatherCelsius_default = false
const WeatherCelsius = ({ children }) => {
  const [weatherCelsius, setWeatherCelsius] = useChromeStorage("weatherCelsius", WeatherCelsius_default)
  return (
    <WeatherCelsiusContext.Provider value={{ weatherCelsius, setWeatherCelsius }}>
      {children}
    </WeatherCelsiusContext.Provider>
  )
}
export { WeatherCelsiusContext }

const WeatherLocationContext = createContext()
const WeatherLocation_default = { lat: 39.168804, lon: -86.536659 }
const WeatherLocation = ({ children }) => {
  const [weatherLocation, setWeatherLocation] = useChromeStorage("weatherLocation", WeatherLocation_default)
  return (
    <WeatherLocationContext.Provider value={{ weatherLocation, setWeatherLocation }}>
      {children}
    </WeatherLocationContext.Provider>
  )
}
export { WeatherLocationContext }

const WeatherProvider = ({ children }) => {
  return (
    <WeatherCelsius>
      <WeatherLocation>
        <WeatherEnabled>{children}</WeatherEnabled>
      </WeatherLocation>
    </WeatherCelsius>
  )
}

export default WeatherProvider
