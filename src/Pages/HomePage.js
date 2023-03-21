import {
  Box, Container, Text,
  Tabs,TabList,Tab,TabPanel,TabPanels
} from '@chakra-ui/react'
import React from 'react'
import Login from '../components/authentications/Login'
import Signup from '../components/authentications/Signup'


function HomePage() {
  return (
    <Container maxW={'xl'} centerContent>
      <Box d='flex' justifyContent={'center'} p={3}
        bg={'white'} w='100%' m={'40px 0 15px 0'}
        borderRadius='lg' borderWidth={'1px'}
        alignItems='center'
      >
        <Text fontSize={'3xl'} fontFamily='work sans'
          color={'black'}>
          Let's Talk with friends
        </Text>
      </Box>
      <Box
        bg={'white'} w='100%' p={4} borderRadius='lg'
        borderWidth={'1px'}
      >
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList mb={'1em'}>
          <Tab width={'50%'}>LogIn</Tab>
          <Tab width={'50%'}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login></Login>   
          </TabPanel>
          <TabPanel>
              <Signup></Signup>  
            </TabPanel>
        </TabPanels>
      </Tabs> 
      </Box>
   </Container>
  )
}

export default HomePage
