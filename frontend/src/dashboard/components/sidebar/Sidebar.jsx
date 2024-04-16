import React from 'react'
import {AttachMoney, ChatBubbleOutline,BarChart, DynamicFeed, LineStyle, MailOutline, PermIdentity, Report, Storefront, Timeline, TrendingUp, WorkOutline} from "@material-ui/icons" ;
import "./sidebar.css"
import { Link } from 'react-router-dom';


function Sidebar() {
    return (
             <div className="sidebar">

                 <div className="sidebarwrapper">
                 <div className="sidebarMenu">
                 <h3 className="sidebarTitle">Dashboard</h3>
                 <ul className="sidebarList">
                 <Link to="/dashboard" className="link">  
                 <li className="sidebarListItem">
                  <LineStyle className="sidebarIcon"/>
                  Home
                  </li>
                  </Link>
                  <li className="sidebarListItem">
                  <Timeline className="sidebarIcon"/>
                  Analytics
                  </li>
                  <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon"/>
                  Sales
                  </li>
                  </ul>
             </div>

<div className="sidebarMenu">
                 <h3 className="sidebarTitle">Quick Menu</h3>
                 <ul className="sidebarList">
                   <Link to="/users" className="link">
                 <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon"/>
                  Users
                  </li>
                  </Link>
                        <Link to="/products" className="link">

                  <li className="sidebarListItem">
                  <Storefront className="sidebarIcon"/>
                  Products
                  </li>
                                    </Link>

                  <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon"/>
                  Transaction
                  </li>
                  <li className="sidebarListItem">
                <BarChart className="sidebarIcon"/>
                  Report
                  </li>
                  </ul>
             </div>

             <div className="sidebarMenu">
                 <h3 className="sidebarTitle">Notification</h3>
                 <ul className="sidebarList">
                 <li className="sidebarListItem">
                  <MailOutline className="sidebarIcon"/>
                  Mail
                  </li>
                  <li className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon"/>
                  Feedback
                  </li>
                  <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon"/>
                  Messages
                  </li>
                  </ul>
             </div>

             <div className="sidebarMenu">
                 <h3 className="sidebarTitle">stuff</h3>
                 <ul className="sidebarList">
                 <li className="sidebarListItem">
                  <WorkOutline className="sidebarIcon"/>
                  Manage
                  </li>
                  <li className="sidebarListItem">
                  <Timeline className="sidebarIcon"/>
                  Analytics
                  </li>
                  <li className="sidebarListItem">
                <Report className="sidebarIcon"/>
                  Reports
                  </li>
                  </ul>
             </div>
             


             </div>
             </div>
    )
}

export default Sidebar
