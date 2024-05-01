import { useContext } from "react"
import Clock from "./Clock"
import Weather from "./weather/Weather"
import { LayoutTypeContext } from "../context/GeneralAppearance"
import SearchBar from "./search/SearchBar"
import Shortcuts from "./shortcuts/Shortcuts"

const LayoutController = () => {
  const { layoutType } = useContext(LayoutTypeContext)
  if (layoutType === 0) {
    return (
      <main className="short:mt-4 mt-36 flex flex-col items-center gap-4">
        <Clock />
        <Weather />
        <SearchBar />
        <Shortcuts />
      </main>
    )
  } else if (layoutType === 1) {
    return (
      <main className="mx-auto mt-52 grid max-w-screen-lg grid-cols-2 items-center gap-4">
        <div className="flex flex-col justify-center">
          <Clock />
          <div className="mb-12">
            <Weather />
          </div>
          <SearchBar />
        </div>
        <Shortcuts />
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
