import generateUUID from "../../../../utils/generateUUID"

const AddShortcut = ({ shortcuts, setShortcuts }) => {
  const addShortcutHanlder = () => {
    setShortcuts([
      {
        id: generateUUID(),
        order: shortcuts.length + 1,
        name: "New Shortcut",
        url: "https://www.dominicclerici.com",
        type: "link",
      },
      ...shortcuts,
    ])
  }
  return (
    <button onClick={addShortcutHanlder} className="button-colors flex items-center gap-1 p-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 transition-transform group-hover:scale-125"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Shortcut
    </button>
  )
}

export default AddShortcut
