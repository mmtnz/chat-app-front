import { gql } from "@apollo/client";

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription MessageAdded($conversationId: ID!) {
        messageAdded(conversationId: $conversationId) {
            id
            sender
            content
            created_at
        }
    }
`;
