import { WeatherCelsiusContext, WeatherEnabledContext } from "../../../context/WeatherProvider"
import Toggle from "../../../controls/Toggle"
import WeatherCoords from "./WeatherCoords"

const Weather = () => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="enableWeather" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Enable weather</h2>
        <Toggle htmlFor="enableWeather" ctx={WeatherEnabledContext} />
      </label>
      <label htmlFor="weatherCelsius" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Use celsius</h2>
        <Toggle htmlFor="weatherCelsius" ctx={WeatherCelsiusContext} />
      </label>
      <WeatherCoords />
    </div>
  )
}

export default Weather
