import {Wrapper,ContactsList, UserFriend} from './SideMenuElems'
import {ReactElement, useEffect,useState} from 'react'
import axios from 'axios'
import { UserPic } from '../pages/styles/Chat'
import moment from 'moment'
import '../pages/styles/tippytooltip.css'
import tippy from 'tippy.js'
const SideMenu = ({UpdateCurrentUserChat, CurrentUserChat}:any):ReactElement => {
  const [friendslist, update_friendslist] = useState<any[]>([])
  const [grouplist, updateGrouplist] = useState<any[]>([])
  const current_user = localStorage.getItem('user')
  useEffect(() =>{
    const urlFriends = 'http://localhost:8000/get_friendlist/'+current_user
    const urlGroups = 'http://localhost:8000/get_groups/'+current_user
    axios.post(urlGroups,{'username':current_user})
    .then(response =>{
      updateGrouplist(response.data['groups'])
    })
    .catch(err =>{})
    axios.post(urlFriends,{'username':current_user})
    .then(response =>{
      update_friendslist(response.data['friends'])
    })
    .catch(err =>{})
  },[])
  return (
    <Wrapper>
      <div style={{position:'relative',color: '#1982fc',marginLeft:'5%',width:'100%',alignItems:'center',justifyContent: 'center'}}><h1>Contacts:</h1></div>
        <ContactsList>
          {grouplist.map((group:any) => {
            return (
              <UserFriend onClick={async() =>{
                await UpdateCurrentUserChat({username:group.name,room:group.id,type:true})
                }} key={group.id}>
                <UserPic  src={'https://avatars.dicebear.com/api/initials/:'+group.name+'.svg'}></UserPic>
                <div style={{position:'relative',margin:'10px',cursor:'pointer'}}>
                  <h3>{group.name}</h3>
                  <p>{group.group_description}</p>
                </div>
              </UserFriend>
            )
          })}
          {friendslist.map((friend:any) => {
            var thisname = document.getElementById(friend['id'])
            return(
            <UserFriend onClick={async() =>{
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
                  content:friend['isonline']?'online.':'last seen: '+moment(friend['last_seen']).fromNow(),
                  theme:'mytheme',
                  duration: 0,
                  arrow: false,
                  delay: [200, 200],
                    })
              }}
                style={{border:'1px solid #1982FC',background:friend['isonline']?'#1982FC':'#fff',borderRadius:'50%',height:'15px',width:'15px',position:'absolute',zIndex:'1000',marginLeft:'35px',marginTop:'30px'}}>
              </div>
              <div key={friend['id']+'username'} style={{position:'relative',margin:'10px',cursor:'pointer'}}>
                <h2 key={friend['id']+'123'}>{friend['friend']}</h2>
              </div>
            </UserFriend>  
            )}
          )}
        </ContactsList>
    </Wrapper>
  )
}

export default SideMenu
