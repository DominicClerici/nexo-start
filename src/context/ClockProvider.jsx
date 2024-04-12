import { createContext } from "react"
import useChromeStorage from "../hooks/useChromeStorage"

const Use24HourContext = createContext()
const Use24Hour_default = true
const Use24Hour = ({ children }) => {
  const [use24Hour, setUse24Hour] = useChromeStorage("use24Hour", Use24Hour_default)
  return <Use24HourContext.Provider value={{ use24Hour, setUse24Hour }}>{children}</Use24HourContext.Provider>
}
export { Use24HourContext }

const ShowSecondsContext = createContext()
const ShowSeconds_default = true
const ShowSeconds = ({ children }) => {
  const [showSeconds, setShowSeconds] = useChromeStorage("showSeconds", ShowSeconds_default)
  return <ShowSecondsContext.Provider value={{ showSeconds, setShowSeconds }}>{children}</ShowSecondsContext.Provider>
}
export { ShowSecondsContext }

const ClockProvider = ({ children }) => {
  return (
    <Use24Hour>
      <ShowSeconds>{children}</ShowSeconds>
    </Use24Hour>
  )
}
export default ClockProvider
