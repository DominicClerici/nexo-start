import { createContext } from "react"
import useChromeStorage from "../hooks/useChromeStorage"

// Shortcuts is a list of: {
//   type: "folder" || "link"
//   id: string,
//   name: string,
// only if type is "link": url: string,
//   icon: string || null,
//   color: string || null,
//   order: number,
// only if type is "folder": children: [Shortcuts]
// }

const example_shortcuts = [
  {
    type: "folder",
    id: "folder1",
    name: "Folder 1",
    icon: "folder",
    color: "blue",
    order: 0,
    children: [
      {
        type: "link",
        id: "link1",
        name: "Link 1",
        url: "https://example.com",
        icon: "link",
        color: "red",
        order: 0,
      },
    ],
  },
  {
    type: "link",
    id: "link2",
    name: "Link 2",
    url: "https://example.com",
    icon: "link",
    color: "green",
    order: 1,
  },
]

const ShortcutsContext = createContext()
// change to [] for production
const Shortcuts_default = example_shortcuts
const Shortcuts = ({ children }) => {
  const [shortcuts, setShortcuts] = useChromeStorage("shortcuts", Shortcuts_default)
  return <ShortcutsContext.Provider value={{ shortcuts, setShortcuts }}>{children}</ShortcutsContext.Provider>
}
export { ShortcutsContext }

const ShortcutsEnabledContext = createContext()
const ShortcutsEnabled_default = true
const ShortcutsEnabled = ({ children }) => {
  const [shortcutsEnabled, setShortcutsEnabled] = useChromeStorage("shortcutsEnabled", ShortcutsEnabled_default)
  return (
    <ShortcutsEnabledContext.Provider value={{ shortcutsEnabled, setShortcutsEnabled }}>
      {children}
    </ShortcutsEnabledContext.Provider>
  )
}
export { ShortcutsEnabledContext }

const ShortcutsProvider = ({ children }) => {
  return (
    <ShortcutsEnabled>
      <Shortcuts>{children}</Shortcuts>
    </ShortcutsEnabled>
  )
}
export default ShortcutsProvider
