import { IsConnectedContext } from "../context/IsConnectedContext"
import { useState, useContext } from 'react'
import { sha256 } from 'js-sha256';
import axios from 'axios'
import {
  Badge,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  VStack
} from "@chakra-ui/react"


function Register() {
  const { isConnected } = useContext(IsConnectedContext)
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const toast = useToast()

  const handleClickRegister = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "error : passwords are different",
        description: "password and confirmation password must be equal",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      setPassword("")
      setConfirmPassword("")
    } else {
      try {
        setIsLoading(true)
        let response = await axios.post('http://localhost:3333/register', {
          username: userName,
          password: sha256(password)
        })
        if (response.status === 200) {
          toast({
            title: "Your account have been created",
            description: `Your username is ${userName} `,
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        }
      } catch (e) {
        toast({
          title: `Error : ${e.message}`,
          description: `Username "${userName}" is unvalaible`,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        setUserName("")
        setPassword("")
        setConfirmPassword("")
      } finally {
        setIsLoading(false)
        setUserName("")
        setPassword("")
        setConfirmPassword("")
      }
    }
  }

  return (
    <> {!isConnected ?
      <Box as="form" mx="3">
        <FormControl mt="4" id="userName" isRequired >
          <FormLabel htmlFor="userName" >Username</FormLabel>
          <Input w="300px" placeholder="Your username" type="text" value={userName} onChange={(event) => setUserName(event.target.value)} />
        </FormControl>
        <FormControl mt="4" id="password" isRequired>
          <FormLabel htmlFor="password" >Password</FormLabel>
          <Input w="300px" placeholder="Your password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </FormControl>
        <FormControl mt="4" id="confirmPassword" isRequired>
          <FormLabel htmlFor="confirmPassword" >Confirm password</FormLabel>
          <Input w="300px" placeholder="Your password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </FormControl>
        <Button onClick={handleClickRegister} type="submit" isLoading={isLoading} mt="4" colorScheme="teal">Submit</Button>
      </Box>
      :
      <VStack my="8">
        <Badge p="2" colorScheme="green" borderRadius="md">Vous êtes connecté</Badge>
      </VStack>
    }
    </>
  )
}

export default Register