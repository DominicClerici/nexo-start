import LayoutController from "./components/LayoutController"
import Background from "./components/background/Background"
import SettingsOpener from "./components/settings/SettingsOpener"
import MainProvider from "./context/MainProvider"

function App() {
  return (
    <MainProvider>
      <Background />
      <SettingsOpener />
      <LayoutController />
    </MainProvider>
  )
}

export default App
