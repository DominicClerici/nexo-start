import ClockProvider from "./ClockProvider"
import GeneralAppearanceProvider from "./GeneralAppearance"
import SearchProvider from "./SearchProvider"
import ShortcutsProvider from "./ShortcutsProvider"
import WeatherProvider from "./WeatherProvider"
import BackgroundProvider from "./backgrounds/BackgroundProvider"

const MainProvider = ({ children }) => {
  return (
    <GeneralAppearanceProvider>
      <WeatherProvider>
        <ClockProvider>
          <ShortcutsProvider>
            <SearchProvider>
              <BackgroundProvider>{children}</BackgroundProvider>
            </SearchProvider>
          </ShortcutsProvider>
        </ClockProvider>
      </WeatherProvider>
    </GeneralAppearanceProvider>
  )
}

export default MainProvider
