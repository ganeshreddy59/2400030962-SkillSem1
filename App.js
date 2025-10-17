import './App.css';
import {useState} from 'react';
import dashimg from "./dashb_image.png"

function handleSignup(e,{user})
  {
    e.preventDefault();
    const eData = JSON.parse(localStorage.getItem('users')) || [];
    eData.push(user);
    localStorage.setItem('users', JSON.stringify(eData));
    console.log(eData)
    alert("account created ===> PROCEED TO LOGIN");
  }

function handleLogin(e,{checkUser},setIsLogin,setCPage)
  {
    e.preventDefault();
    const eData = JSON.parse(localStorage.getItem('users')) || [];
    const cData = eData.filter(user => user.ue === checkUser.ue &  user.up === checkUser.up)
    console.log(cData);
    if (cData.length === 0)
      {alert("incorrect credentials");
        return "login";
      }
    else
     {
      setIsLogin(false);
      setCPage("dashb");
     }
  }

function App() {
  const [currPage,setCPage] = useState("");
  const [isLogin,setIsLogin] = useState(true);
  const [uname,setUname] = useState("");
  const [uemail,setUemail] = useState("");
  const [upass,setUpass] = useState("");

  const resetPage = () => {setUname("");setUemail("");setUpass("")};

  return (
    <div className="App-header">

      {isLogin &&
        <>
        <button className={currPage==="login" ? "toggle" : "not"} onClick = {() => setCPage("login")}>Login</button>
        <button className={currPage==="signup" ? "toggle" : "not"} onClick = {() => setCPage("signup")}>Sign Up</button>
        <br/><br/><br/>
        </>
      }
      {
      currPage === "login" ?
        <>
          <form onSubmit={(e)=>{handleLogin(e,{checkUser:{ue:uemail,up:upass}},setIsLogin,setCPage)}}>
            <label>Email: &emsp; </label>
            <input type="email" placeholder='Enter Your Email Id' required
                   value={uemail} onChange={(e)=>setUemail(e.target.value)}/><br/>

            <label>Password: &emsp; </label>
            <input type="password" placeholder='Enter Your Password' required
                   value={upass} onChange={(e)=>setUpass(e.target.value)}/><br/><br/>

            <button type="submit">Login</button>

          </form><br/>

          <p>Don't have a account ? <a className="App-link" wonClick={() => setCPage("signup")}>Create now..!!</a></p>

        </>
      : currPage === "signup" ?
        <> 
          <form onSubmit={(e)=>{handleSignup(e, {user:{un:uname,ue:uemail,up:upass}});
                                setCPage("login");resetPage();}}>
          
            <label>Username: &emsp; </label>
            <input type="text" placeholder='Enter Your Name' required 
                 value={uname} onChange={(e)=>setUname(e.target.value)}/><br/>
            
            <label>Email: &emsp; </label>
            <input type="email" placeholder='Enter Your Email Id' required 
                   value={uemail} onChange={(e)=>setUemail(e.target.value)}/><br/>

            <label>Password: &emsp; </label>
            <input type="password" placeholder='Enter Your Password' required
                   value={upass} onChange={(e)=>setUpass(e.target.value)}/><br/><br/>

            <button type="submit">Sign Up</button>

          </form>
        </>
      : currPage === "dashb" ?
        <>
           <h1>!!..Welcome Team..!!</h1>
           <h3>Say hi to the girls</h3>
           <img src={dashimg} alt="girls"></img>
        </>
      :
      <></>
}

    </div>

  );
}

export default App;
