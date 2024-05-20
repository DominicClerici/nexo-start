import * as Dialog from "@radix-ui/react-dialog"
import FullWeather from "./FullWeather"
import { useContext, useEffect, useState } from "react"
import { WeatherCelsiusContext, WeatherEnabledContext, WeatherLocationContext } from "../../context/WeatherProvider.jsx"
import interpretWMOCode from "../../utils/interpretWeatherCode"
import formatGeneralizedCode from "../../utils/formatWeatherCode"
import "./weatherOpenAnim.css"

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(false)

  const { weatherCelsius } = useContext(WeatherCelsiusContext)
  const { weatherEnabled } = useContext(WeatherEnabledContext)
  const { weatherLocation } = useContext(WeatherLocationContext)
  const needsLocation =
    !weatherLocation.lat || !weatherLocation.lon || (weatherLocation.lat === 0 && weatherLocation.lon === 0)

  useEffect(() => {
    if (weatherEnabled) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocation.lat}&longitude=${
          weatherLocation.lon
        }&timezone=auto&current=temperature_2m,weather_code&temperature_unit=${
          weatherCelsius ? "celsius" : "fahrenheit"
        }`,
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
            desc: interpretWMOCode(data.current.weather_code),
          })
        })
        .catch(() => setError(true))
    }
  }, [weatherEnabled, weatherLocation.lat, weatherLocation.lon, weatherCelsius])
  if (error) return <></>
  if (needsLocation)
    return <h2 className="text-lg font-light text-black/50 dark:text-white/50">Weather needs location</h2>
  if (weatherEnabled && weatherData) {
    return (
      <Dialog.Root>
        <Dialog.Trigger as="button" className="-ml-2 rounded px-3 py-2 hover:bg-black/10 dark:hover:bg-white/10">
          <div className="flex items-center gap-4">
            <img className="h-8 w-8" src={`./images/Weather/${formatGeneralizedCode(weatherData.code)}.png`} />
            <h2 className="flex items-start text-2xl text-black/90 dark:text-white/90">
              {weatherData.temp}&deg;
              <span className="mt-[2px] text-lg font-semibold">{weatherCelsius ? "C" : "F"}</span>
            </h2>
            <span className="text-xl text-black/90 dark:text-white/90">{weatherData.desc}</span>
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black/15 backdrop-blur-sm dark:bg-black/25" />
        <Dialog.Content className="weatherOpenAnim fixed z-10 rounded-lg bg-neutral-100 p-4 shadow-lg dark:bg-neutral-900">
          <FullWeather weatherCelsius={weatherCelsius} weatherLocation={weatherLocation} />
        </Dialog.Content>
      </Dialog.Root>
    )
  }
  return <div className="h-12 w-1"></div>
}

export default Weather
