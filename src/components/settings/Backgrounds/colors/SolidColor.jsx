import { useContext } from "react"
import { SolidBackgroundColorContext } from "../../../../context/backgrounds/colors/SolidColor"
import ColorSelector from "../../../../controls/ColorSelector"

const SolidColor = () => {
  const { solidBackgroundColor, setSolidBackgroundColor } = useContext(SolidBackgroundColorContext)

  // each item is a tuple, first element is light mode color, second element is dark mode color
  const backgroundOptions = [
    ["#7B7B7B", "#222222"],
    ["#7dd3fc", "#0c4a6e"],
    ["#a5b4fc", "#312e81"],
    ["#5eead4", "#134e4a"],
  ]

  return (
    <label htmlFor="solid-background-color" className="flex items-center justify-between">
      <h2 className="text-lg text-black/90 dark:text-white/90">Solid background color</h2>
      <ColorSelector value={solidBackgroundColor} setValue={setSolidBackgroundColor} options={backgroundOptions} />
    </label>
  )
}

export default SolidColor
