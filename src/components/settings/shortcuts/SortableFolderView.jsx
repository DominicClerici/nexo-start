import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableShortcut from "./SortableShortcut"
import AddShortcut from "./controls/AddShortcut"
import ReOrder from "./controls/ReOrder"
import { useState } from "react"

const SortableFolderView = ({ folder, setFolder, setShortcuts }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const shortcuts = folder.children
  const [isReordering, setIsReordering] = useState(false)
  const [isAnyEditing, setIsAnyEditing] = useState(false)

  const handleDragEnd = (e) => {
    const { active, over } = e
    if (active.id !== over.id) {
      const oldIndex = shortcuts.findIndex((i) => i.order === active.id)
      const newIndex = shortcuts.findIndex((i) => i.order === over.id)
      const tempShortcuts = arrayMove(shortcuts, oldIndex, newIndex)
      const finalShortcuts = tempShortcuts.map((item, index) => {
        return { ...item, order: index + 1 }
      })
      setShortcuts(finalShortcuts)
    }
  }

  const itemIds = shortcuts.map((item) => item.order)
  return (
    <div className="mt-6 border-t-2 border-black/30 pt-6 text-black dark:border-white/30 dark:text-white">
      <span className="flex items-center justify-between">
        <h2 className="text-main/90 line-clamp-1 flex items-center text-xl">
          <svg
            className="mainGroupHover group h-8 w-8 rotate-180 cursor-pointer rounded p-2 outline-none transition-colors duration-75 hover:bg-black/10 dark:hover:bg-white/10"
            viewBox="0 0 10 10"
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setFolder(false)
              }, 150)
            }}
            stroke="currentColor"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="-translate-x-0.5 transition-transform duration-100 group-hover:translate-x-0"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 1 L9 5 L5 9"
            ></path>
            <path
              className="buttonArrowDasharray -translate-x-0.5 transition-all duration-100 group-hover:translate-x-0"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={8}
              strokeDashoffset={8}
              d="M9 5 L1 5"
            ></path>
          </svg>
          <span
            className={`textAnimLeft ml-1 line-clamp-1 text-xl font-semibold transition duration-150 ease-in ${isTransitioning ? "-translate-x-6 opacity-0" : ""}`}
          >
            {folder.name}
          </span>
        </h2>
        <span className="flex items-center gap-2">
          <AddShortcut {...{ shortcuts, setShortcuts }} />
          <ReOrder {...{ setIsReordering, isReordering, isAnyEditing }} />
        </span>
      </span>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <div
            className={`flex w-full flex-col py-2 transition duration-150 ease-in ${isTransitioning ? "translate-x-24 opacity-30" : null}`}
          >
            {shortcuts.map((shortcut) => {
              return (
                <SortableShortcut
                  setIsAnyEditing={setIsAnyEditing}
                  openFolderView={null}
                  key={"sort-" + shortcut.id}
                  id={shortcut.order}
                  isReordering={isReordering}
                  del={() => {
                    setShortcuts(shortcuts.filter((d) => d.id !== shortcut.id))
                  }}
                  data={shortcut}
                  setData={(newData) => {
                    setShortcuts(
                      shortcuts.map((d) => {
                        if (d.id === shortcut.id) {
                          return newData
                        }
                        return d
                      }),
                    )
                  }}
                />
              )
            })}
          </div>
        </SortableContext>
      </DndContext>{" "}
    </div>
  )
}

export default SortableFolderView
