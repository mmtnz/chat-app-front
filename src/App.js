import React, { useState, useEffect } from "react";
import { ApolloProvider, useQuery, useMutation, useSubscription, gql } from "@apollo/client";
import { createApolloClient } from "./services/graphQLClient";
import Router from "./Router";
import './assets/css/app.css'
import uuid4 from "uuid4";


export default function App() {

    const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "");
    const [tempUserName, setTempUserName] = useState(userName);
    const [client, setClient] = useState(null);

    // useEffect(() => {
    //   if (userName && !client) {
    //       setClient(createApolloClient(userName));
    //   }
    // }, [userName, client]);

    // const handleAddUserName = (e) => {
    //     e.preventDefault();
    //     // Add the user name
    //     const userNameAndUUID = `${tempUserName}-${uuid4()}`;
    //     console.log("Adding user name: ", userNameAndUUID);
    //     setUserName(userNameAndUUID);
    //     sessionStorage.setItem("userName", userNameAndUUID);
    //     setClient(createApolloClient(userNameAndUUID));
    // }


    // if (!client) {
    //     return (
    //         <>
    //           <div className="center">
    //             <div className="center-column">
    //                 <h2>Enter your name</h2>
    //                 <form onSubmit={handleAddUserName} className="custom-form">
    //                     <input
    //                         type="text"
    //                         placeholder="Enter your name"
    //                         value={tempUserName}
    //                         onChange={(e)=>setTempUserName(e.target.value)}
    //                         required
    //                     />
    //                     <button className="custom-button" type="submit">Submit</button>
    //                 </form>
    //             </div>
    //         </div>
    //         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    //         <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet"/>
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    //       </>
    //   )
    // }



    return (
        // <ApolloProvider client={client}>
        <>
            <Router />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        
        </>
        // </ApolloProvider>
    );
}
