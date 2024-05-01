import { useContext, useMemo, useState } from "react"
import { ShortcutsContext } from "../../../context/ShortcutsProvider"
import "./Sortable.css"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableShortcut from "./SortableShortcut"
import AddFolder from "./controls/AddFolder"
import AddShortcut from "./controls/AddShortcut"
import ReOrder from "./controls/ReOrder"
import SortableFolderView from "./SortableFolderView"

const SortableShortcuts = () => {
  const { shortcuts, setShortcuts } = useContext(ShortcutsContext)
  const [folderView, setFolderView] = useState(false)
  const [isReordering, setIsReordering] = useState(false)
  const [isAnyEditing, setIsAnyEditing] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
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
  const folderData = useMemo(() => {
    return shortcuts.find((shortcut) => shortcut.id == folderView)
  }, [folderView, shortcuts])
  const restData = useMemo(() => {
    return shortcuts.filter((shortcut) => shortcut.id != folderView)
  }, [folderView])

  if (folderView) {
    return (
      <SortableFolderView
        setFolder={setFolderView}
        setShortcuts={(e) => {
          setShortcuts([
            ...restData,
            {
              ...folderData,
              children: e,
            },
          ])
        }}
        {...{ setIsReordering, isReordering, isAnyEditing }}
        folder={folderData}
      />
    )
  } else {
    return (
      <div className="mt-6 overflow-hidden border-t-2 border-black/30 pt-6 text-black dark:border-white/30 dark:text-white">
        <span className="mb-4 flex items-center justify-between">
          <h2
            className={`textAnimRight text-xl font-semibold duration-150 ease-in ${isTransitioning ? "translate-x-6 opacity-0" : ""}`}
          >
            All shortcuts
          </h2>
          <span className="flex items-center gap-2">
            <AddFolder {...{ shortcuts, setShortcuts }} />
            <AddShortcut {...{ shortcuts, setShortcuts }} />
            <ReOrder {...{ setIsReordering, isReordering, isAnyEditing }} />
          </span>
        </span>
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            <div
              className={`animFromLeft flex flex-col transition duration-150 ease-in ${isTransitioning ? "-translate-x-24 opacity-30" : null}`}
            >
              {shortcuts.map((shortcut) => {
                return (
                  <SortableShortcut
                    setIsAnyEditing={setIsAnyEditing}
                    openFolderView={setFolderView}
                    key={"sort-" + shortcut.id}
                    isReordering={isReordering}
                    setIsTransitioning={setIsTransitioning}
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
        </DndContext>
      </div>
    )
  }
}

export default SortableShortcuts
