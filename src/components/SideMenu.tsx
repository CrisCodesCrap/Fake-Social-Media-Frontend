import {Wrapper,ContactsList, UserFriend} from './SideMenuElems'
import {ReactElement, useEffect,useState} from 'react'
import axios from 'axios'
import { UserPic } from '../pages/styles/Chat'
import moment from 'moment'
import '../pages/styles/tippytooltip.css'
import tippy from 'tippy.js'
const SideMenu = ({UpdateCurrentUserChat, CurrentUserChat}:any):ReactElement => {
  const [friendslist, update_friendslist] = useState<any[]>([])
  const current_user = localStorage.getItem('user')
  useEffect(() =>{
    const url_friends = 'http://localhost:8000/get_friendlist/'+current_user
    axios.post(url_friends,{'username':current_user})
    .then(response =>{
      update_friendslist(response.data['friends'])
    })
    .catch(err =>{})
  },[])
  return (
    <Wrapper>
      <div style={{position:'relative',color: '#1982fc',marginLeft:'5%',width:'100%',alignItems:'center',justifyContent: 'center'}}><h1>Contacts:</h1></div>
        <ContactsList>
          {friendslist.map(friend =>{
            var thisname = document.getElementById(friend['id'])
            return(
            <UserFriend onClick={async() =>{
              await UpdateCurrentUserChat({username:friend['friend'],room:friend['id']})
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
