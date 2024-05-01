import { useContext, useEffect, useState } from "react"
import { ShowHistoryContext } from "../../context/SearchProvider"
import fuzzysort from "fuzzysort"
import { ShortcutsContext, ShortcutsEnabledContext } from "../../context/ShortcutsProvider"

const msTwoMonths = 1000 * 60 * 60 * 24 * 7 * 8
const twoMonthsAgo = new Date().getTime() - msTwoMonths

const Results = ({ searchText, shouldShow }) => {
  const { showHistory } = useContext(ShowHistoryContext)
  const { flatShortcuts } = useContext(ShortcutsContext)
  const { shortcutsEnabled } = useContext(ShortcutsEnabledContext)
  const [shortcutResults, setShortcutResults] = useState([])
  const [historyResults, setHistoryResults] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  // use arrow keys to navigate through results
  useEffect(() => {
    if (!shouldShow) return
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prev) => (prev + 1) % (historyResults.length + shortcutResults.length + 1))
        event.preventDefault()
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex(
          (prev) =>
            (prev - 1 + historyResults.length + shortcutResults.length + 1) %
            (historyResults.length + shortcutResults.length + 1),
        )
        event.preventDefault()
      } else if (event.key === "Enter") {
        if (highlightedIndex === 0) {
          window.open(`https://www.google.com/search?q=${searchText}`)
        } else if (highlightedIndex <= historyResults.length) {
          window.open(historyResults[highlightedIndex - 1].url)
        } else {
          window.open(shortcutResults[highlightedIndex - 1 - historyResults.length].url)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [historyResults, shouldShow, highlightedIndex])

  useEffect(() => {
    setHighlightedIndex(0)
    if (searchText.trim() !== "") {
      if (showHistory) {
        chrome.history.search({ text: searchText, maxResults: 50, startTime: twoMonthsAgo }, (data) => {
          const temp = data.map((item) => {
            return { title: item.title, url: item.url }
          })
          const res = fuzzysort.go(searchText, temp, { key: "title" }).slice(0, 4)
          setHistoryResults(res.map((e) => e.obj))
        })
      }
      if (shortcutsEnabled) {
        const res = fuzzysort.go(searchText, flatShortcuts, { key: "name" }).slice(0, 4)
        setShortcutResults(res.map((e) => e.obj))
      }
    }
  }, [searchText])

  if (!shouldShow || searchText.trim() == "") return null

  let historyJSX = <></>
  if (historyResults.length !== 0 && showHistory) {
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
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "./images/error.svg"
                  }}
                  src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=32`}
                  alt={`${item.title}'s Icon`}
                  className="absolute inset-0 h-6 w-6"
                />
              </div>
              <p className="line-clamp-1 flex-shrink text-black/90 dark:text-white/90">{item.title}</p>
            </div>
          )
        })}
      </>
    )
  }

  let shortcutsJSX = <></>
  if (shortcutsEnabled && shortcutResults.length !== 0) {
    shortcutsJSX = (
      <>
        <h2 className="flex items-center gap-2 text-lg font-medium text-black/80 after:block after:h-[1px] after:flex-grow after:bg-black/80 dark:text-white/80 dark:after:bg-white/80">
          Shortcuts
        </h2>
        {shortcutResults.map((item, i) => {
          return (
            <div
              key={i}
              className={`flex cursor-pointer items-center gap-2 rounded p-1 ${highlightedIndex == 1 + historyResults.length + i ? "bg-black/10 dark:bg-white/10" : ""}`}
            >
              <div className="relative h-6 w-6 flex-shrink-0">
                <img
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "./images/error.svg"
                  }}
                  src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=32`}
                  alt={`${item.name}'s Icon`}
                  className="absolute inset-0 h-6 w-6"
                />
              </div>
              <p className="line-clamp-1 flex-shrink text-black/90 dark:text-white/90">{item.name}</p>
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
      {shortcutsJSX}
    </div>
  )
}

export default Results
