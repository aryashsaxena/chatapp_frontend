import { useHistory } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const [selectedChat, setSelectedChat] = useState();
    const [Chats, setChats] = useState([]);
    const [reload,setReload] = useState(false)

    
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)
        if (!userInfo) {history.push('/')}
    }, [reload]);

    return (
        <ChatContext.Provider value={{ 
            user,
            setUser ,
            selectedChat, 
            setSelectedChat, 
            Chats, 
            setReload,
            reload,
            setChats
            }}>
        {children}
    </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;