import { createContext, useContext, useEffect } from "react"
import useChromeStorage from "../hooks/useChromeStorage"

const AccentColorContext = createContext()
const AccentColor_default = "#ff0000"
const AccentColor = ({ children }) => {
  const [accentColor, setAccentColor] = useChromeStorage("accentColor", AccentColor_default)
  return <AccentColorContext.Provider value={{ accentColor, setAccentColor }}>{children}</AccentColorContext.Provider>
}
export { AccentColorContext }

const AutoDarkModeContext = createContext()
const AutoDarkMode_default = true
const AutoDarkMode = ({ children }) => {
  const [autoDarkMode, setAutoDarkMode] = useChromeStorage("autoDarkMode", AutoDarkMode_default)
  return (
    <AutoDarkModeContext.Provider value={{ autoDarkMode, setAutoDarkMode }}>{children}</AutoDarkModeContext.Provider>
  )
}
export { AutoDarkModeContext }

const DarkModeContext = createContext()
const DarkMode_default = true
const DarkMode = ({ children }) => {
  const [darkMode, setDarkMode] = useChromeStorage("darkMode", DarkMode_default)
  const { autoDarkMode, setAutoDarkMode } = useContext(AutoDarkModeContext)
  useEffect(() => {
    if (autoDarkMode) {
      if (window.matchMedia) {
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        setDarkMode(isDarkMode)
      } else {
        setAutoDarkMode(false)
      }
    }
  }, [autoDarkMode])
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
      <AutoDarkMode>
        <DarkMode>
          <LayoutType>{children}</LayoutType>
        </DarkMode>
      </AutoDarkMode>
    </AccentColor>
  )
}
export default GeneralAppearanceProvider
