import { useEffect, useRef, useState } from "react"
import Results from "./Results"

const exampleData = [
  {
    id: "24700",
    lastVisitTime: 1712384510519.617,
    title: "Projects - Figma",
    typedCount: 0,
    url: "https://www.figma.com/file/o3NkXgBfsg9Hcb49iVLbLd/Projects?type=design&node-id=312-25&mode=design&t=IuVCUVSkmb3dqygK-0",
    visitCount: 10,
  },
  {
    id: "24212",
    lastVisitTime: 1712026345694.272,
    title: "How To Graph Polar Equations - YouTube",
    typedCount: 0,
    url: "https://www.youtube.com/watch?v=jO4lwddfeDA&t=985s",
    visitCount: 1,
  },
  {
    id: "24199",
    lastVisitTime: 1712023865545.604,
    title: "Horizontal Tangent Lines & Vertical Tangent Lines In Polar Form - YouTube",
    typedCount: 0,
    url: "https://www.youtube.com/watch?v=EVemXHWbqWI&t=693s",
    visitCount: 2,
  },
  {
    id: "23844",
    lastVisitTime: 1712002396727.549,
    title: "How to add a new line among math equations in obsidian markdown editor? - Basement - Obsidian Forum",
    typedCount: 0,
    url: "https://forum.obsidian.md/t/how-to-add-a-new-line-among-math-equations-in-obsidian-markdown-editor/7399/3",
    visitCount: 1,
  },
]

const SearchBar = () => {
  const [searchText, setSearchText] = useState("")
  const [shouldShow, setShouldShow] = useState(false)
  const searchRef = useRef(null)

  // setShouldShow to true when the input is focused or clicked on, set it to false when there is a click outside SearchRef or if the user presses the escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShouldShow(false)
      } else {
        setShouldShow(true)
        searchRef.current.children.item(0).focus()
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setShouldShow(false)
        searchRef.current.children.item(0).blur()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  return (
    <div className="relative" ref={searchRef}>
      <input
        id="search"
        autoComplete="off"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={`w-80 ${shouldShow && searchText.trim() !== "" ? "rounded-t" : "rounded"} border border-black/40 bg-gray-200 px-2 py-1 text-xl font-medium text-black/90 outline-none dark:border-white/40 dark:bg-neutral-900 dark:text-white/90 `}
        placeholder="find something..."
      ></input>
      <Results tempData={exampleData} shouldShow={shouldShow} searchText={searchText} />
    </div>
  )
}

export default SearchBar
