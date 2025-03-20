import { gql } from "@apollo/client";
const GET_CONVERSATIONS = gql`
    query GetConversations {
        conversations {
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