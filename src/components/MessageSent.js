import React from "react";

const MessageSent = ({message}) => {

    const formatTime = (ts) => {
        const date = new Date(Number(ts));
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
    };

    return (
        <div className="chat-message sent">
            <p>{message.content} {formatTime(message.created_at)}</p> 
        </div>
    )
};
export default MessageSent;
