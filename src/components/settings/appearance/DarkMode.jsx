import { useContext, useEffect, useState } from "react"
import { AutoDarkModeContext, DarkModeContext } from "../../../context/GeneralAppearance"
import Toggle from "../../../controls/Toggle"

const DarkMode = () => {
  const { autoDarkMode, setAutoDarkMode } = useContext(AutoDarkModeContext)
  const [canUseAutomatic, setCanUseAutomatic] = useState(true)

  useEffect(() => {
    if (!window.matchMedia) {
      setCanUseAutomatic(false)
      setAutoDarkMode(false)
    }
  }, [])

  return (
    <>
      <label
        htmlFor="auto-dark-mode"
        className={`flex items-center justify-between ${!canUseAutomatic && "cursor-not-allowed"}`}
      >
        <span>
          <h2
            className={`-mb-2 text-lg ${canUseAutomatic ? "text-black/90 dark:text-white/90" : "text-black/60 dark:text-white/60"}`}
          >
            Automatic dark mode
          </h2>
          <h3 className="text-black/50 dark:text-white/50">
            {canUseAutomatic ? "Use device setting for dark mode" : "Feature not supported in your browser"}
          </h3>
        </span>
        <Toggle disabled={!canUseAutomatic} htmlFor="auto-dark-mode" ctx={AutoDarkModeContext} />
      </label>
      <label
        htmlFor="dark-mode"
        className={`flex items-center justify-between ${autoDarkMode && "cursor-not-allowed"}`}
      >
        {autoDarkMode ? (
          <span>
            <h2
              className={`-mb-2 text-lg ${autoDarkMode ? "text-black/60 dark:text-white/60" : "text-black/90 dark:text-white/90"}`}
            >
              Dark mode
            </h2>
            <h3 className="text-black/50 dark:text-white/50">Automatic dark mode enabled</h3>
          </span>
        ) : (
          <h2 className="text-lg text-black/90 dark:text-white/90">Dark mode</h2>
        )}
        <Toggle disabled={autoDarkMode} htmlFor="dark-mode" ctx={DarkModeContext} />
      </label>
    </>
  )
}

export default DarkMode
