import { IsConnectedContext } from "../context/IsConnectedContext"
import { useState, useContext } from 'react'
import { sha256 } from 'js-sha256';
import axios from 'axios'
import { Link as ReachLink } from 'react-router-dom'
import {
  Badge,
  Box,
  Button,
  HStack,
  Link,
  Input,
  FormControl,
  FormLabel,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react"

function Login() {
  const { isConnected, setIsConnected } = useContext(IsConnectedContext)
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()

  const handleClickLogin = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      let response = await axios.post('http://localhost:3333/login', {
        username: userName,
        password: sha256(password)
      })
      if (response.status === 200) {
        toast({
          title: `Welcome ${userName}, you are connected`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        setIsConnected(true)
      }
    } catch (e) {
      console.error(e.message)
      toast({
        title: `Error : ${e.message}`,
        description: 'Username or password invalid',
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      setPassword("")
    } finally {
      setIsLoading(false)
      setUserName("")
      setPassword("")
    }
  }

  return (
    <>
      {!isConnected ?
        <>
          <Box as="form" mx="3">
            <FormControl mt="4" id="userName" isRequired >
              <FormLabel htmlFor="userName" >Username</FormLabel>
              <Input w="300px" placeholder="Your username" type="text" value={userName} onChange={(event) => setUserName(event.target.value)} />
            </FormControl>
            <FormControl mt="4" id="password" isRequired>
              <FormLabel htmlFor="password" >Password</FormLabel>
              <Input w="300px" placeholder="Your password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </FormControl>
            <Button onClick={handleClickLogin} type="submit" isLoading={isLoading} mt="4" colorScheme="teal">Submit</Button>
          </Box>
          <HStack align="center" m="10">
            <Text>Not yet register !</Text>
            <Link as={ReachLink} to={'/Register'} px="5">
              <Button colorScheme="teal" type="button">Register</Button>
            </Link>
          </HStack>
        </>
        :
        <VStack my="8">
          <Badge p="2" colorScheme="green" borderRadius="md">Vous êtes connecté</Badge>
        </VStack>
      }
    </>
  )
}

export default Login
