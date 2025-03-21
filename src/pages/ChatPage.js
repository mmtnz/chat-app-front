import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription, useMutation, useQuery } from "@apollo/client";
import { MESSAGE_ADDED_SUBSCRIPTION } from "../graphql/subscriptions";
import { SEND_MESSAGE } from "../graphql/mutations";
import { CHECK_CONVERSATION } from "../graphql/queries";
import ChatMessage from "../components/ChatMessage";
import ChatContainer from "../components/ChatContainer";


const ChatPage = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState(null);
    const [chatName, setChatName] = useState(null);

    const {conversationId} = useParams();
    const navigate = useNavigate();

    const [sendMessage] = useMutation(SEND_MESSAGE);

    const { data, loading, error } = useQuery(CHECK_CONVERSATION, {
        variables: { id: conversationId },
        skip: !conversationId, // Avoid making unnecessary requests
    });

    const { data: newMessageData } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
        variables: { conversationId },
        skip: !conversationId,
    });

    useEffect(() => {
        if (!loading && data){

            console.log(data)
            if (!data?.conversation) {
                console.log("No conversation found with id: ", conversationId);
                alert("No conversation found with the given id");
                navigate("/");
            }
            console.log(data)
            setChatName(data.conversation.name);
        }

    }, [data, loading]);

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
            <h2>Chat: {chatName}</h2>
            <ChatContainer messages={messages} sender={sender}/>
            {/* <div className="chat-container">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} isSender={message.sender === sender}/>
                ))}
            </div> */}
                
            <div className="chat-input-container">
                <form onSubmit={handleSendMessage} className="chat-input-form">
                    <input
                        className="chat-input"
                        type="text"
                        // placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="send-button">
                        <span
                            className="material-symbols-outlined"
                            translate="no" aria-hidden="true" // prevent problems with translators
                            onClick={handleSendMessage}
                        >
                            send
                        </span>
                    </button>
                </form>
                
            </div>

        </div>
    );
};
export default ChatPage;

