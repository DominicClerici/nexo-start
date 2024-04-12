import { DarkModeContext } from "../../context/GeneralAppearance"
import Toggle from "../../controls/Toggle"
import BackgroundSettings from "./Backgrounds/BackgroundSettings"

const Appearance = () => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="dark-mode" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Dark mode</h2>
        <Toggle htmlFor="dark-mode" ctx={DarkModeContext} />
      </label>
      <BackgroundSettings />
    </div>
  )
}

export default Appearance
