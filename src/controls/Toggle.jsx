import * as Switch from "@radix-ui/react-switch"
import { useContext } from "react"

const Toggle = ({ htmlFor, ctx }) => {
  const ctxt = useContext(ctx)
  const vals = Object.values(ctxt)
  return (
    <Switch.Root
      id={htmlFor}
      checked={vals[0]}
      onCheckedChange={(e) => vals[1](e)}
      className="relative h-7 w-12 rounded-full border border-white/25 px-1 ring-white/50 transition-colors duration-75 focus:ring-2 data-[state='checked']:bg-blue-500 data-[state='unchecked']:bg-black"
    >
      <Switch.Thumb className="block h-5 w-6 rounded-full bg-white transition-transform duration-75 data-[state='checked']:translate-x-3.5" />
    </Switch.Root>
  )
}

export default Toggle
