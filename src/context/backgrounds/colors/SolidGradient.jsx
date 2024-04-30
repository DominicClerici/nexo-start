import { createContext } from "react"
import useChromeStorage from "../../../hooks/useChromeStorage"

const SolidGradientColorContext = createContext()
// gradient is an array, [to color, from color]
const SolidGradientColor_default = [
  ["#7B7B7B", "#222222"],
  ["#7dd3fc", "#0c4a6e"],
]
const SolidGradientColor = ({ children }) => {
  const [solidGradientColor, setSolidGradientColor] = useChromeStorage("solidGradientColor", SolidGradientColor_default)
  return (
    <SolidGradientColorContext.Provider value={{ solidGradientColor, setSolidGradientColor }}>
      {children}
    </SolidGradientColorContext.Provider>
  )
}
export { SolidGradientColor, SolidGradientColorContext }
