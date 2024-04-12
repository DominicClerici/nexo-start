import * as Select from "@radix-ui/react-select"
import { useContext } from "react"
import { BackgroundTypeContext } from "../../../context/backgrounds/BackgroundProvider"
import Selection from "../../../controls/Selection"
import SolidColor from "./SolidColor"

const BackgroundSettings = () => {
  const { backgroundType, setBackgroundType } = useContext(BackgroundTypeContext)

  const BackgroundOptions = ["solid", "gradient", "colorCycle", "gradientShift", "waves", "pulse", "matrix"]
  const BackgroundLabels = [
    { title: "Colors", items: ["Solid color", "Solid gradient", "Color cycle", "Gradient shift"] },
    { title: "Animated", items: ["Waves", "Pulse", "Matrix"] },
  ]

  return (
    <>
      <label htmlFor="layout-type" className="relative flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Layout type</h2>
        <Selection
          options={BackgroundOptions}
          labels={BackgroundLabels}
          value={backgroundType}
          setValue={setBackgroundType}
        />
      </label>
      {backgroundType === "solid" && <SolidColor />}
    </>
  )
}

export default BackgroundSettings
