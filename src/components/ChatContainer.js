import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ messages, sender }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]); // Runs whenever 'messages' updates

    return (
        <div className="chat-container">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} isSender={message.sender === sender}/>
            ))}
        </div>
    );
};

export default ChatContainer;
