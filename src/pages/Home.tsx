import {auth} from "../auth"
import { useEffect, useState } from "react"
import { LeaveButton } from "./styles/Chat"
import { useNavigate } from "react-router"


const Home = (props:any) => {
  const [name,setname] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    auth.checkToken()
    setname(auth.username)
  },[])
  
  if(auth.isAuthenticated){
    return(
    <div style={{height:window.innerHeight,display:'flex',alignItems:'start ',justifyContent:'center',background:'#1982fc',color:'#fff'}}>
      <h1 style={{marginTop:'10%'}}>
        Hi {name}, go to <LeaveButton onClick={()=>navigate('/Messages')} style={{color:'#1982fc',background:'#fff',padding:'10px 20px 10px 20px'}}>Messages</LeaveButton>
      </h1>
    </div>
  )}   
  return (
    <div style={{height:window.innerHeight,display:'flex',alignItems:'start',justifyContent:'center',background:'#1982fc',color:'#fff'}}>
      <LeaveButton onClick={()=>navigate('/sign-up')} style={{alignItems:'center',color:'#1982fc',fontSize:'x-large',fontWeight:'900',background:'#fff',padding:'10px 20px 20px 20px'}}>Sign up</LeaveButton> <h1 style={{marginTop:'5%'}}> or</h1> <LeaveButton onClick={()=>navigate('/sign-in')} style={{alignItems:'center',color:'#1982fc',fontSize:'x-large',fontWeight:'900',background:'#fff',padding:'10px 20px 20px 20px'}}>Sign in</LeaveButton> <h1 style={{marginTop:'5%'}}>if you already have an account.</h1>
    </div>
    )
  }
  
  export default Home
  