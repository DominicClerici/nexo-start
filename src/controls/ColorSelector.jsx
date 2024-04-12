import * as Popover from "@radix-ui/react-popover"
import { useContext } from "react"
import { DarkModeContext } from "../context/GeneralAppearance"
const ColorSelector = ({ value, setValue, options }) => {
  const { darkMode } = useContext(DarkModeContext)
  if (typeof options[0] === "object") {
    return (
      <Popover.Root>
        <Popover.Trigger className="button-colors flex items-center gap-2 px-4 py-2">
          <div style={{ backgroundColor: darkMode ? value[1] : value[0] }} className="h-5 w-5 rounded"></div>
          Change
        </Popover.Trigger>
        <Popover.Content className="mr-6 grid grid-cols-6 gap-2 rounded-lg border border-black/30 bg-neutral-200 p-2 dark:border-white/30 dark:bg-neutral-950">
          <Popover.Arrow className="fill-neutral-200 stroke-black/30 stroke-2 dark:fill-neutral-950 dark:stroke-white/30" />
          {options.map((option, i) => {
            const isSelected = option[0] === value[0] && option[1] === value[1]
            return (
              <div
                onClick={() => setValue(option)}
                key={"col_sel_" + i}
                className={`flex h-8 w-8 cursor-pointer rounded ${isSelected && "ring-[2px]"} ring-white`}
              >
                <div style={{ backgroundColor: option[0] }} className="h-8 w-4 rounded-l"></div>
                <div style={{ backgroundColor: option[1] }} className="h-8 w-4 rounded-r"></div>
              </div>
            )
          })}
        </Popover.Content>
      </Popover.Root>
    )
  } else {
    return <div className="rounded bg-white p-2 text-red-500">not supported</div>
  }
}

export default ColorSelector
