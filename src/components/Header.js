import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const userName = sessionStorage.getItem("userName") || "";
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return(
        <div className="header">
            <div className='header-icon-container'>
                <span
                    className="material-symbols-outlined"
                    translate="no" aria-hidden="true" // prevent problems with translators
                    onClick={goHome}
                >
                    home
                </span>
            </div>
            <div className='header-title-container'>
                <h2 translate="no">{'Chat App'}</h2>
            </div>
            <div className="user-name">
                {userName.split("-")[0]}
            </div>
        </div>


    )
};
export default Header;