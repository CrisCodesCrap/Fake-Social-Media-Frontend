import {Wrapper,ContactsList, UserFriend} from './SideMenuElems'
import {ReactElement, useEffect,useState} from 'react'
import axios from 'axios'
import { UserPic } from '../pages/styles/Chat'
import moment from 'moment'
import '../pages/styles/tippytooltip.css'
import tippy from 'tippy.js'
const SideMenu = ({handleUnfriend,UpdateCurrentUserChat, updateDisplaySettings, CurrentUserChat,handleLeaveGroup}:any):ReactElement => {
  const [friendslist, update_friendslist] = useState<any[]>([])
  const [grouplist, updateGrouplist] = useState<any[]>([])
  const current_user = localStorage.getItem('user')
  useEffect(() =>{
    const urlFriends = 'http://localhost:8000/get_friendlist/'+current_user
    const urlGroups = 'http://localhost:8000/get_groups/'+current_user
    current_user !== null && axios.post(urlGroups,{'username':current_user})
    .then(response =>{
      updateGrouplist(response.data['groups'])
    })
    .catch(err =>{console.error(err)})
    axios.post(urlFriends,{'username':current_user})
    .then(response =>{
      update_friendslist(response.data['friends'].sort((a:any,b:any) => {
        const a_date = new Date(a['lastMessage'])
        const b_date = new Date(b['lastMessage'])
        return moment(b_date).diff(a_date)
      }))
  })
    .catch(err =>{console.error(err)})
  },[handleUnfriend,UpdateCurrentUserChat,CurrentUserChat,current_user,handleLeaveGroup])
  return(
    <Wrapper>
      <div style={{position:'relative',color: '#1982fc',marginLeft:'5%',width:'100%',alignItems:'center',justifyContent: 'center'}}>
          {current_user !== null &&
            <h1>Contacts:</h1>
          }
      </div>
        <ContactsList>
        {grouplist.length !== 0 &&
        <>
        <h3 style={{margin:'0 0 0 5%'}}>
          Groups:
        </h3>
          {grouplist.map((group:any) => {
            return (
            <div key={group.id+'wrapper'}>
              <UserFriend onClick={async() =>{
                updateDisplaySettings(false)
                await UpdateCurrentUserChat({username:group.name,room:group.id,type:true,admin:group.admin,isCreator:group.admin===current_user?true:false,participants:group.participants,created:group.timecreated})
                }} key={group.id}>
                <UserPic  src={'https://avatars.dicebear.com/api/initials/:'+group.name+'.svg'}></UserPic>
                <div style={{position:'relative',margin:'5px',cursor:'pointer'}}>
                  <h4>{group.name}</h4>
                </div>
              </UserFriend>
            </div>
            )
          })}
          <div style={{height:'1px',width:'100%',background:'#1982fc'}}></div>
          </>
          }
          {friendslist.length !== 0 &&
            <h3 style={{margin:'5% 0 0 5%'}}>
              Friends:
            </h3>
          }
          {friendslist.map((friend:any) => {
            var thisname = document.getElementById(friend['id'])
          return(
            <UserFriend onClick={async() =>{
                updateDisplaySettings(false)
                await UpdateCurrentUserChat({username:friend['friend'],room:friend['id'],type:false})
                }} key={friend['id']+'wrapper'}>
              <UserPic 
                draggable={false} 
                src={'https://avatars.dicebear.com/api/initials/:'+friend['friend']+'.svg'}>
              </UserPic>
              <div 
                key={friend['id']+'1234'} 
                id={friend['id']} 
                onMouseOver={()=>{
                  thisname !== null && tippy(thisname,{
                  content:friend['isonline'] ? 'online.':'last seen: '+ moment(friend['last_seen']).fromNow(),
                  theme:'mytheme',
                  duration: 0,
                  arrow: false,
                  delay: [200, 200],
                    })
                }}
                style={{border:'1px solid #1982FC',background:friend['isonline']?'#1982FC':'#fff',borderRadius:'50%',height:'15px',width:'15px',position:'absolute',zIndex:'1000',marginLeft:'35px',marginTop:'30px'}}>
              </div>
              <div key={friend['id']+'username'} style={{position:'relative',margin:'10px',cursor:'pointer'}}>
                <h4 style={{margin:'0'}} key={friend['id']+'123'}>{friend['friend']}</h4>
                <h5 key={friend['id']+' time'} style={{color:'gray',margin:'0',fontWeight:'300'}}>Active {moment(friend['last_seen']).fromNow()}</h5>
              </div>
            </UserFriend>  
          )}
        )}
      </ContactsList>
    </Wrapper>
  )
}

export default SideMenu
