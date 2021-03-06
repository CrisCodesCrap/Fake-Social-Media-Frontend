import axios from "axios"
import {useEffect, useRef, useState} from "react"
import {Message,MessageWrapper,Messageslist,LeaveButton,Msginput,Sendbtn,UserPic,SmileIcon, ChatRoomHeader, CreateGroupIcon, ChatRoomSettingsIcon, CreateGroupButton, UserIcon, CreateGroupIconLeave, GroupMember } from './styles/Chat'
import moment from "moment"
import { useNavigate } from "react-router"
import tippy from 'tippy.js';
import Picker from 'emoji-picker-react';
import './styles/tippytooltip.css'
import { useNotifications } from '@mantine/notifications';
import {io} from 'socket.io-client'
import SideMenu from "../components/SideMenu"
import CreateGroup from "../components/CreateGroup"
import AddUser from "../components/AddUser"
import AreYouSureWindow from "../components/AreYouSureWindow"

const Chat = (props:any) => {
  const current_user = localStorage.getItem('user')
  const [message,update_message] = useState<any>('')
  const notifications = useNotifications()
  const [messagelist,update_messagelist] = useState<any[]>([])
  const [textwidth,update_textwidth] = useState<any>()
  const [settingsDisplay, changeSettingsDisplay] = useState<boolean>(false)
  const navigate = useNavigate()
  const msglist = useRef<any>(null)
  const [showCreateGroup,updateShowCreateGroup] = useState<boolean>(false)
  const [chosenEmoji,setChosenEmoji] = useState<any>('')
  const [current_user_chat, update_current_user_chat] = useState<any>({username:'',room:0,type:undefined,admin:'',isCreator:false,participants:[],created:new Date()})
  const [last_seen,update_last_seen] = useState<any>(undefined)
  const [participants, updateParticipants] = useState<any[]>([])
  const [chooseKick, updateChooseKick] = useState<string[]>([])
  const [showAddUser,updateShowAddUser] = useState<boolean>(false)
  const [showSure, updateShowSure] = useState<boolean>(false)
  const [isLeaving, updateIsLeaving] = useState<boolean>(false)
  
  const deleteGroupHandler = async () => {
    updateShowSure(true)
  }
  const leaveHandler = async () => {
    if(current_user_chat.participants.length === 1){
      updateIsLeaving(true)
      updateShowSure(true)
    }else{
      const groupLeaveUrl = 'http://localhost:8000/leaveGroup/'+current_user
        await axios.post(groupLeaveUrl,{'username':current_user,'room':current_user_chat.room,'isAdmin':current_user_chat.isCreator})
        .then(response => {
          update_current_user_chat({username:'',room:0,type:undefined,isCreator:false,participants:[],created:0})
          axios.post('http://127.0.0.1:4000/send_msg',response.data)
        })
    }
  }
  const kickSelectedHandler = async () => {
    const kickUrl = 'http://localhost:8000/kickUsers/'+current_user
    await axios.post(kickUrl,{'username':current_user,'id':current_user_chat.room,'remove':chooseKick})
    .then(response => {
      updateChooseKick([])
      updateShowAddUser(false)
        update_current_user_chat(
          {username:current_user_chat.username,
            room:current_user_chat.room,
            type:current_user_chat.type,
            admin:current_user_chat.admin,
            isCreator:current_user_chat.isCreator,
            created:current_user_chat.created,
            participants:current_user_chat.participants.filter((user:any)=>!chooseKick.includes(user))
      })
      axios.post('http://127.0.0.1:4000/send_msg',response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }
  const kickUserHandler = (user:string) =>{
    chooseKick.includes(user) && updateChooseKick(chooseKick.filter((u:string) => u !== user))
    !chooseKick.includes(user) && updateChooseKick([...chooseKick,user])
  }
  const handleSend = async()=>{
    if(message!==undefined && message !== ''){
    changeSettingsDisplay(false)
    let msg = {'sender':current_user,'content':message,'room':current_user_chat.room,'type':current_user_chat.type}
    await axios.post('http://127.0.0.1:8000/send_msg',msg)
    .then(async response =>{
      await axios.post('http://127.0.0.1:4000/send_msg',response.data)
      .catch(err =>console.error(err))
      update_message('')
      if(msglist.current !== null){
        set_displayEmojiMenu(false)
        let mesg = response.data
        update_messagelist(messagelist=>[...messagelist,mesg])
        msglist.current.scrollTop = msglist.current.scrollHeight
      }
    })
  }}
  const [displayEmojiMenu,set_displayEmojiMenu] = useState(false)
  const onEmojiClick = async (event:any,emojiObject:any) => {
    setChosenEmoji(emojiObject)
    emojiObject.emoji !== undefined && emojiObject.emoji !== 'undefined' && update_message(message+emojiObject.emoji)
  }
  useEffect(()=>{
    props.ParentCurrentChat !== null && update_current_user_chat(props.ParentCurrentChat)
  },[])
  useEffect(() => {
    const socket = io('http://127.0.0.1:4000/')
    socket.on('message',(e)=>{
      if(e.sender !== current_user) {
        update_message('')
        if(msglist.current !== null){
          set_displayEmojiMenu(false)
          if(current_user_chat.room === e.room) { 
            if(msglist.current.scrollTop === msglist.current.scrollHeight){
            update_messagelist(messagelist=>[...messagelist,e])
            msglist.current.scrollTop = msglist.current.scrollHeight
          }else{
            update_messagelist(messagelist=>[...messagelist,e])
          }
            
        }
      }
    }
    }
  )  
    return () => {
      socket.disconnect()
  }
  },[current_user_chat,current_user])
  useEffect(() => {
    msglist.current.scrollTop = msglist.current.scrollHeight
  },[changeSettingsDisplay,settingsDisplay])
  useEffect(()=>{
    const element:any = document.getElementById('MessageList')
    current_user_chat.type !== undefined && axios.post('http://127.0.0.1:8000/get_msg',{'room':current_user_chat.room,'isgroup':current_user_chat.type})
    .then((messages)=>{
      const messagearray = messages.data['messages']
      update_messagelist(messagearray)
    const last_seen_url = 'http://127.0.0.1:8000/last_seen/'+current_user_chat.username
    current_user_chat.username !== ''  && !current_user_chat.type && axios.post(last_seen_url,{'username':current_user_chat.username})
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
      update_textwidth(msglist.current.clientWidth)
    }
    window.addEventListener('resize',handleResize)
    update_textwidth(msglist.current.clientWidth)
    updateParticipants(current_user_chat.participants)
    return ()=> window.removeEventListener('resize',handleResize)  
    },[current_user_chat,update_current_user_chat, changeSettingsDisplay,current_user])
    
    const handleUnfriend = async () => {
      const unfriendurl = 'http://localhost:8000/unfriend/'+current_user_chat.username
      await axios.post(unfriendurl,{'username':current_user,'friend':current_user_chat.username})	
      .then(async response  => {
        if(response.data['code'] === 'success'){
          update_current_user_chat({username:'',room:0,type:undefined})
        }
      })
    }
  return (
  <div>
    {showCreateGroup &&
      <CreateGroup currentUserChat={current_user_chat} currentUser={current_user} updateShowCreateGroup={updateShowCreateGroup}>
      </CreateGroup>
    }
    {showAddUser &&
      <AddUser updateCurrentUserChat={update_current_user_chat} updateShowAddUser={updateShowAddUser} currentUser={current_user} currentUserChat={current_user_chat}>
      </AddUser>
    }
    {showSure &&
      <AreYouSureWindow isLeaving={isLeaving} updateShowSure={updateShowSure} current_user={current_user} current_user_chat={current_user_chat} update_current_user_chat={update_current_user_chat}>
      </AreYouSureWindow>
    }
    <div style={{display: 'flex',flexDirection:'row'}}>
    <SideMenu style={{background:current_user_chat.username !==''?'#fff !important':'#1982fc'}} handleLeaveGroup={leaveHandler} handleUnfriend={handleUnfriend} updateDisplaySettings={changeSettingsDisplay} CurrentUserChat={current_user_chat} UpdateCurrentUserChat={update_current_user_chat}></SideMenu>
    <div style={{flex: '1',position: 'relative',display:'flex',flexDirection: 'column',margin:'3% 0 0 2%',justifyContent: 'center',alignItems:'center',marginTop:'4%'}}>
      <ChatRoomHeader>
        <div style={{marginLeft:'5%',width:'50%',display:'flex',alignItems:'center',cursor:'pointer',flexDirection:'row'}} onClick={()=>{
          if(!current_user_chat.type) {
            let user_address = '/users/'+current_user_chat.username
            navigate(user_address)
          }
          else{
            changeSettingsDisplay(!settingsDisplay)
          }
         }}>
          {current_user_chat.username!==''&&
          <>
            <UserPic style={{height:'40px',width:'40px',marginRight:'2.5%'}} draggable={false} src={'https://avatars.dicebear.com/api/initials/:'+current_user_chat.username+'.svg'}>
            </UserPic>
            <div style={{display:'flex',flexDirection:'column',alignItems:'baseline'}}>
                {current_user_chat.username}
              <div style={{color:'#023774',fontSize:'small',display:'flex'}}>
                {last_seen !== undefined && !current_user_chat.type &&'Last seen: '+ moment(last_seen).fromNow()}
              </div>
            </div>
          </>
          }
        </div>
        <div style={{width:'50%'}}>
        {current_user_chat.username!==''&&
          <ChatRoomSettingsIcon onClick={()=>changeSettingsDisplay(!settingsDisplay)} focusable={false}>
          </ChatRoomSettingsIcon>
        }
        {!current_user_chat.type&&
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
        }
        </div>
      </ChatRoomHeader>
    {current_user_chat.username !==''?
    <>
    {settingsDisplay?
      <Messageslist ref={msglist} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <div style={{borderBottom:'1px solid #1982fc',height:'15%',width:'80%',textAlign:'center'}}>
          <h4 style={{color:'#1982fc'}}>
            {current_user_chat.username}
          </h4>
        </div>
          {current_user_chat.type?
          <>
          <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          </div>
          {current_user_chat.isCreator?
          <>
            <h4 style={{color:'#1982fc'}}>List of users:</h4>
            <div style={{width:'60%',display:'flex',flexDirection:'column',alignItems:'center',borderBottom:'1px solid #1982fc',borderTop:'1px solid #1982fc'}}>
               {participants.map((participant:any)=>{
                if(participant === current_user) {
                  return(
                    <GroupMember draggable={false} style={{background:chooseKick.includes(participant)?'#1982fc':'#fff'}} key={participant+'wrapper'}>
                      <UserPic src={'https://avatars.dicebear.com/api/initials/:'+participant+'.svg'}></UserPic>
                      <div  style={{margin:'3%',color:chooseKick.includes(participant)?'#fff':'#1982fc'}}>{participant} (you) {current_user_chat.isCreator&&'(admin)'}</div>
                    </GroupMember>
                  ) 
                }
                else{
                return(
                    <GroupMember draggable={false} style={{background:chooseKick.includes(participant)?'#1982fc':'#fff'}} onClick={()=>kickUserHandler(participant)}  key={participant+'wrapper'}>
                      <UserPic  src={'https://avatars.dicebear.com/api/initials/:'+participant+'.svg'}></UserPic>
                      <div style={{margin:'3%',color:chooseKick.includes(participant)?'#fff':'#1982fc'}}>{participant}</div>
                    </GroupMember>
                    )
                      }
                    }
                  )
                }
            </div>
          </>  
          :
          <>
            <h4 style={{color:'#1982fc'}}>List of users:</h4>
            <div style={{width:'60%',display:'flex',flexDirection:'column',alignItems:'center',borderBottom:'1px solid #1982fc',borderTop:'1px solid #1982fc'}}>
               {participants.map((participant:any)=>{
                if(participant === current_user) {
                  return(
                    <GroupMember draggable={false} style={{color:"#1982fc"}} key={participant+'wrapper'}>
                      <UserPic src={'https://avatars.dicebear.com/api/initials/:'+participant+'.svg'}></UserPic>
                      <div  style={{margin:'3%'}}>{participant} (you)</div>
                    </GroupMember>
                  ) 
                }
                else{
                  return(
                    <GroupMember style={{color:"#1982fc"}} draggable={false} key={participant+'wrapper'}>
                      <UserPic  src={'https://avatars.dicebear.com/api/initials/:'+participant+'.svg'}></UserPic>
                      <div style={{margin:'3%'}}>{participant} {current_user_chat.admin===participant&&'(admin)'}</div>
                    </GroupMember>
                    )
                      }
                    }
                  )
                }
            </div>
          </>  
          }   
            {!current_user_chat.isCreator?
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'end',width:'60%'}}>
              <LeaveButton onClick={()=>updateShowAddUser(true)}>
                Add +
              </LeaveButton>
              <LeaveButton onClick={()=>leaveHandler()} style={{color:'#1982fc',background:'#fff'}}>
                Leave
              </LeaveButton>
            </div>
              :
              <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'end',width:'60%'}}>
                <LeaveButton onClick={()=>updateShowAddUser(true)}>
                  Add +
                </LeaveButton>
                {chooseKick.length>0&&
                  <LeaveButton onClick={()=>kickSelectedHandler()}>
                  Kick selected
                </LeaveButton>
                }
              <LeaveButton onClick={leaveHandler} style={{color:'#1982fc',background:'#fff'}}>
                Leave
              </LeaveButton>
                <LeaveButton onClick={deleteGroupHandler} style={{color:'#1982fc',background:'#fff'}}>
                  Delete the group
                </LeaveButton>
              </div>
            }
            </>
                :
          <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <LeaveButton style={{display:'flex',alignItems:'center'}} onClick={()=>{
              updateShowCreateGroup(true)
            }}>
              + Group with {current_user_chat.username} 
              <CreateGroupIconLeave></CreateGroupIconLeave>
            </LeaveButton>
            <LeaveButton onClick={()=>{
              const navurl = '/users/'+current_user_chat.username
              navigate(navurl)
              }
            }>
              Profile
              <UserIcon></UserIcon>
            </LeaveButton>
            <LeaveButton onClick={()=>handleUnfriend()} style={{background:'#fff',color:'#1982fc'}}>
              Unfriend
            </LeaveButton>
          </div> 
          }
        <div>

        </div>
      </Messageslist>
    :
      <Messageslist ref={msglist} id='MessageList'>
      {current_user_chat.type&&
        <div style={{display:'flex',justifyContent:'center',color:'gray',marginTop:'3%',alignItems:'center',fontWeight:'300'}}>
        Group was created {moment(current_user_chat.created).fromNow()}
      </div>
      }
      <div style={{display:'flex',justifyContent:'center',color:'gray',marginTop:'3%',alignItems:'center',fontWeight:'300'}}>
        {messagelist.length===0?'No messages yet.':'You\'ve reached the end.'}
      </div>
        {messagelist.map(element => {
        let s = new Date(element.timesent)
        var thisname = document.getElementById(element.id)
      if(element.sender === current_user && !element.isCommand){
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
          let user_address = '/users/me'
          navigate(user_address)
        }} draggable={false} src={'https://avatars.dicebear.com/api/initials/:'+element.sender+'.svg'}>
      </UserPic>
      </MessageWrapper>
      )}
    if(!element.isCommand && element.sender !== current_user){
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
    )}
      return(
        <div key={element.id+'command'} style={{display:'flex',justifyContent:'center',color:'gray',marginTop:'3%',alignItems:'center',fontWeight:'300'}}>
          {element.content} {moment(element.timesent).fromNow()}.
        </div>
      )
    })}
    </Messageslist>
    }
      <div style={{width:textwidth-6+'px',display: 'flex',textAlign:'center',alignItems: 'center',justifyContent: 'space-evenly',borderRadius:'6px',padding:'5px',border:'1px solid #1982FC'}}>
    <SmileIcon style={{cursor:current_user===null?'not-allowed':''}} id="SmileIcon" onClick={()=>{
      current_user !== null && set_displayEmojiMenu(displayEmojiMenu?false:true)
      }}>
    </SmileIcon>
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
      }}>
    </Msginput>
      <Sendbtn id="Sendbtn" onClick={()=>handleSend()} style={{cursor:current_user===null?'not-allowed':'pointer'}} >Send</Sendbtn>
      </div>
  </>:
  <>
  <Messageslist ref={msglist} style={{color: '#000913',textAlign: 'center',alignItems: 'center',display: 'flex',flexDirection: 'column'}} id='MessageList'>
    <div style={{marginTop:'10%'}}>
      <h2>Send messages to friends.</h2>
      {current_user !== null ?
        <h4 style={{color: '#1982fc'}}>Choose a group or a friend from the contacts panel on your left.</h4>
      :
        <div style={{display:'flex',justifyContent:'center'}}>
        <LeaveButton onClick={()=>navigate('/sign-in')} style={{padding:'6px 20px 6px 20px'}}>
          Sign In
        </LeaveButton>
        </div>
      }
      <div>
        {current_user !== null&&
          <CreateGroupButton onClick={()=>{updateShowCreateGroup(true)}}>
            Create a group
          </CreateGroupButton>
        }
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
