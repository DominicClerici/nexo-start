import { useContext } from "react"
import { SolidBackgroundColorContext } from "../../context/backgrounds/colors/SolidColor"

const Solid = ({ darkMode }) => {
  const { solidBackgroundColor } = useContext(SolidBackgroundColorContext)

  return (
    <div
      style={{ backgroundColor: darkMode ? solidBackgroundColor[1] : solidBackgroundColor[0] }}
      className="fixed inset-0 -z-10 transition-colors duration-200"
    ></div>
  )
}

export default Solid
