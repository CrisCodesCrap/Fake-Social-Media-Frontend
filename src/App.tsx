import React, { ReactElement, useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Signup from './pages/sign-up'
import Signin from './pages/sign-in'
import Home from './pages/Home'
import Account from './pages/Account'
import Chat from './pages/Chat'
import { auth } from './auth';
import axios from 'axios';
//import { useTernaryDarkMode } from 'usehooks-ts';
export default function App():ReactElement {
  const [current_user, update_user] = useState('')
  const [url, change_url] = useState('')
  useEffect(() =>{
  let user = window.localStorage.getItem('user')
    const is_online = setInterval(async()=>{
      let online_url = 'http://localhost:8000/is_online/'+user
      await axios.post(online_url,{'user':user})
      .catch(error=> console.error(error))
      },60000)
  user !== null && update_user(user)
    const thisurl = '/'+current_user
    change_url(thisurl)
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
    const user_url = 'http://localhost:8000/set_offline/'+user
    axios.post(user_url,{'user':user})
  })},[])
  const signout = () =>{
    auth.signout()
    update_user(auth.username)
  }
  
  return (
  <>
  <Router>
      <Navbar signout = {signout}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin/>} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/users/:username' element={<Account/>} />
          <Route path='/Chat' element={<Chat/>} />
        </Routes>
  </Router>
  </>
  );
}

