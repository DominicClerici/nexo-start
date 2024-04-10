import LayoutController from "./components/LayoutController"
import MainProvider from "./context/MainProvider"

function App() {
  return (
    <MainProvider>
      <LayoutController />
    </MainProvider>
  )
}

export default App
