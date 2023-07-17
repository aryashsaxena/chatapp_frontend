import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';

const Signup = () => {

    const [show,setShow]=useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const {setReload,reload} = ChatState();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => { 
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'ChatApp');
      data.append('cloud_name', 'dlfmiomil');
        fetch("https://api.cloudinary.com/v1_1/dlfmiomil/image/upload", {
          method: 'post',
          body: data,
        }).then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
    }
    else {
       toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
       });
      setLoading(false);
      return;
    }
  }
    
  const submitHandler = async () => {
    setLoading(true);
    // checking for empty fields
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // checking for password match
    if (password !== confirmpassword) {
      toast({
        title: "Password Don't match",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    // sending user data to backend
    try {
      const config = {headers: {"Content-type": "application/json"}};
      const { data } = await axios.post("/api/user",{ name, email, password, pic },config);
      // notify for succesfull registration
      toast({
        title: "Registration Successful !!",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setting the userinfo to local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      setReload(!reload);
      setLoading(false);
      history.push('/chats');
      // handling error
    } catch (error) {
       toast({
         title: "Error occured",
         description:error.response.data.message,
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
          <FormControl id='first-name' isRequired>
              <FormLabel>Name</FormLabel>
              <Input
              placeholder="Enter your Name"
               onChange={(event)=>setName(event.target.value)}
               />
          </FormControl>
           <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input
              placeholder="Enter your Email"
               onChange={(event)=>setEmail(event.target.value)}
               />
          </FormControl>

           <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                   <Input
                     type={ show ?'text':'password'}
                    placeholder="Enter your Password"
                    onChange={(event)=>setPassword(event.target.value)}
                  />
                  <InputRightElement width={'4.5rem'}>
                    <Button h='1.75rem ' size={'sm'} onClick={handleClick}>
                          {show ? 'Hide' : "Show"}
                  </Button>
                  </InputRightElement>
              </InputGroup>
             
          </FormControl>

          <FormControl id='password' isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                   <Input
                     type={ show ?'text':'password'}
                    placeholder="Confirm Password"
                    onChange={(event)=>setConfirmPassword(event.target.value)}
                  />
                  <InputRightElement width={'4.5rem'}>
                    <Button h='1.75rem ' size={'sm'} onClick={handleClick}>
                          {show ? 'Hide' : "Show"}
                  </Button>
                  </InputRightElement>
              </InputGroup>
             
          </FormControl>

        
          <FormControl id='pic'>
              <FormLabel>Upload Your Picture</FormLabel>
              <Input
                  type={'file'} p='1.5' accept='image/*'
                  onChange={(e)=>postDetails(e.target.files[0])}
              />
             
          </FormControl>

          <Button
              colorScheme={'blue'} width='100%' style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
          >
              Sign Up
          </Button>
    </VStack>
     
  )
}

export default Signup
