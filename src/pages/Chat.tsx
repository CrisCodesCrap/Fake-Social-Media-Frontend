import axios from "axios"
import {useEffect, useState} from "react"
import {Message,MessageWrapper,Messageslist,Msginput,Sendbtn,UserPic,SmileIcon} from './styles/Chat'
import moment from "moment"
import { useNavigate } from "react-router"
import tippy from 'tippy.js';
import Picker from 'emoji-picker-react';
import './styles/tippytooltip.css'
import { useNotifications } from '@mantine/notifications';

const Chat = () => {
  const [message,update_message] = useState<any>('')
  const notifications = useNotifications()
  const [messagelist,update_messagelist] = useState<any[]>([])
  const navigate = useNavigate()
  const [chosenEmoji,setChosenEmoji] = useState<any>('')
  const handleSend = async()=>{
    if(message!==undefined && message !== ''){
    await axios.post('http://localhost:8000/send_msg',{'sender':current_user,'content':message,'room':1})
    .catch(err =>console.log(err))
    await axios.get('http://localhost:8000/get_msg')
  .then((messages)=>{
  const messagearray = messages.data['messages']
  update_message('')
  update_messagelist(messagearray)
  const element = document.getElementById('MessageList')
  if(element !== null) element.scrollTop = element.scrollHeight
  set_displayEmojiMenu(false)
  })}}
  const [displayEmojiMenu,set_displayEmojiMenu] = useState(false)
  const onEmojiClick = (event:any, emojiObject:any) => {
    setChosenEmoji(emojiObject.emoji)
    emojiObject.emoji !== undefined && update_message(message+emojiObject.emoji)
  }
  const current_user = localStorage.getItem('user')
  useEffect(()=>{
    let msglist = document.getElementById('MessageList')
    msglist !== null && msglist.addEventListener('scroll',async ()=>{
      
    })
    axios.get('http://localhost:8000/get_msg')
    .then((messages)=>{
      const messagearray = messages.data['messages']
      update_messagelist(messagearray)
      const element = document.getElementById('MessageList')
      if(element !== null) element.scrollTop = element.scrollHeight  
    })
    const msginput:any = document.getElementById('Input')
    const smileicon:any = document.getElementById('SmileIcon')
    const sendbtn:any = document.getElementById('Sendbtn')
    if(msginput !== null && sendbtn !== null && smileicon !== null && current_user === null){ 
      msginput.disabled = true
      smileicon.disabled = true
      sendbtn.disabled = true
    }
    const message_update = setInterval(async()=>{
    await axios.get('http://localhost:8000/get_msg')
    .then((messages)=>{
      const messagearray = messages.data['messages']
      update_messagelist(messagearray)
      //const element = document.getElementById('MessageList')
      /*if(element !== null) element.addEventListener('scroll',()=>{
        console.log(element.scrollHeight)
      })*/
    })
    },3000)
    return () => {
      clearInterval(message_update);
    };
  },[])
  return (
    <div style={{position: 'absolute',top: '50%',left:'50%',transform: 'translate(-50%,-50%)'}}>
    <Messageslist id='MessageList'>
    {messagelist.map(element => {
      let s = new Date(element.timesent)
      var thisname = document.getElementById(element.id)
      if(element.sender === current_user){return(
      <MessageWrapper key={element.id+'wrapper'} style={{justifyContent: 'end'}}>
      <Message key={element.id} style={{marginRight: '5px',background:'#CDE4FE',color:'#000913',clear:'both'}}>{element.content}<br></br><div style={{fontWeight:'600',fontSize:'x-small',color:'#000',textAlign:'start'}}>Sent by {element.sender === current_user ? 'you' : element.sender} {moment(s).fromNow()}</div></Message>
      <UserPic key={element.id+'icon'} style={{justifyContent:'end'}} id={element.id} onMouseOver={()=>{
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
        }} src={'https://avatars.dicebear.com/api/initials/:'+element.sender+'.svg'}></UserPic>
      </MessageWrapper>
    )}
    return(
      <MessageWrapper key={element.id+'wrapper'}>
        <UserPic key={element.id+'icon'} id={element.id} onMouseOver={()=>{
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
        }} src={'https://avatars.dicebear.com/api/initials/:'+element.sender+'.svg'}></UserPic>
        <Message key={element.id} style={{marginLeft:'5px',background:'#3ABEFF',color:'white',clear:'both'}}>{element.content}<br></br><div style={{fontWeight:'600',fontSize:'x-small',color:'#000',textAlign:'start'}}>Sent by {element.sender === current_user ? 'you' : element.sender} {moment(s).fromNow()}</div></Message>
      </MessageWrapper>
    )})}
    </Messageslist>
      <div style={{display: 'flex',position: 'relative',textAlign:'center',alignItems: 'center',justifyContent: 'center',borderRadius:'6px',padding:'5px'}}>
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
      <Sendbtn id="Sendbtn" onClick={handleSend} style={{cursor:current_user===null?'not-allowed':'pointer'}} >Send</Sendbtn>
      </div>
    <div></div>
    </div>
  )}
export default Chat
