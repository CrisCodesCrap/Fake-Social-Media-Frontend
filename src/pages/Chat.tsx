import axios from "axios"
import {useEffect, useState} from "react"
import {Message,MessageWrapper,Messageslist,Msginput,Sendbtn,UserPic,SmileIcon, ChatRoomHeader, CreateGroupIcon, ChatRoomSettingsIcon, CreateGroupButton } from './styles/Chat'
import moment from "moment"
import { useNavigate } from "react-router"
import tippy from 'tippy.js';
import Picker from 'emoji-picker-react';
import './styles/tippytooltip.css'
import { useNotifications } from '@mantine/notifications';
import {io} from 'socket.io-client'
import SideMenu from "../components/SideMenu"
import CreateGroup from "../components/CreateGroup"

const Chat = (props:any) => {
  const [message,update_message] = useState<any>('')
  const notifications = useNotifications()
  const [messagelist,update_messagelist] = useState<any[]>([])
  const [textwidth,update_textwidth] = useState<any>()
  const navigate = useNavigate()
  const [showCreateGroup,updateShowCreateGroup] = useState<boolean>(false)
  const [chosenEmoji,setChosenEmoji] = useState<any>('')
  const [current_user_chat, update_current_user_chat] = useState<any>({username:'',room:0})
  const [last_seen,update_last_seen] = useState<any>(undefined)
  const handleSend = async()=>{
    const element:any = document.getElementById('MessageList')
    if(message!==undefined && message !== ''){
    let msg = {'sender':current_user,'content':message,'room':current_user_chat.room}
    await axios.post('http://127.0.0.1:8000/send_msg',msg)
    .then(async response =>{
      await axios.post('http://127.0.0.1:4000/send_msg',response.data)
      .catch(err =>console.log(err))
      update_message('')
      if(element !== null){
        set_displayEmojiMenu(false)
        let mesg = response.data
        update_messagelist(messagelist=>[...messagelist,mesg])
        element.scrollTop = element.scrollHeight
      }
    })
  }}
  const [displayEmojiMenu,set_displayEmojiMenu] = useState(false)
  const onEmojiClick = (emojiObject:any) => {
    setChosenEmoji(emojiObject.emoji)
    emojiObject.emoji !== undefined && update_message(message+emojiObject.emoji)
  }
  const current_user = localStorage.getItem('user')
  useEffect(() => {
    const element:any = document.getElementById('MessageList')
    const socket = io('http://127.0.0.1:4000/')
    socket.on('message',(e)=>{
      if(e.sender !== current_user) {
        update_message('')
        if(element !== null){
          set_displayEmojiMenu(false)
          if(current_user_chat.room === e.room) { 
            update_messagelist(messagelist=>[...messagelist,e])
            element.scrollTop = element.scrollHeight
        }
      }
    }
    }
  )  
    return () => {
      socket.disconnect()
  }
},[current_user_chat])
  useEffect(()=>{
    const element:any = document.getElementById('MessageList')
    axios.post('http://127.0.0.1:8000/get_msg',{'room':current_user_chat.room})
    .then((messages)=>{
      const messagearray = messages.data['messages']
      update_messagelist(messagearray)
      update_textwidth(element.clientWidth)
    const last_seen_url = 'http://127.0.0.1:8000/last_seen/'+current_user_chat.username
    current_user_chat.username !== '' && axios.post(last_seen_url,{'username':current_user_chat.username})
    .then((response)=>{
      update_last_seen(response.data['last_seen'])
    })
    if(element !== null) element.scrollTop = element.scrollHeight
    const msginput:any = document.getElementById('Input')
    const smileicon:any = document.getElementById('SmileIcon')
    const sendbtn:any = document.getElementById('Sendbtn')
    if(msginput !== null && sendbtn !== null && smileicon !== null && current_user === null){ 
      msginput.disabled = true
      smileicon.disabled = true
      sendbtn.disabled = true
    }})
  const handleResize =()=>{
    const element:any = document.getElementById('MessageList')
    update_textwidth(element.clientWidth)
  }
  window.addEventListener('resize',handleResize)
  return ()=> window.removeEventListener('resize',handleResize)  
},[current_user_chat,update_current_user_chat])
  return (
  <div>
    {showCreateGroup &&
      <CreateGroup currentUser={current_user} updateShowCreateGroup={updateShowCreateGroup}>
      </CreateGroup>
    }
    <div style={{display: 'flex',flexDirection:'row'}}>
    <SideMenu style={{background:current_user_chat.username !==''?'#fff !important':'#1982fc'}} CurrentUserChat={current_user_chat} UpdateCurrentUserChat={update_current_user_chat}></SideMenu>
    <div style={{flex: '1',position: 'relative',display:'flex',flexDirection: 'column',margin:'3% 0 0 2%',justifyContent: 'center',alignItems:'center',marginTop:'4%'}}>
      <ChatRoomHeader>
        <div style={{marginLeft:'5%',width:'50%',display:'flex',alignItems:'center',cursor:'pointer',flexDirection:'row'}} onClick={()=>{
          let user_address = '/users/'+current_user_chat.username
          navigate(user_address)
          }}>
          {current_user_chat.username!==''&&
            <UserPic style={{height:'40px',width:'40px',marginRight:'2.5%'}} draggable={false} src={'https://avatars.dicebear.com/api/initials/:'+current_user_chat.username+'.svg'}>
            </UserPic>
          }
          <div style={{display:'flex',flexDirection:'column',alignItems:'baseline'}}>
            {current_user_chat.username}
            <div style={{color:'#023774',fontSize:'small',display:'flex'}}>
            {last_seen !== undefined && 'Last seen: '+ moment(last_seen).fromNow()}
          </div>
          </div>
          
        </div>
        <div style={{width:'50%'}}>
        {current_user_chat.username!==''&&
        <ChatRoomSettingsIcon focusable={false}>
        </ChatRoomSettingsIcon>
        }
          <CreateGroupIcon 
          onClick={()=>updateShowCreateGroup(true)}
          focusable={false} 
          id={'creategroupicon'} 
          onMouseOver={()=>{
            let element:any = document.getElementById('creategroupicon')
            let content = current_user_chat.username!==''?'Create a group with this user':'Create a group'
            tippy(element,{
              content:content,
              theme:'mytheme',
              arrow: false,
              delay:[200,200]
            })
          }}>
          </CreateGroupIcon>
        </div>
      </ChatRoomHeader>
    {current_user_chat.username !==''?
    <>
      <Messageslist id='MessageList'>
        {messagelist.map(element => {
        let s = new Date(element.timesent)
        var thisname = document.getElementById(element.id)
      if(element.sender === current_user){
      return(
      <MessageWrapper key={element.id+'wrapper'} style={{justifyContent: 'end'}}>
      <Message key={element.id} style={{marginRight: '5px',background:'#CDE4FE',color:'#000913',clear:'both'}}>{element.content}<br></br><div style={{fontWeight:'600',fontSize:'x-small',color:'#000',textAlign:'start'}}>Sent by {element.sender === current_user ? 'you' : element.sender} {moment(s).fromNow()}</div></Message>
      <UserPic key={element.id+'icon'} style={{userSelect:'none',justifyContent:'end'}} id={element.id} onMouseOver={()=>{
          thisname !== null && tippy(thisname,{
            content:element.sender,
            theme:'mytheme',
            duration: 0,
            arrow: false,
            delay: [200, 200],
          })
        }} onClick={()=>{
          let user_address = '/users/'+element.sender
          navigate(user_address)
        }} draggable={false} src={'https://avatars.dicebear.com/api/initials/:'+element.sender+'.svg'}>
      </UserPic>
      </MessageWrapper>
      )}
    return(
      <MessageWrapper key={element.id+'wrapper'}>
        <UserPic style={{userSelect:'none'}} key={element.id+'icon'} id={element.id} onMouseOver={()=>{
          thisname !== null && tippy(thisname,{
            content:element.sender,
            theme:'mytheme',
            duration: 0,
            arrow: false,
            delay: [200, 200],
          })
        }} onClick={()=>{
          let user_address = '/users/'+element.sender
          navigate(user_address)
        }} draggable={false} src={'https://avatars.dicebear.com/api/initials/:'+element.sender+'.svg'}>
        </UserPic>
        <Message key={element.id} style={{marginLeft:'5px',background:'#3ABEFF',color:'white',clear:'both'}}>{element.content}<br></br><div style={{fontWeight:'600',fontSize:'x-small',color:'#000',textAlign:'start'}}>Sent by {element.sender === current_user ? 'you' : element.sender} {moment(s).fromNow()}</div></Message>
      </MessageWrapper>
    )})}
    </Messageslist>
      <div style={{width:textwidth-6+'px',display: 'flex',textAlign:'center',alignItems: 'center',justifyContent: 'space-evenly',borderRadius:'6px',padding:'5px',border:'1px solid #1982FC'}}>
    <SmileIcon style={{cursor:current_user===null?'not-allowed':''}} id="SmileIcon" onClick={()=>{
      current_user !== null && set_displayEmojiMenu(displayEmojiMenu?false:true)
    }}></SmileIcon>
    {displayEmojiMenu&&<div style={{position: 'absolute',bottom:'100px',zIndex:1000000}}><Picker onEmojiClick={onEmojiClick} /></div>}
    <Msginput onKeyPress={(e)=> e.key === 'Enter' && handleSend()} id='Input' value={message} placeholder={current_user!==null?'Say something.':'You are not signed-in and can\'t write here.'} style={{cursor:current_user===null?'not-allowed':''}} onChange={e=>{
      if(message.length !== 1500 && message.length < 1500) update_message(e.target.value)
      else{
        notifications.showNotification({
          title: 'Stop,',
          message: 'your message is too long..',
          color: 'red',
        })
      }
      }}></Msginput>
      <Sendbtn id="Sendbtn" onClick={()=>handleSend()} style={{cursor:current_user===null?'not-allowed':'pointer'}} >Send</Sendbtn>
      </div>
  </>:
  <>
  <Messageslist style={{color: '#000913',textAlign: 'center',alignItems: 'center',display: 'flex',flexDirection: 'column'}} id='MessageList'>
    <div style={{marginTop:'10%'}}>
      <h2>Send messages to friends:</h2>
      <h4 style={{color: '#1982fc'}}>Choose a group or a friend from the contacts panel on your left.</h4>
      <div>
        <CreateGroupButton onClick={()=>{updateShowCreateGroup(true)}}>
          Create a group
        </CreateGroupButton>
      </div>
    </div>
  </Messageslist>
  <div style={{height:'40px',width:textwidth-6+'px',display: 'flex',textAlign:'center',alignItems: 'center',justifyContent: 'space-evenly',borderRadius:'6px',padding:'5px',border:'1px solid #1982FC'}}></div>
  </>
  }
  </div>
</div>
</div>
  )
}
export default Chat
