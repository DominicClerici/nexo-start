import { useContext } from "react"
import { SolidBackgroundColorContext } from "../../context/backgrounds/SolidColor"
import { DarkModeContext } from "../../context/GeneralAppearance"

const Solid = () => {
  const { solidBackgroundColor } = useContext(SolidBackgroundColorContext)
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div
      style={{ backgroundColor: darkMode ? solidBackgroundColor.dark : solidBackgroundColor.light }}
      className="fixed inset-0 -z-10 transition-colors duration-200"
    ></div>
  )
}

export default Solid
