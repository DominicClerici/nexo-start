import { useContext } from "react"
import { SolidBackgroundColorContext } from "../../../context/backgrounds/SolidColor"
import ColorSelector from "../../../controls/ColorSelector"

const SolidColor = () => {
  const { solidBackgroundColor, setSolidBackgroundColor } = useContext(SolidBackgroundColorContext)

  // each item is a tuple, first element is light mode color, second element is dark mode color
  const backgroundOptions = [
    ["#134e4a", "#5eead4"],
    ["#0c4a6e", "#7dd3fc"],
    ["#312e81", "#a5b4fc"],
    ["#134e4a", "#5eead4"],
    ["#0c4a6e", "#7dd3fc"],
    ["#312e81", "#a5b4fc"],
    ["#134e4a", "#5eead4"],
    ["#0c4a6e", "#7dd3fc"],
    ["#312e81", "#a5b4fc"],
    ["#134e4a", "#5eead4"],
    ["#0c4a6e", "#7dd3fc"],
    ["#312e81", "#a5b4fc"],
    ["#134e4a", "#5eead4"],
    ["#0c4a6e", "#7dd3fc"],
    ["#312e81", "#a5b4fc"],
    ["#134e4a", "#5eead4"],
    ["#0c4a6e", "#7dd3fc"],
    ["#312e81", "#a5b4fc"],
    ["#134e4a", "#5eead4"],
    ["#0c4a6e", "#7dd3fc"],
    ["#312e81", "#a5b4fc"],
  ]

  return (
    <label htmlFor="solid-background-color" className="flex items-center justify-between">
      <h2 className="text-lg text-black/90 dark:text-white/90">Solid background color</h2>
      <ColorSelector value={solidBackgroundColor} setValue={setSolidBackgroundColor} options={backgroundOptions} />
    </label>
  )
}

export default SolidColor
