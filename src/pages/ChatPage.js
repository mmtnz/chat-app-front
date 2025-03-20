import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription, useMutation } from "@apollo/client";
import { MESSAGE_ADDED_SUBSCRIPTION } from "../graphql/subscriptions";
import { SEND_MESSAGE } from "../graphql/mutations";
import MessageSent from "../components/MessageSent";
import ChatMessage from "../components/ChatMessage";


const ChatPage = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [sender, setSender] = useState(null);

    const {conversationId} = useParams();
    const navigate = useNavigate();

    const [sendMessage] = useMutation(SEND_MESSAGE);
    const { data: newMessageData } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
        variables: { conversationId },
        skip: !conversationId,
    });

    useEffect(() => {
        const userName = sessionStorage.getItem("userName");
        if (!userName) {
            console.log("No sender name found in session storage");
            alert("Please enter your name first");
            navigate("/");
        }
        setSender(userName);
    }, []);

    useEffect(() => {
        if (newMessageData) {
            console.log("New message data: ", newMessageData);
            setMessages((prevMessages) => [...prevMessages, newMessageData.messageAdded]);
        }
    }, [newMessageData]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
    
            if (message.trim()) {
                await sendMessage({ variables: { conversationId, sender, content: message } });
                setMessage("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formatTime = (ts) => {
        const date = new Date(Number(ts));
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
    };

    const formatUserName = (userName) => { 
        return userName.split("-")[0];
    }

    return (
        <div className="center">
            <h2>Chat</h2>
            <div className="chat-container">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} isSender={message.sender === sender}/>
                ))}
            </div>

            <div>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};
export default ChatPage;