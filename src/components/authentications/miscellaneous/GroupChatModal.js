import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useRadio, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../../Context/ChatProvider';
import UserBadgeItem from '../UserAvtar/UserBadgeItem';
import UserListItem from '../UserAvtar/UserListItem'

const GroupChatModal = ({ children }) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ groupChatName, setGroupChatName ] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { user, Chats, setChats } = ChatState();
     const { url } = ChatState();

    const handleSearch = async(query) => {
        setSearch(query);
        if (!query) { return; }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(url+`/api/user?search=${search}`, config);
            console.log(data);
            console.log(user.token);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoading(false);
        }
    };
    
    const handleSubmit = async() => { 
        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'Please Fill all the Feilds',
                status: "warning",
                duration: "true",
                position: "top",
            });
            return;
        }

        try {
            
              const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(url+'/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
            },
                config
            );

            setChats([data, ...Chats]);
            onClose();

            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: 'true',
                position:"bottom",
            });

        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const handleDelete = (deluser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== deluser._id));
     };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: 'top',
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
     };

    
  return (
    <>
          <span onClick={onOpen}>{children}</span>
      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                  <ModalHeader
                  fontSize={'35px'} fontFamily="Work sans" display={'flex'} justifyContent='center'
                  >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDir='column' alignItems={'center'}>
                      <FormControl>
                          <Input placeholder='Chat Name' mb={3}
                              onChange={(e) => setGroupChatName(e.target.value)}
                          />
                      </FormControl>
                      <FormControl>
                          <Input placeholder='Add Users' mb={1}
                              onChange={(e) => {handleSearch(e.target.value)}}
                          />
                      </FormControl>
                      
                      <Box w={'100%'} display='flex' flexWrap={'wrap'}>
                      {selectedUsers.map(u => (
                          <UserBadgeItem key={user._id} user={u}
                          handleFunction={()=>{handleDelete(u)}}
                          />
                      ))}
                          </Box>

                      {loading ? (<div>loading</div> ): (
                          searchResult?.slice(0, 4).map((user)=>(
                              <UserListItem key={user._id} user={user}
                                  handleFunction={() => {handleGroup(user)}} />
                          ))
                      )};
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
