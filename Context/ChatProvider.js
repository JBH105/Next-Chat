import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [allUser, setAllUser] = useState([]);
  // const history = useHistory();
  const router = useRouter();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    console.log(
      "🚀 ~ file: ChatProvider.js ~ line 16 ~ useEffect ~ userInfo",
      userInfo
    );
    setUser(userInfo?.user);

    // if (!userInfo) router.push("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        allUser,
        setAllUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
