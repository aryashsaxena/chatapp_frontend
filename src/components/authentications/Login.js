import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [show,setShow]=useState(false);
    const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
 
    const handleClick = () => setShow(!show);
    
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the feilds",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("api/user/login",
        { email, password },
        config);
      
      toast({
        title: "Login Successful !!",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      history.push('/chats');
      
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured",
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

  };

  return (
      <VStack spacing={'5px'}>
         
           <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input
          placeholder="Enter your Email"
          value={email}
               onChange={(event)=>setEmail(event.target.value)}
               />
          </FormControl>

           <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                   <Input
                     type={ show ?'text':'password'}
            placeholder="Enter your Password"
            value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                  />
                  <InputRightElement width={'4.5rem'}>
                    <Button h='1.75rem ' size={'sm'} onClick={handleClick}>
                          {show ? 'Hide' : "Show"}
                  </Button>
                  </InputRightElement>
              </InputGroup>
             
          </FormControl>

          <Button
              colorScheme={'blue'} width='100%' style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
          >
              Login
          </Button>

          <Button
              variant={'solid'} colorScheme='red' width={'100%'}
              onClick={() => {
                  setEmail('guest@example.com');
                  setPassword('123456');
              }}
          >
              Login as Guest
          </Button>
    </VStack>
     
  )
}
export default Login
