import * as Switch from "@radix-ui/react-switch"

const Toggle = ({ htmlFor }) => {
  return (
    <Switch.Root
      id={htmlFor}
      className="relative h-7 w-12 rounded-full border border-white/25 px-0.5 ring-white/50 transition-colors duration-100 focus:ring-2 data-[state='checked']:bg-blue-500 data-[state='unchecked']:bg-black"
    >
      <Switch.Thumb className="block h-6 w-7 rounded-full bg-white transition-transform duration-100 data-[state='checked']:translate-x-5" />
    </Switch.Root>
  )
}

export default Toggle
