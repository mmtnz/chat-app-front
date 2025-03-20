import React, { useState } from "react";
import { useQuery, useMutation, useSubscription, gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      sender
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $sender: String!) {
    sendMessage(content: $content, sender: $sender) {
      id
      content
      sender
    }
  }
`;

const MESSAGE_SENT = gql`
  subscription MessageSent {
    messageSent {
      id
      content
      sender
    }
  }
`;

function App() {
  const { data, loading } = useQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { data: newMessage } = useSubscription(MESSAGE_SENT);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("User1");

  const messages = data?.messages || [];

  if (newMessage) {
    messages.push(newMessage.messageSent);
  }

  return (
    <div>
      <h2>Chat App</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>
            <b>{msg.sender}:</b> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        placeholder="Your Name"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button
        onClick={() => {
          sendMessage({ variables: { content: message, sender } });
          setMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
