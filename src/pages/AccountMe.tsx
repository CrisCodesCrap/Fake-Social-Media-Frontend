import React, {useState, useEffect} from 'react'
import {PageWrapper,Wrapper,UserPic,Username,AccountWrapper} from './styles/Account'
import axios from 'axios'
import tippy from 'tippy.js';
import './styles/tippytooltip.css'
import moment from 'moment'

const AccountMe = () => {
  const current_user = localStorage.getItem('user')
  const [stsdesc, update] = useState('')
  const [iconurl, update_iconurl] = useState('')
  const url = 'http://localhost:8000/users/'+current_user
  const url_desc_get = 'http://localhost:8000/users/description_get/'+current_user
  const [isonline,updatestatus] = useState<any>()
  var thisname = document.getElementById('online')
  
  useEffect(()=>{
    axios.get(url_desc_get).then((response=>{
    let descript = response.data['description']
    if (descript === undefined) descript=response.data['status']
    update(descript)
    axios.post(url,{'username':current_user})
  .then(async response =>{
    if(response.data['username'] !== 'not_found'){
      update_iconurl('https://avatars.dicebear.com/api/initials/:'+response.data['username']+'.svg')
      }
    }
  )
  }))
  },[current_user, url, url_desc_get])
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
      <UserPic draggable={false} src={iconurl}></UserPic>
      <div style={{display: 'flex',justifyContent:'center',alignItems: 'center'}}>
      <div id="online" style={{borderRadius:'50%',height:'12px',width:'12px',background:'green',display:'block'}}
      onMouseOver={()=>{
        let thisname = document.getElementById('online')
        thisname !== null && tippy(thisname,{
          content:'online.',
          theme:'mytheme',
          duration: 0,
          arrow: false,
          delay: [200, 200],
        })
      }}></div>
      <Username>{current_user}</Username></div>
        <div>{stsdesc}</div>
        <div style={{color: '#000913'}}>Last seen: now</div>
      </AccountWrapper>
    </PageWrapper>
    </Wrapper>
    )
}
export default AccountMe
