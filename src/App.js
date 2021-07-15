import LoginApp from './component/LoginApp'
import { IsConnectedContextProvider } from "./context/IsConnectedContext"

function App() {
  return (
    <IsConnectedContextProvider>
      <LoginApp />
    </IsConnectedContextProvider>
  );
}

export default App;
