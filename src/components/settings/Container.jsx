import * as Tabs from "@radix-ui/react-tabs"
import General from "./General"
import Appearance from "./appearance/Appearance"
import Weather from "./weather/Weather"
import Shortcuts from "./shortcuts/Shortcuts"
import "./tabAnimations.css"
import { useEffect, useRef, useState } from "react"

const className = {
  tab: "flex-1 px-3 py-1 m-1 dark:text-white/70 text-black/70 z-10 text-lg data-[state='active']:pointer-events-none rounded dark:hover:bg-white/5 hover:bg-black/5 cursor-pointer text-center dark:data-[state='active']:text-white data-[state='active']:text-black transition-colors duration-75",
}

const Container = () => {
  const [currentTab, setCurrentTab] = useState("gen")
  const [isSwitchingLeft, setIsSwitchingLeft] = useState(false)
  const tabSlider = useRef(null)
  const handleTabChange = (e) => {
    setCurrentTab((prev) => {
      const newIndex = ["gen", "app", "sho", "wea"].indexOf(e)
      const prevIndex = ["gen", "app", "sho", "wea"].indexOf(prev)
      if (prevIndex < newIndex) {
        setIsSwitchingLeft(true)
      } else {
        setIsSwitchingLeft(false)
      }
      return e
    })
  }
  useEffect(() => {
    const current = document.querySelector("[data-state='active']")
    tabSlider.current.style.width = current.offsetWidth + "px"
    tabSlider.current.style.height = current.offsetHeight + "px"
    tabSlider.current.style.transform = `translateX(${current.offsetLeft}px)`
  }, [currentTab])

  return (
    <div>
      <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
        <Tabs.List className="relative my-4 flex items-center gap-1 rounded bg-black/10 dark:bg-white/10">
          <Tabs.Trigger value="gen" className={className.tab}>
            General
          </Tabs.Trigger>
          <Tabs.Trigger value="app" className={className.tab}>
            Appearance
          </Tabs.Trigger>
          <Tabs.Trigger value="sho" className={className.tab}>
            Shortcuts
          </Tabs.Trigger>
          <Tabs.Trigger value="wea" className={className.tab}>
            Weather
          </Tabs.Trigger>
          <div
            ref={tabSlider}
            className="absolute rounded bg-white/60 transition-all duration-200 dark:bg-black/60"
          ></div>
        </Tabs.List>
        <div className="relative">
          <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="gen">
            <General />
          </Tabs.Content>
          <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="app">
            <Appearance />
          </Tabs.Content>
          <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="sho">
            <Shortcuts />
          </Tabs.Content>
          <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="wea">
            <Weather />
          </Tabs.Content>
          {/* <Tabs.Content value="gen">
            <General />
          </Tabs.Content>
          <Tabs.Content value="app">
            <Appearance />
          </Tabs.Content>
          <Tabs.Content value="sho">
            <Shortcuts />
          </Tabs.Content>
          <Tabs.Content value="wea">
            <Weather />
          </Tabs.Content> */}
        </div>
      </Tabs.Root>
    </div>
  )
}

export default Container
