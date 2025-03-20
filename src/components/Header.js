import React from "react";

const Header = () => {

    const userName = sessionStorage.getItem("userName");

    return(
        <div className="header">
            <>Chat App</>
            <div className="user-name">
                {userName}
            </div>
        </div>


    )
};
export default Header;