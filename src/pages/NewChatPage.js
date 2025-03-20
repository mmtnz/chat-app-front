import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_CONVERSATION } from "../graphql/mutations";

const NewChatPage = () => {

    const [conversationName, setConversationName] = useState("");
      const [createConversation] = useMutation(CREATE_CONVERSATION);

    const navigate = useNavigate();

    const handleCreateConversation = async (e) => {
        e.preventDefault();
        // Create a new conversation
        console.log("Creating conversation with name: ", conversationName);
        try {
            const { data } = await createConversation({ variables: { name: conversationName } });
            const conversationId = data.createConversation.id;

            // Navigate to the chat page
        navigate(`/chat/${conversationId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h2>New Conversation</h2>
            <form onSubmit={handleCreateConversation}>
                <div className="log-group">
                    <label htmlFor="conversation-name">Enter conversation name</label>
                    <input
                        type="text"
                        name="conversation-name"
                        value={conversationName}
                        onChange={(e) => {setConversationName(e.target.value)}}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
};
export default NewChatPage;