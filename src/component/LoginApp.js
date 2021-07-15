import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link as ReachLink } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Page1 from './Page1'
import Disconnect from './Disconnect'

import {
  Box,
  Flex,
  Link,
  HStack
} from "@chakra-ui/react"

function LoginApp() {
  return (
    <Router>
      <>
        <Box position="sticky" w="100%" top="0" zIndex="sticky">
          <Flex justify="space-between">
            <HStack as="nav" m="1" px="3" bg="gray.300" py="1">
              <Link as={ReachLink} to={'/'} ml="2" px="3">Login</Link>
              <Link as={ReachLink} to={'/Register'} px="3">Register</Link>
              <Link as={ReachLink} to={'/Page1'} px="3">Page 1</Link>
            </HStack>
            <HStack>
              < Disconnect />
            </HStack>
          </Flex>
        </Box>
        <Box>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/Register' component={Register} />
            <Route path='/Page1' component={Page1} />
          </Switch>
        </Box>
      </>
    </Router>

  )
}

export default LoginApp