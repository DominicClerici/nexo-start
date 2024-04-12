import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"
import { SolidBackgroundColor } from "./SolidColor"

const BackgroundTypeContext = createContext()
const BackgroundType_default = "solid"
const BackgroundType = ({ children }) => {
  const [backgroundType, setBackgroundType] = useChromeStorage("backgroundType", BackgroundType_default)
  return (
    <BackgroundTypeContext.Provider value={{ backgroundType, setBackgroundType }}>
      {children}
    </BackgroundTypeContext.Provider>
  )
}
export { BackgroundTypeContext }

const BackgroundProvider = ({ children }) => {
  return (
    <BackgroundType>
      <SolidBackgroundColor>{children}</SolidBackgroundColor>
    </BackgroundType>
  )
}
export default BackgroundProvider
