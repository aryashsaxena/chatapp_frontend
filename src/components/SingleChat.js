import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react'
import { getSender ,getSenderFull } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider'
import ProfileModle from "../components/authentications/miscellaneous/ProfileModle"
import UpdateGroupChatModal from './authentications/miscellaneous/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    return <>
        {selectedChat?(
            <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3} px={2} w="100%" fontFamily={'Work sans'} display="flex" justifyContent={{base:"space-between"}} alignItems="center"
                >
                    <IconButton
                        display={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />}
                    onClick={()=>setSelectedChat("")}    
                    />

                    {!selectedChat.isGroupChat ? (
                        <>
                            {getSender(user, selectedChat.users)}
                            <ProfileModle user={getSenderFull(user, selectedChat.users)}/>
                        </>
                    ): (
                            <>{selectedChat.ChatName.toUpperCase()}
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                            </>  
                    )}

                </Text>
                <Box
                display={'flex'} justifyContent='flex-end' p={3} bg="#E8E8E8" w={"100%"} h="100%" borderRadius={'lg'} overflowY="hidden"
                 > 

                </Box>

            </>
        ):(
                <Box
                display={'flex'} alignItems="center" justifyContent={'center' } h="100%"   >
                    <Text fontSize={'3xl'} pb="3" fontFamily={'Work sans'}> 
                    Click on a User to Start Chatting
                    </Text> 
        </Box>
    )}
    </>
}

export default SingleChat
