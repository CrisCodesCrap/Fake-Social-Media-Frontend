import axios from "axios"
import {useEffect, useState} from "react"
import {Message,MessageWrapper,Messageslist,Msginput,Sendbtn,UserPic,SmileIcon} from './styles/Chat'
import moment from "moment"
import { useNavigate } from "react-router"
import tippy from 'tippy.js';
import Picker from 'emoji-picker-react';
import './styles/tippytooltip.css'
const Chat = () => {
  const [message,update_message] = useState<any>('')
  const [messagelist,update_messagelist] = useState<any[]>([])
  const navigate = useNavigate()
  const [chosenEmoji,setChosenEmoji] = useState<any>('')
  const handleSend = async()=>{
    if(message!==undefined && message !== ''){
    await axios.post('https://backend-api-python.herokuapp.com/send_msg',{'sender':current_user,'content':message,'room':1})
    .then((r)=>console.log(r.data['code']))
    await axios.get('https://backend-api-python.herokuapp.com/get_msg')
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
    axios.get('https://backend-api-python.herokuapp.com/get_msg')
    .then((messages)=>{
      const messagearray = messages.data['messages']
      update_messagelist(messagearray)
      const element = document.getElementById('MessageList')
      if(element !== null) element.scrollTop = element.scrollHeight  
    })
    const message_update = setInterval(async()=>{
    await axios.get('https://backend-api-python.herokuapp.com/get_msg')
    .then((messages)=>{
      const messagearray = messages.data['messages']
      update_messagelist(messagearray)
      //const element = document.getElementById('MessageList')
      //if(element !== null) element.scrollTop = element.scrollHeight  
    })
    },3000)
    return () => {
      clearInterval(message_update);
    };
  },[])
  return (
    <div style={{position: 'absolute',top: '60%',left:'50%',transform: 'translate(-50%,-50%)'}}>
    <Messageslist id='MessageList'>
    {messagelist.map(element => {
      let s = new Date(element.timesent)
      var thisname = document.getElementById(element.id)
      if(element.sender === current_user){return(
      <MessageWrapper key={element.id+'wrapper'} style={{justifyContent: 'end'}}>
      <Message key={element.id} style={{marginRight: '5px',background:'#43CC47',color:'white',clear:'both'}}>{element.content}<br></br><div style={{fontWeight:'600',fontSize:'x-small',color:'#000',textAlign:'start'}}>Sent by {element.sender === current_user ? 'you' : element.sender} {moment(s).fromNow()}</div></Message>
      <UserPic key={element.id+'icon'} style={{justifyContent:'end'}} id={element.id} onMouseOver={()=>{
          thisname !== null && tippy(thisname,{
            content:element.sender,
            theme:'mytheme',
            duration: 0,
            arrow: false,
            delay: [1000, 200],
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
            delay: [1000, 200],
          })
        }} onClick={()=>{
          let user_address = '/users/'+element.sender
          navigate(user_address)
        }} src={'https://avatars.dicebear.com/api/initials/:'+element.sender+'.svg'}></UserPic>
        <Message key={element.id} style={{marginLeft:'5px',background:'#1982FC',color:'white',clear:'both'}}>{element.content}<br></br><div style={{fontWeight:'600',fontSize:'x-small',color:'#000',textAlign:'start'}}>Sent by {element.sender === current_user ? 'you' : element.sender} {moment(s).fromNow()}</div></Message>
      </MessageWrapper>
    )})}
    </Messageslist>
      <div style={{display: 'flex',position: 'relative',textAlign:'center',alignItems: 'center',justifyContent: 'center',borderRadius:'6px',padding:'5px'}}>
    <SmileIcon onClick={()=>{
      set_displayEmojiMenu(displayEmojiMenu?false:true)
    }}></SmileIcon>
    {displayEmojiMenu&&<div style={{position: 'absolute',bottom:'100px',zIndex:1000000}}><Picker onEmojiClick={onEmojiClick} /></div>}
    <Msginput onKeyPress={(e)=> e.key === 'Enter' && handleSend()} id='Input' value={message} placeholder={current_user!==null?'Say something.':'You are not signed-in and can\'t write here.'} onChange={e=>update_message(e.target.value)}></Msginput>
      <Sendbtn onClick={handleSend} >Send</Sendbtn>
      </div>
    <div></div>
    </div>
  )}
export default Chat
