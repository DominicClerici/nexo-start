import { useContext } from "react"
import Clock from "./Clock"
import Weather from "./weather/Weather"
import { LayoutTypeContext } from "../context/GeneralAppearance"

const LayoutController = () => {
  const { layoutType } = useContext(LayoutTypeContext)
  if (layoutType === 0) {
    return (
      <main className="mt-36 flex flex-col items-center bg-gray-100 dark:bg-gray-950">
        <Clock />
        <Weather />
      </main>
    )
  }
  return (
    <main>
      <Clock />
      <Weather />
    </main>
  )
}

export default LayoutController
