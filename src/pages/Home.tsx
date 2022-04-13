import {auth} from "../auth"
import { useEffect, useState } from "react"


const Home = (props:any) => {
  const [name,setname] = useState("")
  useEffect(() => {
    auth.checkToken()
    setname(auth.username)
  },[])
  
  if(auth.isAuthenticated){
    return(
    <div style={{height: "800px",position: "relative"}}><h1>Hi,{name}</h1></div>
  )}   
  return (
      <div style={{height: "800px",position: "relative"}}>
      </div>
    )
  }
  
  export default Home
  