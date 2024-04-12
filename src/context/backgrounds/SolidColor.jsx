import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

const SolidBackgroundColorContext = createContext()
const SolidBackgroundColor_default = { light: "#E796F3", dark: "#201320" }
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
