import { useContext, useState } from "react"
import MainButton from "../../controls/MainButton"
import { WeatherLocationContext } from "../../context/WeatherProvider"

const WeatherCoords = () => {
  const { weatherLocation, setWeatherLocation } = useContext(WeatherLocationContext)
  const [error, setError] = useState(null)

  const tryLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setWeatherLocation({ ...weatherLocation, lat: latitude, lon: longitude })
        },
        () => {
          setError(2)
        },
      )
    } else {
      setError(1)
    }
  }

  return (
    <>
      <label htmlFor="weatherLocation" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg text-black/90 dark:text-white/90">Update to current location</h2>
          <h3 className="text-black/50 dark:text-white/50">Requires location permission</h3>
        </span>
        <MainButton disabled={error !== null} onClick={tryLocation} htmlFor="weatherLocation">
          Update
        </MainButton>
      </label>
      {error !== null && (
        <div className="relative w-[425px] rounded p-2 dark:bg-red-950">
          <h2 className="flex w-fit items-center gap-2 text-lg font-medium dark:text-red-200">
            <svg className="h-6 w-6 text-red-200" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            {error == 1 ? "Your device does not support geolocation" : "Location permission denied"}
          </h2>
          <p className="dark:text-red-100">
            {error == 1 ? "Please" : "Either allow location permission in browser settings or "} enter your coordinates
            manually. Coordinates can be found{" "}
            <a
              target="_blank"
              href="https://www.gps-coordinates.net/"
              className="font-semibold text-blue-500 underline-offset-2 hover:underline"
            >
              here
            </a>
            .
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <label htmlFor="weatherLat" className="flex flex-col items-start">
          <h3 className="text-black/60 dark:text-white/60">Latitude</h3>
          <input
            id="weatherLat"
            value={weatherLocation.lat}
            onChange={(e) => setWeatherLocation({ ...weatherLocation, lat: e.target.value })}
            className="rounded border border-black/30 bg-neutral-100 px-2 py-1 text-black/90 focus:border-black/50 focus:bg-neutral-200 dark:border-white/30 dark:bg-neutral-900 dark:text-white/90 dark:focus:border-white/50 dark:focus:bg-neutral-800"
          />
        </label>
        <label htmlFor="weatherLon" className="flex flex-col items-start">
          <h3 className="text-black/60 dark:text-white/60">Longitude</h3>
          <input
            id="weatherLon"
            value={weatherLocation.lon}
            onChange={(e) => setWeatherLocation({ ...weatherLocation, lon: e.target.value })}
            className="rounded border border-black/30 bg-neutral-100 px-2 py-1 text-black/90 focus:border-black/50 focus:bg-neutral-200 dark:border-white/30 dark:bg-neutral-900 dark:text-white/90 dark:focus:border-white/50 dark:focus:bg-neutral-800"
          />
        </label>
      </div>
    </>
  )
}

export default WeatherCoords
