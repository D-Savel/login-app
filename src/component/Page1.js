import { IsConnectedContext } from "../context/IsConnectedContext"
import { useContext } from 'react'
import {
  VStack,
  Badge,
  Alert,
  Heading,
  AlertIcon
} from "@chakra-ui/react"

function Page1() {
  const { isConnected } = useContext(IsConnectedContext)
  return (
    <>
      {isConnected ?
        <>
          <VStack my="8">
            <Heading>Page 1 </Heading>
            <Badge p="2" colorScheme="green" borderRadius="md">Vous êtes connecté</Badge>
          </VStack>
        </>
        :
        <Alert alignItems="center"
          justifyContent="center"
          textAlign="center" mt="10" status="error">
          <AlertIcon />
          Vous devez être connecté pour acceder à cette page
        </Alert>
      }
    </>
  )
}
export default Page1