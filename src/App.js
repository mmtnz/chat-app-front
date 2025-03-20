import React, { useState, useEffect } from "react";
import { ApolloProvider, useQuery, useMutation, useSubscription, gql } from "@apollo/client";
import { client } from "./services/graphQLClient";
import Router from "./Router";
import './assets/css/app.css'

const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      name
    }
  }
`;

const CREATE_CONVERSATION = gql`
  mutation CreateConversation($name: String!) {
    createConversation(name: $name) {
      id
      name
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMessages($conversationId: ID!) {
    conversationMessages(conversationId: $conversationId) {
      id
      sender
      content
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: ID!, $sender: String!, $content: String!) {
    sendMessage(conversationId: $conversationId, sender: $sender, content: $content) {
      id
      sender
      content
    }
  }
`;

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MessageAdded($conversationId: ID!) {
    messageAdded(conversationId: $conversationId) {
      id
      sender
      content
    }
  }
`;

function ChatApp() {
  const [step, setStep] = useState("choose");
  const [conversationId, setConversationId] = useState(null);
  const [conversationName, setConversationName] = useState("");
  const [sender, setSender] = useState("User");
  const [message, setMessage] = useState("");

  const { data: conversationsData } = useQuery(GET_CONVERSATIONS);
  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  
  const { data: messagesData } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
    skip: !conversationId,
  });

  const { data: newMessageData } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    variables: { conversationId },
    skip: !conversationId,
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.conversationMessages);
    }
  }, [messagesData]);
  
  useEffect(() => {
    if (newMessageData) {
      setMessages((prevMessages) => [...prevMessages, newMessageData.messageAdded]);
    }
  }, [newMessageData]);

  const handleCreateConversation = async () => {
    const { data } = await createConversation({ variables: { name: conversationName } });
    setConversationId(data.createConversation.id);
    setStep("chat");
  };

  const handleJoinConversation = (id) => {
    setConversationId(id);
    setStep("chat");
  };

  const handleSendMessage = async () => {
    try {

      if (message.trim()) {
        await sendMessage({ variables: { conversationId, sender, content: message } });
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {step === "choose" && (
        <div>
          <h2>Start a Conversation</h2>
          <button onClick={() => setStep("create")}>Create New Conversation</button>
          <button onClick={() => setStep("join")}>Join Existing Conversation</button>
        </div>
      )}

      {step === "create" && (
        <div>
          <h2>Create a Conversation</h2>
          <input
            type="text"
            placeholder="Enter conversation name"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
          />
          <button onClick={handleCreateConversation}>Create</button>
        </div>
      )}

      {step === "join" && (
        <div>
          <h2>Join a Conversation</h2>
          <ul>
            {conversationsData?.conversations.map((conv) => (
              <li key={conv.id}>
                {conv.name} <button onClick={() => handleJoinConversation(conv.id)}>Join</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === "chat" && (
        <div>
          <h2>Conversation</h2>
          <div className="chat-box">
            {messages.map((msg) => (
              <div key={msg.id}>
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}
