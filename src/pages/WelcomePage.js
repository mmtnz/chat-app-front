import React from "react";
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {

    const navigate = useNavigate();
    const goToNewConversation = () => {
        // Navigate to the new chat page
        navigate("/new-chat");
    };

    return(
        <div>
            <h2>Start a Conversation</h2>
            <button onClick={goToNewConversation}>Create New Conversation</button>

            <button onClick={goToNewConversation}>Join Existing Conversation</button>
        </div>
    )
};
export default WelcomePage;