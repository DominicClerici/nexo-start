import { createContext } from "react"
import useChromeStorage from "../hooks/useChromeStorage"

// Shortcuts is a list of: {
//   type: "folder" || "link"
//   id: string,
//   name: string,
// only if type is "link": url: string,
//   icon: string || null,
//   order: number,
// only if type is "folder": children: [Shortcuts]
// }

const example_shortcuts = [
  {
    type: "folder",
    id: "folder1",
    name: "Folder 1",
    icon: null,
    order: 1,
    children: [
      {
        type: "link",
        id: "link1_1",
        name: "Link 1",
        url: "https://google.com",
        icon: null,
        order: 0,
      },
    ],
  },
  {
    type: "link",
    id: "link2",
    name: "Link 2",
    url: "https://google.com",
    icon: null,
    order: 2,
  },
  {
    type: "link",
    id: "link3",
    name: "Link 3",
    url: "https://facebook.com",
    icon: null,
    order: 3,
  },
  {
    type: "link",
    id: "link 4",
    name: "Link 4",
    url: "https://youtube.com",
    icon: null,
    order: 4,
  },
  {
    type: "link",
    id: "link4",
    name: "Link 4",
    url: "https://reddit.com",
    icon: null,
    order: 5,
  },
  {
    type: "link",
    id: "link5",
    name: "Link 4",
    url: "https://stackoverflow.com",
    icon: null,
    order: 6,
  },
  {
    type: "link",
    id: "link6",
    name: "Link 4",
    url: "https://google.com",
    icon: null,
    order: 7,
  },
  {
    type: "link",
    id: "link7",
    name: "Link 4",
    url: "https://dominicclerici.com",
    icon: null,
    order: 8,
  },
]

const ShortcutsContext = createContext()
// change to [] for production
const Shortcuts_default = example_shortcuts
const Shortcuts = ({ children }) => {
  const [shortcuts, setShortcuts] = useChromeStorage("shortcuts", Shortcuts_default)
  const flatShortcuts = shortcuts.reduce((acc, item) => {
    if (item.type === "folder") {
      return acc.concat(item.children)
    }
    return acc.concat(item)
  }, [])
  return (
    <ShortcutsContext.Provider value={{ shortcuts, setShortcuts, flatShortcuts }}>{children}</ShortcutsContext.Provider>
  )
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
