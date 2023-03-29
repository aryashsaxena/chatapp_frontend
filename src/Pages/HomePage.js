import {
  Box, Container, Text,
  Tabs,TabList,Tab,TabPanel,TabPanels
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Login from '../components/authentications/Login'
import Signup from '../components/authentications/Signup'


function HomePage() {

   const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
      
        if (user) {
            history.push('/chats');
        }
    }, [history]);

  return (
    <Container maxW={'xl'} centerContent>
      <Box display='flex' justifyContent={'center'} p={3}
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
            <Login/>   
          </TabPanel>
          <TabPanel>
              <Signup/> 
            </TabPanel>
        </TabPanels>
      </Tabs> 
      </Box>
   </Container>
  )
}

export default HomePage
