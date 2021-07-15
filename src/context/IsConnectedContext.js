import { useState, createContext } from "react"

export const IsConnectedContext = createContext()

export const IsConnectedContextProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  return (
    <IsConnectedContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </IsConnectedContext.Provider>
  )
}