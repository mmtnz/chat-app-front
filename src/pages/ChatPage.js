import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription, useMutation } from "@apollo/client";
import { MESSAGE_ADDED_SUBSCRIPTION } from "../graphql/subscriptions";
import { SEND_MESSAGE } from "../graphql/mutations";


const ChatPage = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const {conversationId} = useParams();

    const [sendMessage] = useMutation(SEND_MESSAGE);
    const { data: newMessageData } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
        variables: { conversationId },
        skip: !conversationId,
    });
    const sender = "User";

    useEffect(() => {
        if (newMessageData) {
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

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <p>{message.sender}: {message.content}</p>
                    </div>
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
    )

};
export default ChatPage;