import { useContext } from "react"
import { ShortcutsEnabledContext } from "../../../context/ShortcutsProvider"
import Toggle from "../../../controls/Toggle"
import SortableShortcuts from "./SortableShortcuts"

const Shortcuts = () => {
  const { shortcutsEnabled } = useContext(ShortcutsEnabledContext)

  return (
    <>
      <label htmlFor="shortcuts-enabled" className="flex items-center justify-between">
        <h2 className="text-lg text-black/90 dark:text-white/90">Display shortcuts</h2>
        <Toggle htmlFor="shortcuts-enabled" ctx={ShortcutsEnabledContext} />
      </label>
      {shortcutsEnabled && <SortableShortcuts />}
    </>
  )
}

export default Shortcuts
