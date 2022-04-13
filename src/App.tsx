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
import Footer from './components/Footer'
export default function App():ReactElement {
  const [current_user, update_user] = useState<string|null>(window.localStorage.getItem('user'))
  useEffect(() =>{
  const online_check = setInterval(async()=>{
      let online_url = 'http://localhost:8000/is_online/'+current_user
      await axios.post(online_url,{'user':current_user})
        .catch(error=> console.error(error))
      },60000)
    current_user !== null && update_user(current_user)
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      const user_url = 'http://localhost:8000/set_offline/'+current_user
      axios.post(user_url,{'user':current_user})
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
      <Navbar signout = {signout}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin/>} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='users'>
            <Route path=':username' element={<Account/>} />
            <Route path='me' element={<AccountMe/>} />
          </Route>
          <Route path='/Chat' element={<Chat/>} />
          <Route path='*' element={<div style={{textAlign: 'center',height: '800px'}}>Nothing here!</div>}></Route>
        </Routes>
        {/*<Footer/>*/}
  </Router>
    </>
    </NotificationsProvider>
  </MantineProvider>
  );
}

