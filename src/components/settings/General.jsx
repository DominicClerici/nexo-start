import { ShowSecondsContext, Use24HourContext } from "../../context/ClockProvider"
import { ShowHistoryContext } from "../../context/SearchProvider"
import Toggle from "../../controls/Toggle"

const General = () => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="clockFormat" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">24 hour clock</h2>
        <Toggle htmlFor="clockFormat" ctx={Use24HourContext} />
      </label>
      <label htmlFor="showSeconds" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Show seconds</h2>
        <Toggle htmlFor="showSeconds" ctx={ShowSecondsContext} />
      </label>
      <label htmlFor="useHistory" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg text-black/90 dark:text-white/90">Use history in search</h2>
          <h3 className="text-black/50 dark:text-white/50">Requires history permission</h3>
        </span>
        <Toggle htmlFor="useHistory" ctx={ShowHistoryContext} />
      </label>
    </div>
  )
}

export default General
