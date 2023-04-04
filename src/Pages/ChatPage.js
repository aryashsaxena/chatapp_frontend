import { Box } from "@chakra-ui/react";
import ChatBox from "../components/authentications/ChatBox";
import MyChats from "../components/authentications/MyChats";
import SideDrawer from "../components/authentications/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider"
import { useState } from "react";

const ChatPage = () => {
   
  const { user } = ChatState();
  const [ fetchAgain, setFetchAgain ] = useState(false);

  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
  
      <Box
        display={'flex'} justifyContent={'space-between'} w='100%' h='91.5vh'
        p='10px'>
        {/* <p>lorem13</p> */}
        {user && <MyChats fetchAgain={ fetchAgain}   />}
        {user && <ChatBox fetchAgain={ fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  )
}

export default ChatPage
