import { gql } from "@apollo/client";


export const CHECK_CONVERSATION = gql`
    query Conversation($id: ID!) {
        conversation(id: $id) {
            id
            name
        }
    }
`;


export const GET_CONVERSATIONS = gql`
    query GetConversations {
        conversations {
            id
            name
        }
    }
`;

export const GET_MESSAGES = gql`
    query GetMessages($conversationId: ID!) {
        conversationMessages(conversationId: $conversationId) {
            id
            sender
            content
            created_at
            system
        }
    }
`;