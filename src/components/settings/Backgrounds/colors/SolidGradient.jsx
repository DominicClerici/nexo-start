import { useContext } from "react"
import { SolidGradientColorContext } from "../../../../context/backgrounds/colors/SolidGradient"
import ColorSelector from "../../../../controls/ColorSelector"

const SolidGradient = () => {
  const { solidGradientColor, setSolidGradientColor } = useContext(SolidGradientColorContext)
  const backgroundOptions = [
    ["#7B7B7B", "#222222"],
    ["#7dd3fc", "#0c4a6e"],
    ["#a5b4fc", "#312e81"],
    ["#5eead4", "#134e4a"],
  ]

  const handleSetStart = (e) => {
    setSolidGradientColor([e, solidGradientColor[1]])
  }
  const handleSetEnd = (e) => {
    setSolidGradientColor([solidGradientColor[0], e])
  }

  return (
    <>
      <label htmlFor="solid-gradient-start-color" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Gradient start color</h2>
        <ColorSelector value={solidGradientColor[0]} setValue={handleSetStart} options={backgroundOptions} />
      </label>
      <label htmlFor="solid-gradient-end-color" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Gradient end color</h2>
        <ColorSelector value={solidGradientColor[1]} setValue={handleSetEnd} options={backgroundOptions} />
      </label>
    </>
  )
}

export default SolidGradient
