import { IsConnectedContext } from "../context/IsConnectedContext"
import { useContext } from 'react'
import {
  Button,
  useToast
} from "@chakra-ui/react"

const Disconnect = () => {
  const toast = useToast()
  const { setIsConnected } = useContext(IsConnectedContext)
  const handleOnClickDisconnect = () => {
    setIsConnected(false)
    toast({
      title: `Goodbye, you have been disconnected`,
      status: "info",
      duration: 3000,
      isClosable: true,
    })
  }
  return (
    <Button m="1" type="button" onClick={handleOnClickDisconnect}> Disconnect</Button>
  )
}

export default Disconnect