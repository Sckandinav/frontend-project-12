import { createContext, useContext } from 'react';

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

const ChatContext = createContext({});
const useChatContext = () => useContext(ChatContext);

export { AuthContext, useAuth, ChatContext, useChatContext };
