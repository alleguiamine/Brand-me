import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@material-ui/icons"
import "./user.css"
import {Link} from "react-router-dom"

function User() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit user</h1>
                <Link to="/newUser">
         <button className="userAddButton">Create</button>
</Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Tom_Hanks_TIFF_2019.jpg" alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">Tom Hanks</span>
                         <span className="userShowUserTitle">Actor</span>

                    </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                       <div className="userShowInfo">
                        <PermIdentity className="userShowIcon"/>
                        <span className="userShowInfoTitle">Tom99</span>
                 </div>
                     <div className="userShowInfo">
                        <CalendarToday className="userShowIcon"/>
                        <span className="userShowInfoTitle">10.10.1964</span>
                 </div>  
                                         <span className="userShowTitle">Contact Details</span>

                   <div className="userShowInfo">
                        <PhoneAndroid className="userShowIcon"/>
                        <span className="userShowInfoTitle">+11234567</span>
                 </div>    <div className="userShowInfo">
                        <MailOutline className="userShowIcon"/>
                        <span className="userShowInfoTitle">Tom99@gmail.com</span>
                 </div>
                   <div className="userShowInfo">
                        <LocationSearching className="userShowIcon"/>
                        <span className="userShowInfoTitle">New york city</span>
                 </div>
                 </div>

                </div>
              <div className="userUpdate">
                  <span className="userUpdateTitle">Edit</span>
              <form  className="userUpdateForm">
                  <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                       <label>Username</label>
                       <input type="text" placeholder="Tom99" className="userUpdateInput" />
                      </div>
                      <div className="userUpdateItem">
                       <label>Full Name</label>
                       <input type="text" placeholder="Tom Hanks" className="userUpdateInput" />
                      </div>
                      <div className="userUpdateItem">
                       <label>Email</label>
                       <input type="text" placeholder="Tom@gmail.com" className="userUpdateInput" />
                      </div>
                      <div className="userUpdateItem">
                       <label>Phone</label>
                       <input type="text" placeholder="11234567" className="userUpdateInput" />
                      </div>
                      <div className="userUpdateItem">
                       <label>Adress</label>
                       <input type="text" placeholder="New york city" className="userUpdateInput" />
                      </div>
                  </div>
                  <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Tom_Hanks_TIFF_2019.jpg" alt="" className="userUpdateImg" />
                     <label htmlFor="file"><Publish className="userUpdateIcon"/></label>            
                               <input type="file" id="file" style={{display:"none"}}/>
                      </div>
                      <button className="userUpdateButton">Update</button>
                  </div>
              </form>
              </div>

            </div>
        </div>
    )
}

export default User
