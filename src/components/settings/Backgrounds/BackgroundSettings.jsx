import { useContext } from "react"
import { BackgroundTypeContext } from "../../../context/backgrounds/BackgroundProvider"
import Selection from "../../../controls/Selection"
import SolidColor from "./colors/SolidColor"
import SolidGradient from "./colors/SolidGradient"

const BackgroundSettings = () => {
  const { backgroundType, setBackgroundType } = useContext(BackgroundTypeContext)

  const BackgroundOptions = ["solid", "gradient", "colorCycle", "gradientShift", "plasma", "beams"]
  const BackgroundLabels = [
    {
      title: "Colors",
      items: ["Solid color", "Solid gradient", "Color cycle", "Gradient shift"],
    },
    { title: "Animated", items: ["Plasma", "Beams"] },
    // { title: "Image", items: ["Upload", "Pexels API"] },
  ]

  return (
    <>
      <label htmlFor="layout-type" className="relative flex items-center justify-between">
        <span>
          <h2 className="text-lg text-black/90 dark:text-white/90">Background style</h2>
          <h3 className="text-black/60 dark:text-white/60">More coming soon</h3>
        </span>
        <Selection
          options={BackgroundOptions}
          labels={BackgroundLabels}
          value={backgroundType}
          setValue={setBackgroundType}
        />
      </label>
      {backgroundType === "solid" && <SolidColor />}
      {backgroundType === "gradient" && <SolidGradient />}
    </>
  )
}

export default BackgroundSettings
