import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NewChatPage from "./pages/NewChatPage";
import ChatPage from "./pages/ChatPage";
import Header from "./components/Header";
const Router = () => {


    return(
        
        <BrowserRouter>
            <div className="page-container">
                <Header/>
                <div className='body-content'>
                    <Routes>
                        <Route exact path="/" element={<WelcomePage/>}/>
                        <Route exact path="/new-chat" element={<NewChatPage/>}/>
                        <Route exact path="/chat/:conversationId" element={<ChatPage/>}/>
                        <Route path="*" element={
                            <React.Fragment>
                                <h1>Error</h1>
                            </React.Fragment>
                        } />
                    </Routes>
                </div>
                {/* <Arrow2Top/> */}
                {/* <Footer/> */}
            </div>
        </BrowserRouter>
       
    )
};
export default Router;