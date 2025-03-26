import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createAuthLink } from "aws-appsync-auth-link"; // Required for AppSync
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link"; // Required for AppSync

const useAppSync = process.env.REACT_APP_USE_APPSYNC === "true";
console.log(process.env.REACT_APP_USE_APPSYNC)
console.log(process.env.REACT_APP_USE_APPSYNC === "true")

export const createApolloClient = (userName, conversationId=null) => {

    // Connecting to an aws based backend with appsync
    if (useAppSync) {
        const appsyncConfig = {
            url: process.env.REACT_APP_APPSYNC_URL,
            region: process.env.REACT_APP_AWS_REGION,
            auth: {
                type: "API_KEY",
                apiKey: process.env.REACT_APP_APPSYNC_API_KEY,
            },
            disableOffline: true,
        };

        return new ApolloClient({
            link: createAuthLink(appsyncConfig).concat(
                createSubscriptionHandshakeLink(appsyncConfig)
            ),
            cache: new InMemoryCache(),
        });

    }


    // Connect to local Apollo Server Express Backend

    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT, // Apollo Server URL
    });

    // WebSocket Link for Subscriptions
    const wsLink = new GraphQLWsLink(
        createClient({
            url: process.env.REACT_APP_GRAPHQL_WS || "ws://localhost:4000/graphql",
            connectionParams: {
                userName,
                conversationId,
                reconnect: true,
            },
        })      
    );

    // Split between HTTP and WebSocket links
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink
    );

    // Apollo Client Instance
    const client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache(),
    });     
    return client;          
}

