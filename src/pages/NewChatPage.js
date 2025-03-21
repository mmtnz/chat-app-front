import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ApolloProvider, useMutation } from "@apollo/client";
import { CREATE_CONVERSATION } from "../graphql/mutations";
import { createApolloClient } from "../services/graphQLClient";

const NewChatPage = () => {

    
    

    const navigate = useNavigate();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const userName = sessionStorage.getItem("userName");
        if (!userName) {
            console.log("No sender name found in session storage");
            alert("Please enter your name first");
            navigate("/");
            return;
        }
        setClient(createApolloClient(userName));
    }, [navigate]);

    

    if (!client) return <div>Loading chat...</div>;

    return(
        <ApolloProvider client={client}>
            <NewChatForm />
        </ApolloProvider>
    )
};
export default NewChatPage;


const NewChatForm = () => {
    const [createConversation] = useMutation(CREATE_CONVERSATION);
    const navigate = useNavigate();
    const [conversationName, setConversationName] = useState("");

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

    return (
        <div className="center">
            <h1>Start a Conversation</h1>
            <div className="center-column">
                <form onSubmit={handleCreateConversation} className="custom-form">
                    <div className="log-group">
                        <input
                            type="text"
                            name="conversation-name"
                            placeholder="Enter conversation name"
                            value={conversationName}
                            onChange={(e) => {setConversationName(e.target.value)}}
                        />
                    </div>
                    <button type="submit" className="custom-button">Create</button>
                </form>
            </div>
        </div>
    )
}