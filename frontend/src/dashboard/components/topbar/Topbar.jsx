import React from 'react'
import "./topbar.css";
import {NotificationsNone, Language, Settings} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebook } from '@fortawesome/free-solid-svg-icons'
import avatar from "./avatar/ryan.jpg";

function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                <span className="logo">Admin</span>
                </div>
            <div className="topRight">
                <div className="topbarIconsContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconsContainer">
                    <Language/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconsContainer">
                    <Settings/>                    
                </div>
                
                <div className="topbarIconsContainer">
                    <FontAwesomeIcon icon="fa-brands fa-facebook" />                 
                </div>
                <img src={avatar} alt="" className="topAvatar" />
            </div>
         </div>
         </div>
    )
}

export default Topbar
