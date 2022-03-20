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
    <h1>Hi,{name}</h1>
  )}   
  return (
      <div>
      </div>
    )
  }
  
  export default Home
  