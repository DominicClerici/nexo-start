import { useContext } from "react"
import { ShortcutsContext, ShortcutsEnabledContext } from "../../context/ShortcutsProvider"
import * as Popover from "@radix-ui/react-popover"

const Shortcut = ({ data }) => {
  return (
    <a
      href={data.url}
      className={`flex flex-col items-center justify-center rounded p-4 text-center text-black/90 hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10`}
    >
      {data.icon == null && (
        <div className="relative h-8 w-8">
          <img
            src={`https://www.google.com/s2/favicons?domain=${data.url}&sz=32`}
            alt={`${data.name}'s Icon`}
            className="absolute inset-0 h-8 w-8"
          />
        </div>
      )}
      <span className="line-clamp-1">{data.name}</span>
    </a>
  )
}

const Folder = ({ data }) => {
  let colCount
  if (data.children.length > 4) {
    colCount = 4
  } else {
    colCount = data.children.length
  }
  return (
    <Popover.Root>
      <Popover.Trigger className="line-clamp-1 flex flex-col items-center justify-center rounded p-4 text-center text-black/90 hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10">
        {data.name}
      </Popover.Trigger>
      <Popover.Content className="z-20 rounded-lg bg-neutral-900/10 p-2 backdrop-blur-lg dark:bg-neutral-200/10">
        <Popover.Arrow className="z-20 fill-neutral-900/10 backdrop-blur-lg dark:fill-neutral-200/10" />
        <h1 className="text-center text-xl font-semibold text-black/90 dark:text-white/90">{data.name}</h1>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}>
          {data.children.map((shortcut) => (
            <Shortcut key={data.id} data={shortcut} />
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}

const Shortcuts = () => {
  const { shortcuts } = useContext(ShortcutsContext)
  const { shortcutsEnabled } = useContext(ShortcutsEnabledContext)

  if (!shortcutsEnabled) return null
  let colCount
  if (shortcuts.length > 6) {
    colCount = 6
  } else {
    colCount = shortcuts.length
  }
  return (
    <div style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }} className="grid gap-2">
      {shortcuts.map((shortcut) => {
        if (shortcut.type === "folder") return <Folder key={shortcut.id} data={shortcut} />
        return <Shortcut key={shortcut.id} data={shortcut} />
      })}
    </div>
  )
}

export default Shortcuts
