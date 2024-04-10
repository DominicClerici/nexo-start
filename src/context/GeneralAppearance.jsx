import { createContext, useEffect } from "react"
import useChromeStorage from "../hooks/useChromeStorage"

const AccentColorContext = createContext()
const AccentColor_default = "#ff0000"
const AccentColor = ({ children }) => {
  const [accentColor, setAccentColor] = useChromeStorage("accentColor", AccentColor_default)
  return <AccentColorContext.Provider value={{ accentColor, setAccentColor }}>{children}</AccentColorContext.Provider>
}
export { AccentColorContext }

const DarkModeContext = createContext()
const DarkMode_default = true
const DarkMode = ({ children }) => {
  const [darkMode, setDarkMode] = useChromeStorage("darkMode", DarkMode_default)
  if (darkMode) document.documentElement.classList.add("dark")
  else document.documentElement.classList.remove("dark")
  return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>{children}</DarkModeContext.Provider>
}
export { DarkModeContext }

const LayoutTypeContext = createContext()
const LayoutType_default = 0
const LayoutType = ({ children }) => {
  const [layoutType, setLayoutType] = useChromeStorage("layoutType", LayoutType_default)
  return <LayoutTypeContext.Provider value={{ layoutType, setLayoutType }}>{children}</LayoutTypeContext.Provider>
}
export { LayoutTypeContext }

const GeneralAppearanceProvider = ({ children }) => {
  return (
    <AccentColor>
      <DarkMode>
        <LayoutType>{children}</LayoutType>
      </DarkMode>
    </AccentColor>
  )
}
export default GeneralAppearanceProvider
