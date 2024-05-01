import { useEffect, useRef, useState } from "react"

const EditableView = ({ setData, data, cancelEdit }) => {
  const [shortcutData, setShortcutData] = useState(data)
  const scrollElem = useRef(null)
  useEffect(() => {
    if (scrollElem.current) {
      scrollElem.current.scrollIntoView({ behavior: "instant" })
    }
  }, [scrollElem.current])
  return (
    <div ref={scrollElem} className="my-2 flex flex-col gap-2 border-y border-black/30 py-2 dark:border-white/30">
      <span className="flex w-full justify-between">
        <div className="flex w-[48%] flex-col">
          <label htmlFor="shortcutName" className="text-black/70 dark:text-white/70">
            Shortcut name
          </label>
          <input
            id="shortcutName"
            value={shortcutData.name}
            onChange={(e) => setShortcutData({ ...shortcutData, name: e.target.value })}
            type="text"
            placeholder="Portfolio..."
            className="rounded-md border border-black/30 bg-neutral-100 px-2 py-1 hover:border-black/50 focus:border-black/50 focus:bg-neutral-200 dark:border-white/30 dark:bg-neutral-900 dark:hover:border-white/50 dark:focus:border-white/50 dark:focus:bg-neutral-800"
          />
        </div>
        <div className="flex w-[48%] flex-col">
          <label htmlFor="shortcutURL" className="text-black/70 dark:text-white/70">
            Shortcut URL
          </label>
          <input
            value={shortcutData.url}
            onChange={(e) => setShortcutData({ ...shortcutData, url: e.target.value })}
            id="shortcutURL"
            type="text"
            placeholder="www.dominicclerici.com/..."
            className="rounded-md border border-black/30 bg-neutral-100 px-2 py-1 hover:border-black/50 focus:border-black/50 focus:bg-neutral-200 dark:border-white/30 dark:bg-neutral-900 dark:hover:border-white/50 dark:focus:border-white/50 dark:focus:bg-neutral-800"
          />
        </div>
      </span>
      <span className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setData(shortcutData)
            cancelEdit()
          }}
          className="button-colors px-2 py-1.5"
        >
          <svg className="h-6 w-6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <button type="button" onClick={cancelEdit} className="button-colors px-3 py-2.5">
          <svg className="h-4 w-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </span>
    </div>
  )
}

export default EditableView
