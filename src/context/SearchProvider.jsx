import { createContext } from "react"
import useChromeStorage from "../hooks/useChromeStorage"

const ShowHistoryContext = createContext()
const ShowHistory_default = true
const ShowHistory = ({ children }) => {
  const [showHistory, setShowHistory] = useChromeStorage("showHistory", ShowHistory_default)
  return <ShowHistoryContext.Provider value={{ showHistory, setShowHistory }}>{children}</ShowHistoryContext.Provider>
}
export { ShowHistoryContext }

const SearchProvider = ({ children }) => {
  return <ShowHistory>{children}</ShowHistory>
}
export default SearchProvider
