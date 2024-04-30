import { useContext } from "react"
import { SolidGradientColorContext } from "../../context/backgrounds/colors/SolidGradient"

const SolidGradient = ({ darkMode }) => {
  const { solidGradientColor } = useContext(SolidGradientColorContext)
  return (
    <div
      style={{
        background: `linear-gradient(120deg, ${solidGradientColor[0][darkMode ? 1 : 0]} 0%, ${solidGradientColor[1][darkMode ? 1 : 0]} 100%)`,
      }}
      className="fixed inset-0 -z-10"
    ></div>
  )
}

export default SolidGradient
