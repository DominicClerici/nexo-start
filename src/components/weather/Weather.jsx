import * as Dialog from "@radix-ui/react-dialog"
import FullWeather from "./FullWeather"
import { useContext, useEffect, useState } from "react"
import { WeatherCelsiusContext, WeatherEnabledContext, WeatherLocationContext } from "../../context/Weather"
import interpretWMOCode from "../../utils/interpretWeatherCode"
import formatGeneralizedCode from "../../utils/formatWeatherCode"

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
        <Dialog.Trigger as="button" className="-ml-2 rounded px-3 py-1 hover:bg-white/10">
          <div className="fadeInAnim flex items-center gap-4">
            <img className="h-8 w-8" src={`./Icons/Weather/${formatGeneralizedCode(weatherData.code)}.png`} />
            <h2 className="flex items-start text-2xl text-black/90 dark:text-white/90">
              {weatherData.temp}&deg;
              <span className="mt-[2px] text-lg font-semibold">{weatherCelsius ? "C" : "F"}</span>
            </h2>
            <span className="text-xl text-black/90 dark:text-white/90">{weatherData.desc}</span>
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="weatherContainerAnim fixed inset-0 bg-black/50" />
        <Dialog.Content className="weatherContainerAnim fixed rounded-lg p-4 shadow-lg dark:bg-neutral-900">
          <FullWeather weatherCelsius={weatherCelsius} weatherLocation={weatherLocation} />
        </Dialog.Content>
      </Dialog.Root>
    )
  }
}

export default Weather
