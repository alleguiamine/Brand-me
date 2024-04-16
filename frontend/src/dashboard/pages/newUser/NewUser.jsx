import "./newUser.css"

function NewUser() {
    return (
        <div className="newUser">
<h1 className="newUserForm">New User</h1>
<form  className="newUserForm">
    <div className="newUserItem">
        <label >UserName</label>
        <input type="text" placeholder="john"/>
    </div>
     <div className="newUserItem">
        <label >Full name</label>
        <input type="text" placeholder="john smith"/>
    </div>
     <div className="newUserItem">
        <label >Email</label>
        <input type="email" placeholder="john@gmail.com"/>
    </div>
 <div className="newUserItem">
        <label >Password</label>
        <input type="pasword" placeholder="password"/>
    </div>
     <div className="newUserItem">
        <label >Phone</label>
        <input type="text" placeholder="+11234567"/>
    </div>
     <div className="newUserItem">
        <label >Adress</label>
        <input type="text" placeholder="New york city"/>
    </div>
     <div className="newUserItem">
        <label >Gender</label>
        <div className="newUserGender">
        <input type="radio" name="gender" id="male" value="male"/>
        <label for="Male">Male</label>
        <input type="radio" name="gender" id="female" value="female"/>
        <label for="Female">Female</label>
        <input type="radio" name="gender" id="other" value="other"/>
        <label for="Other">Other</label>
        </div>
    </div>
    <div className="newUserItem">
                <label >Active</label>
                <select name="active" id="active" className="newUserSelect">
                 <option value="yes">Yes</option>   
                <option value="no">No</option>
                </select>

    </div>
    <button className="newUserButton">Create</button>
    </form>        
</div>
    )
}

export default NewUser
