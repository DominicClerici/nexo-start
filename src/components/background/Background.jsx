import { useContext } from "react"
import { BackgroundTypeContext } from "../../context/backgrounds/BackgroundProvider"
import Solid from "./Solid"
import SolidGradient from "./SolidGradient"
import "./backgrounds.css"
import { DarkModeContext } from "../../context/GeneralAppearance"
import Plasma from "./plasma/Plasma"
import Beams from "./beams/Beams"

const Background = () => {
  const { backgroundType } = useContext(BackgroundTypeContext)
  const { darkMode } = useContext(DarkModeContext)
  if (backgroundType === "solid") {
    return <Solid darkMode={darkMode} />
  } else if (backgroundType === "gradient") {
    return <SolidGradient darkMode={darkMode} />
  } else if (backgroundType === "colorCycle") {
    return (
      <div className={`colorCycleAnim fixed inset-0 -z-10 ${darkMode ? "brightness-[20%]" : "contrast-[20%]"}`}></div>
    )
  } else if (backgroundType === "gradientShift") {
    return <div className={`gradientShiftAnim fixed inset-0 -z-10 ${darkMode ? "brightness-[20%]" : null}`}></div>
  } else if (backgroundType === "plasma") {
    return <Plasma darkMode={darkMode} />
  } else if (backgroundType === "beams") {
    return <Beams darkMode={darkMode} />
  }

  return <div></div>
}

export default Background
