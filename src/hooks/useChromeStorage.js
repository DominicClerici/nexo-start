import { useEffect, useRef, useState } from "react"

const useChromeStorage = (key, initialValue) => {
  const [data, setData] = useState(() => {
    const cachedValue = localStorage.getItem(key)
    return cachedValue !== null ? JSON.parse(cachedValue) : initialValue
  })
  const debounceUpdate = useRef(null)
  const originalData = useRef(null)

  const storage = chrome.storage
  useEffect(() => {
    if (storage) {
      storage.sync.get([key], (result) => {
        // If the data exists, use it. Otherwise, set the default value.
        if (chrome.runtime.lastError) {
          // ! ADD ERROR HANDLING HERE
          console.error(`Error getting ${key}:, ${chrome.runtime.lastError}`)
          return
        }
        if (result[key] !== undefined) {
          setData(result[key])
          localStorage.setItem(key, JSON.stringify(result[key]))
        } else {
          storage.sync.set({ [key]: initialValue }, () => {
            if (chrome.runtime.lastError) {
              // ! ADD ERROR HANDLING HERE
              console.error(`Error setting ${key}:, ${chrome.runtime.lastError}`)
              return
            }
            setData(initialValue)
            localStorage.setItem(key, JSON.stringify(initialValue))
          })
        }
      })
    }
  }, [key, initialValue])

  const updateData = (newValue) => {
    if (debounceUpdate.current) {
      clearTimeout(debounceUpdate.current)
    } else {
      originalData.current = data
    }
    setData(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
    debounceUpdate.current = setTimeout(() => {
      storage.sync.set({ [key]: newValue }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Error getting ${key}:, ${chrome.runtime.lastError}`)
          setData(originalData.current)
          localStorage.setItem(key, JSON.stringify(originalData.current))
          return
        }
        debounceUpdate.current = null
      })
    }, 1000)
  }
  if (storage === undefined) {
    return [data, setData]
  }
  return [data, updateData]
}

export default useChromeStorage
