import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import EditableView from "./EditableView"
import { useMemo, useState } from "react"
import prettyURL from "../../../utils/parseURL"
import { TWValueToHex } from "../../../utils/colorConversions"

const SortableShortcut = ({
  isReordering,
  del,
  data,
  setData,
  setIsAnyEditing,
  openFolderView,
  setIsTransitioning,
  setBlockInitialAnim,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data.order,
    animateLayoutChanges: () => false,
  })
  const style = {
    transform: CSS.Translate.toString({
      ...transform,
      x: 0,
    }),
    transition,
  }

  const prettyUrl = useMemo(() => prettyURL(data.url), [data.url])

  if (!isEditing) {
    return (
      <div style={style} ref={setNodeRef} className="flex items-center">
        {data.type === "folder" ? (
          <svg
            className="mr-2 h-6 w-6"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M464 128H272l-54.63-54.63c-6-6-14.14-9.37-22.63-9.37H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm0 272H48V112h140.12l54.63 54.63c6 6 14.14 9.37 22.63 9.37H464v224z"></path>
          </svg>
        ) : (
          <img className="mr-2 h-6 w-6" src={`https://www.google.com/s2/favicons?domain=${data.url}&sz=32`} />
        )}
        <h2 className="line-clamp-1 w-1/3 max-w-[149px]">{data.name}</h2>
        <h2 className="line-clamp-1 w-1/3 max-w-[149px] text-sm text-black/50 dark:text-white/50">{prettyUrl}</h2>
        <span className="ml-auto">
          {!isReordering ? (
            <>
              {data.type === "link" ? (
                <button
                  onClick={() => {
                    setIsEditing(true)
                    setIsAnyEditing(true)
                  }}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drawOnHover group h-10 w-10 cursor-pointer rounded p-2 outline-none transition-colors duration-75 hover:bg-black/10 dark:hover:bg-white/10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path className="pathToDraw" d="M12 20h9" strokeDasharray={10} strokeDashoffset={10}></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      openFolderView(data.id)
                      setBlockInitialAnim(false)
                      setIsTransitioning(false)
                    }, 150)
                  }}
                >
                  <svg
                    className="mainGroupHover group h-10 w-10 cursor-pointer rounded p-2.5 outline-none transition-colors duration-75 hover:bg-black/10 dark:hover:bg-white/10"
                    viewBox="0 0 10 10"
                    stroke="currentColor"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      className="-translate-x-0.5 transition-transform duration-100 group-hover:translate-x-0"
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 1 L9 5 L5 9"
                    ></path>
                    <path
                      className="buttonArrowDasharray -translate-x-0.5 transition-all duration-100 group-hover:translate-x-0"
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={8}
                      strokeDashoffset={8}
                      d="M9 5 L1 5"
                    ></path>
                  </svg>
                </button>
              )}

              <button onClick={del}>
                <svg
                  className="group h-10 w-10 cursor-pointer rounded p-1.5 outline-none transition-colors duration-75 hover:bg-black/10 dark:hover:bg-white/10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 28"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    className="translate-y-0.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:rotate-12"
                    d="M20.5001 6H3.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    className="translate-y-0.5"
                    d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    className="translate-y-0.5 transition-transform group-hover:-translate-y-0.5  group-hover:translate-x-1 group-hover:rotate-12"
                    d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </>
          ) : (
            <button {...attributes} {...listeners}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="h-10 w-10 cursor-pointer rounded p-1.5 hover:bg-black/10 dark:hover:bg-white/10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="transition-all duration-100"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d={isDragging ? "M3 16.5L21 16.5" : "M3 19L21 19"}
                  fill="currentColor"
                ></path>
                <path
                  className="transition-all duration-100"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d={isDragging ? "M5 12L19 12" : "M3 12L21 12"}
                  fill="currentColor"
                ></path>

                <path
                  className="transition-all duration-100"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d={isDragging ? "M3 7.5L21 7.5" : "M3 5L21 5"}
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          )}
        </span>
      </div>
    )
  } else {
    return (
      <EditableView
        cancelEdit={() => {
          setIsEditing(false)
          setIsAnyEditing(false)
        }}
        setData={setData}
        data={data}
      />
    )
  }
}

export default SortableShortcut
