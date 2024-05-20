import { useEffect, useState } from "react"
import formatGeneralizedCode from "../../utils/formatWeatherCode"

function formatDate(dateString) {
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
  const date = new Date(`${dateString}T00:00`)
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`
  return formattedDate
}

const WeatherSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 81 80" fill="none">
      <circle cx="40" cy="40" r="17.5" stroke="currentColor" strokeWidth="5" />
      <rect x="38" width="5" height="15" rx="2.5" fill="currentColor" />
      <rect x="38" y="65" width="5" height="15" rx="2.5" fill="currentColor" />
      <rect
        x="67.0166"
        y="9.948"
        width="5"
        height="15"
        rx="2.5"
        transform="rotate(45 67.0166 9.948)"
        // transform="rotate(45 67.0166 9.948)"
        fill="currentColor"
      />
      <rect
        x="21.0547"
        y="55.9099"
        width="5"
        height="15"
        rx="2.5"
        transform="rotate(45 21.0547 55.9099)"
        fill="currentColor"
      />
      <rect x="80.5" y="37.5" width="5" height="15" rx="2.5" transform="rotate(90 80.5 37.5)" fill="currentColor" />
      <rect x="15.5" y="37.5" width="5" height="15" rx="2.5" transform="rotate(90 15.5 37.5)" fill="currentColor" />
      <rect
        x="70.552"
        y="66.5165"
        width="5"
        height="15"
        rx="2.5"
        transform="rotate(135 70.552 66.5165)"
        fill="currentColor"
      />
      <rect
        x="24.5901"
        y="20.5546"
        width="5"
        height="15"
        rx="2.5"
        transform="rotate(135 24.5901 20.5546)"
        fill="currentColor"
      />
    </svg>
  )
}
const FullWeather = ({ weatherCelsius, weatherLocation }) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocation.lat}&longitude=${
        weatherLocation.lon
      }&timezone=auto&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${weatherCelsius ? "celsius" : "fahrenheit"}`,
    )
      .then((res) => res.json())
      .then((parsed) => {
        let forecast = []
        for (let i = 0; i < parsed.daily.temperature_2m_max.length; i++) {
          let currentDate
          if (i === 0) currentDate = "Today"
          else if (i === 1) currentDate = "Tomorrow"
          else currentDate = formatDate(parsed.daily.time[i])
          forecast.push({
            date: currentDate,
            max: Math.round(parsed.daily.temperature_2m_max[i]),
            min: Math.round(parsed.daily.temperature_2m_min[i]),
            code: parsed.daily.weather_code[i],
          })
        }
        setData(forecast)
      })
  }, [weatherCelsius, weatherLocation])

  let innerJSX
  if (data) {
    innerJSX = (
      <div className="fadeItemIn my-6 flex items-start">
        {data.map((day, i) => {
          return (
            <div key={"fc_" + i} className="ml-2.5 flex gap-2">
              <div className="flex w-20 flex-col items-center gap-4">
                <h2 className="text-black/90 dark:text-white/90">{day.date}</h2>
                <img className="h-8 w-8" src={`./images/Weather/${formatGeneralizedCode(day.code)}.png`} />
                <div className="flex items-center gap-2">
                  <h2 className="text-lg text-black/90 dark:text-white/90">{day.max}&deg;</h2>
                  <h2 className="text-lg text-black/60 dark:text-white/60">{day.min}&deg;</h2>
                </div>
              </div>
              {i !== data.length - 1 && <div className="my-auto h-12 w-0.5 bg-black/10 dark:bg-white/10" />}
            </div>
          )
        })}
      </div>
    )
  } else {
    innerJSX = (
      <div className="my-6 flex items-start">
        {Array(7)
          .fill(0)
          .map((_, i) => {
            return (
              <div key={"fc_" + i} className="ml-2.5 flex gap-2">
                <div className="flex w-20 flex-col items-center gap-4">
                  <div className="h-7 w-12 bg-black/10 dark:bg-white/10"></div>
                  <div className="h-8 w-8 rounded-lg bg-black/10 dark:bg-white/10" />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-8 bg-black/10 dark:bg-white/10"></div>
                  </div>
                </div>
                {i !== 6 && <div className="h-8 w-0.5 bg-black/10 dark:bg-white/10" />}
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div>
      <h2 className="flex items-center gap-2 text-3xl font-semibold text-black/90 dark:text-white/90">
        <WeatherSVG />
        Forecast
      </h2>
      {innerJSX}
      <a
        href={`https://forecast.weather.gov/MapClick.php?lon=${weatherLocation.lon}&lat=${weatherLocation.lat}`}
        target="_blank"
        className="text-black/60 underline-offset-2 transition-colors duration-75 hover:text-black hover:underline dark:text-white/60 dark:hover:text-white"
      >
        See full forecast
      </a>
    </div>
  )
}

export default FullWeather
