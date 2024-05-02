import BackgroundSettings from "../Backgrounds/BackgroundSettings"
import DarkMode from "./DarkMode"

const Appearance = () => {
  return (
    <div className="flex flex-col gap-4">
      <DarkMode />
      <BackgroundSettings />
    </div>
  )
}

export default Appearance
