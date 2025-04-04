# Chat App Frontend

This is the frontend for a real-time chat application built with **React** and **Apollo Client**. It allows users to **join existing conversations** or **create new ones**, interacting with a backend powered by **GraphQL**. The backend can be AWS based with **AWS AppSync** or local based with **Apollo Server Express**

## 🚀 Features

- Connects to a GraphQL server using Apollo Client
- Join existing chat conversations
- Create and start new conversations
- Built with modern React (Hooks, Functional Components)

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/12d82936-2242-4e0e-8c38-d1da905f3d15)



## 🛠️ Technologies Used
- React
- Apollo Client

## Getting Started

### Prerequisites

- npm

To use the app in the **Cloud AWS** you need to download and deploy  [Chat App Backend AWS](https://github.com/mmtnz/chat-app-back-aws).

To use the app **locally** you also need to install the backend [Chat App Backend](https://github.com/mmtnz/chat-app-back).



### Installation

```bash
# Clone the repository
git clone https://github.com/mmtnz/chat-app-frontend.git
cd chat-app-frontend

# Install dependencies
npm install
```

### Configure Enviroment Variables
Create a .env file in the project directory with the following structure:

```bash
REACT_APP_GRAPHQL_ENDPOINT=<graphql_endpoint_in_backend>
REACT_APP_GRAPHQL_WS=<graphql_endpoint_in_backend>
REACT_APP_USE_APPSYNC=true  # true or false depending if backend is aws based or not
REACT_APP_APPSYNC_URL=<your_appsync_api_url>
REACT_APP_APPSYNC_API_KEY=<your_appsync_api_key>
REACT_APP_AWS_REGION=<your_region>
```

### Run the application

```bash
npm start
```


## 🎯 Project Purpose
This App was built for practicing:

- GraphQL API
- WebSockets

## ⚖️ License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome! Feel free to open issues or suggest features.
