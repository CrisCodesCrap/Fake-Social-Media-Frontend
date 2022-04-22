import React, {useState, useEffect, useRef} from 'react'
import {PageWrapper,Wrapper,UserPic,Username,AccountWrapper, SendFriendRequestBtn, AcceptRequestBtn, DeclineRequestBtn} from './styles/Account'
import { useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import tippy from 'tippy.js'
import './styles/tippytooltip.css'
import moment from 'moment'

const Account = ({updateCurrentChat}:any) => {
  var descript:any
  const {username} = useParams()
  const btnref = useRef(0)
  const [buttontext, update_buttontext] = useState<any>()
  const navigate = useNavigate()
  const [isonline,updatestatus] = useState<any>(  
  {
    isOnline:false,
    lastSeen:'',
    areFriends:false,
    isPresent:false,
    isFromMe:false
  })
  const chatWithThisUserHandler = async ()=>{
    await updateCurrentChat({username:username,room:isonline.room,type:false})
    navigate('/Messages')
  }
  const current_user = localStorage.getItem('user')
  const online_url_check = 'http://localhost:8000/check_online_status/'+username
  useEffect(()=>{
    axios.post(online_url_check,{'current_user':current_user,'username':username})
    .then(async response => {
      updatestatus(
        {
          isOnline: response.data['isOnline'],
          lastSeen: response.data['lastSeen'],
          areFriends: response.data['areFriends'],
          isPresent: response.data['isPresent'],
          isFromMe: response.data['isFromMe'],
          room: response.data['room']
        }
      )
    })

    axios.get(url_desc_get).then((response=>{
    descript = response.data['description']
    if (descript === undefined) descript=response.data['status']
    update(descript)
    axios.post(url,{'username':username})
    .then(async response =>{
    if(response.data['username'] !== 'not_found'){
      update_iconurl('https://avatars.dicebear.com/api/initials/:'+response.data['username']+'.svg')
      }
    }
  )
  }))
  },[username,btnref,buttontext])
  const [stsdesc, update] = useState('')
  const [iconurl, update_iconurl] = useState('')
  const url = 'http://localhost:8000/users/'+username
  const url_desc_get = 'http://localhost:8000/users/description_get/'+username
  const handleAnswerRequest = (Accept:boolean,user2:string) =>{
    btnref.current++
    const friendrequestanswerurl = 'http://localhost:8000/answer_friend_req/'+current_user
    axios.post(friendrequestanswerurl,{'username':current_user,'answer':Accept,'user2':user2})
    update_buttontext(Accept?'Unfriend':'Add +')
    updatestatus(
      {
        isOnline: isonline.isOnline,
        lastSeen: isonline.lastSeen,
        areFriends: Accept?true:false,
        isPresent: false,
        isFromMe: false
      }
    )
  }
  const handleFriendRequest = (method:boolean) =>{
    //method === true ~ add and false ~ remove.
    const user = localStorage.getItem('user')
    const friend_req_url = 'http://localhost:8000/send_friend_req/'+user
    axios.post(friend_req_url,{'usr_from':user,'usr_to':username,'method':method,'areFriends':isonline.areFriends})
  }
  useEffect(()=>{
    if(isonline.areFriends){
      update_buttontext('Remove Friend')
    }
    else if(isonline.isPresent && !isonline.areFriends){
      update_buttontext('Cancel Request')
    }
    else if(!isonline.isPresent && !isonline.areFriends){
      update_buttontext('Add +')
    }
  },[isonline.areFriends,isonline.isPresent,btnref])
  const handleClickBtn = () => {
    btnref.current++
    if(isonline.areFriends){
        handleFriendRequest(true)
        update_buttontext('Add +') 
    }
    else{
      if(isonline.isPresent){
        handleFriendRequest(false)
        update_buttontext('Add +')  
        }
      else{
        handleFriendRequest(true)
        update_buttontext('Cancel Request')
      }
      }
  }
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
      <div id="online" style={{borderRadius:'50%',height:'12px',width:'12px',background:isonline.isOnline?'green':'red',display:'block'}}
      onMouseOver={()=>{
        let thisname = document.getElementById('online')
        thisname !== null && tippy(thisname,{
          content:isonline.isOnline?'online.':'offline.',
          theme:'mytheme',
          duration: 0,
          arrow: false,
          delay: [200, 200],
        })
      }}></div>
      <Username>{username}</Username></div>
        <div>{stsdesc}</div>
        <div style={{color: '#000913'}}>Last seen: {!isonline.isOnline?moment(isonline.last_seen).fromNow():'now'}</div>
        {buttontext === 'Remove Friend'&&
            <SendFriendRequestBtn onClick={()=>chatWithThisUserHandler()} style={{marginTop:'25px'}}>
              Send Message
          </SendFriendRequestBtn>
          }
          <br></br>
          {!isonline.isFromMe && isonline.isPresent?
          <>
            <AcceptRequestBtn onClick={()=>{username !== undefined && handleAnswerRequest(true,username)}}>
              Accept
            </AcceptRequestBtn>
            <DeclineRequestBtn onClick={()=>{username !== undefined && handleAnswerRequest(false,username)}}> 
              Decline
            </DeclineRequestBtn>
          </>
          :<SendFriendRequestBtn id={'friendreqbtn'} onClick={handleClickBtn}
            style={{color: isonline.areFriends&&'#1982fc',background:isonline.areFriends&&'#fff'}}>
           {buttontext}
          </SendFriendRequestBtn>}
      </AccountWrapper>
    </PageWrapper>
    </Wrapper>
    )
}
export default Account

