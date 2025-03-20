import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
// import { createAuthLink } from "aws-appsync-auth-link"; // Required for AppSync
// import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link"; // Required for AppSync

// const useAppSync = process.env.REACT_APP_USE_APPSYNC === "true";




const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT, // Apollo Server URL
});

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS, // Apollo WebSocket URL
    options: { reconnect: true },
});

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
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


// AWS AppSync Configuration
// if (useAppSync) {
//   const awsConfig = {
//     url: process.env.REACT_APP_APPSYNC_ENDPOINT,
//     region: process.env.REACT_APP_AWS_REGION,
//     auth: {
//       type: "API_KEY", // or "AMAZON_COGNITO_USER_POOLS"
//       apiKey: process.env.REACT_APP_APPSYNC_API_KEY,
//     },
//   };

//   httpLink = createAuthLink(awsConfig);
//   wsLink = createSubscriptionHandshakeLink(awsConfig, httpLink);
// }