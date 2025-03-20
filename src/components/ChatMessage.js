import React from "react";

const ChatMessage = ({message, isSender}) => {

    const formatTime = (ts) => {
        const date = new Date(Number(ts));
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
    };

    const sender = message.sender.split("-")[0];

    return (
        <div className={`chat-message-container ${isSender ? "sent" : ""}`}>
            <div className={`chat-message ${isSender ? "sent" : ""}`}>
                {isSender ? (
                    <>{message.content} {formatTime(message.created_at)}</>
                ):(
                    <><div className="sender">{sender}:</div> {message.content} {formatTime(message.created_at)}</>
                )}
            </div>
        </div>
    )
};
export default ChatMessage;
