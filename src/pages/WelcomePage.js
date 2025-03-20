import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {

    const [conversationId, setConversationId] = useState("");
    const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "");
    const [tempUserName, setTempUserName] = useState(userName);
    const navigate = useNavigate();
    const goToNewConversation = () => {
        // Navigate to the new chat page
        navigate("/new-chat");
    };

    const goToConversation = (e) => {
        e.preventDefault();
        navigate(`/chat/${conversationId}`);
    };

    const handleAddUserName = (e) => {
        e.preventDefault();
        // Add the user name
        console.log("Adding user name: ", tempUserName);
        setUserName(tempUserName);
        sessionStorage.setItem("userName", tempUserName);
    }

    if (!userName){
        return <div>
            <h2>Enter your name</h2>
            <form onSubmit={handleAddUserName}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={tempUserName}
                    onChange={(e)=>setTempUserName(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    }
    return(
        <div>
            <h2>Start a Conversation</h2>
                <button onClick={goToNewConversation}>Create New Conversation</button>
                <form onSubmit={goToConversation}>
                    <input
                        type="text"
                        placeholder="Enter conversation id"
                        value={conversationId}
                        onChange={(e) => setConversationId(e.target.value)}
                        required
                    />
                    <button onClick={goToNewConversation}>Join Existing Conversation</button>
                </form>
                
        </div>
    )
};
export default WelcomePage;