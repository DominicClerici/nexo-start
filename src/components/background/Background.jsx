import { useContext } from "react"
import { BackgroundTypeContext } from "../../context/backgrounds/BackgroundProvider"
import Solid from "./Solid"

const Background = () => {
  const { backgroundType } = useContext(BackgroundTypeContext)
  if (backgroundType === "solid") {
    return <Solid />
  }
  return <div></div>
}

export default Background
