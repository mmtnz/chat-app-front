import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ messages, sender }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // Runs whenever 'messages' updates

    return (
        <div className="chat-container">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} isSender={message.sender === sender} isSystem={message.sender === "system"}/>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatContainer;
