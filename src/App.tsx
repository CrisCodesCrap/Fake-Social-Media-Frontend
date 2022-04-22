import React, { ReactElement, useEffect, useState} from 'react'
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Signup from './pages/sign-up'
import Signin from './pages/sign-in'
import Home from './pages/Home'
import Account from './pages/Account'
import AccountMe from './pages/AccountMe'
import Chat from './pages/Chat'
import { auth } from './auth'
import axios from 'axios'
import { NotificationsProvider } from '@mantine/notifications'
import { MantineProvider } from '@mantine/core'
export default function App():ReactElement {
  const [currentChat, updateCurrentChat] = useState<any>(null)
  const [current_user, update_user] = useState<string|null>(window.localStorage.getItem('user'))
  useEffect(() =>{
  const online_check = setInterval(async()=>{
      let online_url = 'http://localhost:8000/is_online/'+current_user
      current_user !== null && current_user !=="" && await axios.post(online_url,{'user':current_user})
        .catch(error=> console.error(error))
      },60000)
    current_user !== null && update_user(current_user)
    window.addEventListener('beforeunload', async (event) => {
      event.preventDefault()
      const user_url = 'http://localhost:8000/set_offline/'+current_user
      current_user !== null &&  await axios.post(user_url,{'user':current_user})
    })
    return () => clearInterval(online_check)
  },[current_user])
  const signout = () =>{
    auth.signout()
    update_user(auth.username)
  }
  useEffect(()=>{
    async function set_online(){
    let online_url = 'http://localhost:8000/is_online/'+window.localStorage.getItem('user')
    await axios.post(online_url,{'user':window.localStorage.getItem('user')})      
    .catch(error=> console.error(error))  
  }
  set_online()
},[])
  return (
  <MantineProvider>
    <NotificationsProvider>
    <>
  <Router>
      <Navbar signout={signout} updateCurrentChat={updateCurrentChat}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin/>} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='users'>
            <Route path=':username' element={<Account updateCurrentChat={updateCurrentChat}/>} />
            <Route path='me' element={<AccountMe/>} />
          </Route>
          <Route path='/Messages' element={<Chat ParentCurrentChat={currentChat}/>} />
          <Route path='*' element={<div style={{ display:'flex',alignItems:'center',justifyContent:'center',textAlign: 'center',height: window.innerHeight-120,background:'#1982fc',color:'#fff'}}><h2>Nothing here!</h2></div>}></Route>
        </Routes>
  </Router>
    </>
    </NotificationsProvider>
  </MantineProvider>
  );
}

