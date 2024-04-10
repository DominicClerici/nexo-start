import ClockProvider from "./Clock"
import GeneralAppearanceProvider from "./GeneralAppearance"
import ShortcutsProvider from "./Shortcuts"
import WeatherProvider from "./Weather"

const MainProvider = ({ children }) => {
  return (
    <GeneralAppearanceProvider>
      <WeatherProvider>
        <ClockProvider>
          <ShortcutsProvider>{children}</ShortcutsProvider>
        </ClockProvider>
      </WeatherProvider>
    </GeneralAppearanceProvider>
  )
}

export default MainProvider
