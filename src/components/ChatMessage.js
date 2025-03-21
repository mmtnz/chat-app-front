import React from "react";

const ChatMessage = ({message, isSender, isSystem}) => {

    const formatTime = (ts) => {
        const date = new Date(Number(ts));
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
    };

    const sender = message.sender.split("-")[0];
    
    if (isSystem) {
        return(
            <div className={`chat-message-container info`}>
                <div className={`chat-message info`}>
                    <div className="msg-content">
                        {message.content}
                    </div>
            </div>
        </div>
        )
    }

    return (
        <div className={`chat-message-container ${isSender ? "sent" : ""}`}>
            <div className={`chat-message ${isSender ? "sent" : ""}`}>
                {isSender ? (
                    <div className="msg-content">
                        {message.content}
                        <div className="msg-time">
                            {formatTime(message.created_at)}
                        </div>
                    </div>
                ):(
                    <>
                        <div className="sender">
                            {sender}
                        </div>
                        <div className="msg-content">
                            {message.content}
                            <div className="msg-time">
                                {formatTime(message.created_at)}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};
export default ChatMessage;
