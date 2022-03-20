import React, {useState, useEffect} from 'react'
import {PageWrapper,Wrapper,UserPic,Username,AccountWrapper} from './styles/Account'
import {auth} from '../auth'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import tippy from 'tippy.js';
import './styles/tippytooltip.css'
import moment from 'moment'

const Account = () => {
  var descript:any
  const current_user = localStorage.getItem('user')
  const {username} = useParams()
  const [isonline,updatestatus] = useState<any>()
  const online_url_check = 'https://backend-api-python.herokuapp.com/check_online_status/'+username
  useEffect(()=>{
    axios.post(online_url_check,{'username':username})
    .then(response => updatestatus(
      {
        is_online:response.data['is_online'],
        last_seen:response.data['last_seen']
      }
      ))
    axios.get(url_desc_get).then((response=>{
    descript = response.data['description']
    if (descript === undefined) descript=response.data['status']
    update(descript)
    axios.post(url,{'username':username})
  .then(async response =>{
    if(response.data['username'] !== 'not_found'){
      update_iconurl('https://avatars.dicebear.com/api/initials/:'+response.data['username']+'.svg')
      await update_user(response.data['username'])
      }
    }
  )
  }))
  },[])
  const [selected_user, update_user] = useState('')
  const [stsdesc, update] = useState('')
  const [iconurl, update_iconurl] = useState('')
  const url = 'https://backend-api-python.herokuapp.com/users/'+username
  const url_desc_get = 'https://backend-api-python.herokuapp.com/users/description_get/'+username
  
  if(iconurl===''){
  return(
    <Wrapper>
      <PageWrapper>
        Not found...
      </PageWrapper>
    </Wrapper>
    )}  
  return(
    <Wrapper>
    <PageWrapper>
      <AccountWrapper>
      <UserPic src={iconurl}></UserPic>
      <div style={{display: 'flex',justifyContent:'center',alignItems: 'center'}}>
      <div id="online" style={{borderRadius:'50%',height:'12px',width:'12px',background:isonline.is_online?'green':'red',display:'block'}} onMouseOver={()=>{
          var thisname = document.getElementById('online')
          const content = isonline.is_online? username+' is online.':username+' is offline.'
          thisname !== null && tippy(thisname,{
            content: content,
            theme:'mytheme',
            duration: 0,
            arrow: false,
            delay: [1000, 200],
          })
        }}></div>
      <Username>{selected_user}</Username></div>
        <div>{stsdesc}</div>
        <div>Last seen: {!isonline.is_online?moment(isonline.last_seen).fromNow():'now'}</div>
      </AccountWrapper>
    </PageWrapper>
    </Wrapper>
    )
}
export default Account
