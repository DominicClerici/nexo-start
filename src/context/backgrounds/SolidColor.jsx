import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

const SolidBackgroundColorContext = createContext()
const SolidBackgroundColor_default = ["#5eead4", "#134e4a"]
const SolidBackgroundColor = ({ children }) => {
  const [solidBackgroundColor, setSolidBackgroundColor] = useChromeStorage(
    "solidBackgroundColor",
    SolidBackgroundColor_default,
  )
  return (
    <SolidBackgroundColorContext.Provider value={{ solidBackgroundColor, setSolidBackgroundColor }}>
      {children}
    </SolidBackgroundColorContext.Provider>
  )
}
export { SolidBackgroundColor, SolidBackgroundColorContext }
