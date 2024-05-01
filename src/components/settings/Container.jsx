import * as Tabs from "@radix-ui/react-tabs"
import General from "./General"
import Appearance from "./Appearance"
import Weather from "./Weather"
import Shortcuts from "./shortcuts/Shortcuts"

const className = {
  tab: "flex-1 px-3 py-1 dark:text-white/70 text-black/70 text-lg rounded dark:hover:bg-white/5 hover:bg-black/5 cursor-pointer text-center dark:data-[state='active']:text-white data-[state='active']:text-black dark:data-[state='active']:bg-black/60 data-[state='active']:bg-white/60 transition-colors duration-75",
}

const Container = () => {
  return (
    <div>
      <Tabs.Root defaultValue="shortcuts">
        <Tabs.List className="my-4 flex gap-2 rounded bg-black/10 p-1 dark:bg-white/10">
          <Tabs.Trigger value="general" className={className.tab}>
            General
          </Tabs.Trigger>
          <Tabs.Trigger value="appearance" className={className.tab}>
            Appearance
          </Tabs.Trigger>
          <Tabs.Trigger value="shortcuts" className={className.tab}>
            Shortcuts
          </Tabs.Trigger>
          <Tabs.Trigger value="weather" className={className.tab}>
            Weather
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="general">
          <General />
        </Tabs.Content>
        <Tabs.Content value="appearance">
          <Appearance />
        </Tabs.Content>
        <Tabs.Content value="shortcuts">
          <Shortcuts />
        </Tabs.Content>
        <Tabs.Content value="weather">
          <Weather />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default Container
