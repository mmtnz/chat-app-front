import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ApolloProvider, useSubscription, useMutation, useQuery } from "@apollo/client";
import { MESSAGE_ADDED_SUBSCRIPTION } from "../graphql/subscriptions";
import { SEND_MESSAGE } from "../graphql/mutations";
import { CHECK_CONVERSATION } from "../graphql/queries";
import ChatContainer from "../components/ChatContainer";
import { createApolloClient } from "../services/graphQLClient";


const ChatPage = () => {

    const {conversationId} = useParams();
    const navigate = useNavigate();
    const [sender, setSender] = useState(null);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const userName = sessionStorage.getItem("userName");
        if (!userName) {
            console.log("No sender name found in session storage");
            alert("Please enter your name first");
            navigate("/");
            return;
        }
        setSender(userName);
        setClient(createApolloClient(userName, conversationId));
    }, [conversationId, navigate]);


    if (!client || !sender) return <div>Loading chat...</div>;
    

    

    // // To inform other users you joined the chat
    // const sendNewUserMessage = async () => {
    //     await sendMessage({ variables: {
    //         conversationId,
    //         sender: "system",
    //         system: true,
    //         content: `${sender.split('-')[0]} joined the chat`
    //     } });
    // };


    return (
        <ApolloProvider client={client}>
            <ChatContent sender={sender} conversationId={conversationId} />
        </ApolloProvider>
    );
};
export default ChatPage;

// Apollo
const ChatContent = ({ sender, conversationId }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [chatName, setChatName] = useState(null);

    


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
            if (!data?.conversation) {
                console.log("No conversation found with id: ", conversationId);
                alert("No conversation found with the given id");
                navigate("/");
            }
            setChatName(data.conversation.name);
            setMessages((prevMessages) => [
                ...prevMessages,
                // {sender: "system", content: "You joined the chat"},
                {sender: "system", system: true, content: "New messages will appear here"},
            ]);
            // sendNewUserMessage();
        }

    }, [data, loading]);

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


    return(
        <div className="center">
            {/* <h2>Chat: {chatName}</h2> */}
            <div className="chat">
                
                <div className="chat-header">
                    <h3>{chatName}</h3>
                </div>
                <div className="chat-content">
                
                    <ChatContainer messages={messages} sender={sender}/>
                    
                    <div className="chat-input-container">
                        <form onSubmit={handleSendMessage} className="chat-input-form">
                            <input
                                className="chat-input"
                                type="text"
                                placeholder="Type your message..."
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

            </div>
        </div>
    )
};
