import { useContext, useEffect, useState } from "react"
import { ShowHistoryContext } from "../../context/SearchProvider"

const msTwoMonths = 1000 * 60 * 60 * 24 * 7 * 8
const twoMonthsAgo = new Date().getTime() - msTwoMonths

const Results = ({ searchText, tempData, shouldShow }) => {
  const { showHistory } = useContext(ShowHistoryContext)
  const [historyResults, setHistoryResults] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  // use arrow keys to navigate through results
  useEffect(() => {
    if (!shouldShow) return
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prev) => (prev + 1) % (historyResults.length + 1))
        event.preventDefault()
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prev) => (prev - 1 + historyResults.length + 1) % (historyResults.length + 1))
        event.preventDefault()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [historyResults, shouldShow])

  useEffect(() => {
    setHighlightedIndex(0)
    if (searchText.trim() !== "") {
      if (showHistory) {
        setHistoryResults(tempData)
        // chrome.history.search({ text: searchText, maxResults: 4, startTime: twoMonthsAgo }, (data) => {
        //   setHistoryResults(
        //     data.map((item) => {
        //       return { title: item.title, url: item.url }
        //     }),
        //   )
        // })
      }
    }
  }, [searchText])

  if (!shouldShow || searchText.trim() == "") return null
  let historyJSX = <></>
  if (historyResults) {
    historyJSX = (
      <>
        <h2 className="flex items-center gap-2 text-lg font-medium text-black/80 after:block after:h-[1px] after:flex-grow after:bg-black/80 dark:text-white/80 dark:after:bg-white/80">
          Recent pages
        </h2>
        {historyResults.map((item, i) => {
          return (
            <div
              key={i}
              className={`flex cursor-pointer items-center gap-2 rounded p-1 ${highlightedIndex == 1 + i ? "bg-black/10 dark:bg-white/10" : ""}`}
            >
              <div className="relative h-6 w-6 flex-shrink-0">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=32`}
                  alt={`${item.title}'s Icon`}
                  className="absolute inset-0"
                />
              </div>
              <p className="line-clamp-1 flex-shrink text-black/90 dark:text-white/90">{item.title}</p>
            </div>
          )
        })}
      </>
    )
  }
  //   TODO: add shortcut search once we have all that logic going
  return (
    <div className="absolute z-30 w-80 flex-col rounded-b-lg bg-gray-200 p-2 dark:bg-neutral-900">
      <div
        className={`flex cursor-pointer items-center gap-2 rounded p-1 ${highlightedIndex == 0 ? "bg-black/10 dark:bg-white/10" : ""}`}
      >
        <img
          src="https://www.google.com/s2/favicons?domain=google.com&sz=32"
          alt="Google's Icon"
          className="h-6 w-6 rounded"
        />
        <p className="text-black/90 dark:text-white/90">Search with google</p>
      </div>
      {historyJSX}
    </div>
  )
}

export default Results
