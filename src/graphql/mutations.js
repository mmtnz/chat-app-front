import { gql } from "@apollo/client";

export const CREATE_CONVERSATION = gql`
    mutation CreateConversation($name: String!) {
        createConversation(name: $name) {
            id
            name
        }
    }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: ID!, $sender: String!, $content: String!) {
        sendMessage(conversationId: $conversationId, sender: $sender, content: $content) {
            id
            sender
            content
        }
  }
`;
