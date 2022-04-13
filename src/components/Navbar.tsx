import {ReactElement,useEffect,useRef,useState} from "react";
import {useWindowSize} from "usehooks-ts"
import {Nav,FoundMatchUser,FoundUserPic,Notification,CrossSearchUser,Cross,Search,NavBtn,UserList,WrapperMobile,MobileNavMenuButtonSign,MobileNavMenuButtonText,NavBtnLeftMobile,Bars,NavMenu,NavBtnRight,NavBtnLeft,NavBtnLink,MobileNavMenu,User_Icon as UserIcon, UserInput, Bell, BellDropDown, AcceptIcon, DeclineIcon, SearchHeader, DropdownContent, NotificationHeader} from './NavbarElements';
import { useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";
const Navbar = (props:any):ReactElement => {
    const navigate = useNavigate()
    const {width} = useWindowSize()
    const current_user = localStorage.getItem('user')
    const [navshow, change_nav] = useState<boolean>(false)
    const [show_search_cross, change_show_search_cross] = useState<boolean>(false)
    const [usersearchname, change_usersearchname] = useState<string>("")
    let logged_in = window.localStorage.getItem('token')
    const user_icon = 'https://avatars.dicebear.com/api/initials/:'+current_user+'.svg'
    const [found_users,update_found_users] = useState<any[]>([])
    const [show_notifications,update_show_notifications] = useState<boolean>(false)
    const [notification_number, update_notification_number] = useState<number>(0)
    const [notification_array,update_notification_array] = useState<any[]>([])
    const dropdown = useRef<HTMLDivElement>(null)
    const icon = useRef<HTMLDivElement>(null)
    const list = useRef<HTMLDivElement>(null)
    const userinput = useRef<HTMLInputElement>(null)
    const urlhandle ='/users/me'
    const QueryUserHandler = () =>{
      axios.post('http://localhost:8000/query_users',{'username_fragment':usersearchname})
      .then(response => {
        update_found_users(response.data['found_users'])
      })
    }
    useEffect(()=>{
      const handleClick = (e:any)=>{ 
        if(!icon.current?.contains(e.target) && !dropdown.current?.contains(e.target))update_show_notifications(false)
      }
      document.addEventListener("click", handleClick)
      return () => document.removeEventListener("click", handleClick)
    },[])
    useEffect(() =>{
      const userInputSearch:any = document.getElementById('UserInputSearch')
      //const userInputCross:any = document.getElementById('UserInputCross')
      window.addEventListener('click',(e:any)=>{
          if(
            show_search_cross &&
            !userinput.current?.contains(e.target) &&
            !userInputSearch?.contains(e.target)&&
            !list.current?.contains(e.target)){
              change_show_search_cross(false)
            }
          })
      const friend_req_get_url = 'http://localhost:8000/get_friend_req/'+current_user
      axios.post(friend_req_get_url,{'username':current_user})
      .then(response => {
        let requests = response.data['friend_requests']
        update_notification_number(requests.length)
        update_notification_array(requests)
      })
      .catch(error=>{
        console.error(error)
      })
    },[show_search_cross,change_show_search_cross])
    const handleFriendRequest = (Accept:boolean,user2:string) =>{
      const friendrequestanswerurl = 'http://localhost:8000/answer_friend_req/'+current_user
      axios.post(friendrequestanswerurl,{'username':current_user,'answer':Accept,'user2':user2})
      update_notification_number(0)
    }
    return(    
     <Nav>
            {/* |Mobile Nav| */}
            
            {!navshow?<Bars onClick={()=>{
              change_nav(navshow?false:true);
            }}/>:undefined}
            {navshow?<Cross onClick={()=>{
              change_nav(navshow?false:true);
            }} />:undefined}
            {width<=768?<NavBtnLeftMobile to='/'>Home</NavBtnLeftMobile>:undefined}
            {width<=768?<MobileNavMenu style={{display: navshow?'block':'none'}}>
                <MobileNavMenuButtonText to='/Chat'>
                  Chat
                </MobileNavMenuButtonText>
                {logged_in?<><MobileNavMenuButtonText to='/Account'>
                  Account 
                </MobileNavMenuButtonText>
                <MobileNavMenuButtonText onClick={()=>{
                  props.signout()
                  navigate('/sign-in')
                }} to='/logout'>
                  Logout 
                </MobileNavMenuButtonText></>:undefined}
              {!logged_in?
              <WrapperMobile>
                <MobileNavMenuButtonSign to='sign-up'>Sign up</MobileNavMenuButtonSign>
                <MobileNavMenuButtonSign to='sign-in'>Sign in</MobileNavMenuButtonSign>
              </WrapperMobile>
              :undefined}
              
            </MobileNavMenu>:undefined}
            
            {/* |Desktop Nav| */}
            
            {width > 768?<>
            <NavMenu>
              <NavBtnLeft to='/'>Home</NavBtnLeft>
            </NavMenu>
        <NavBtn>
          <div>
            <div style={{display:'flex',alignItems:'center'}}>
              {!show_search_cross&&
                <Search id='UserInputSearch'>
                </Search>
              }
              <UserInput autoComplete="off" ref={userinput} onClick={()=>{
                change_show_search_cross(true)  
              }}
                onChange={(e)=>{
                change_usersearchname(e.target.value)
                QueryUserHandler()
                usersearchname === '' && update_found_users([])
                }} placeholder='Search users.'
                value={usersearchname}>
              </UserInput>
              {show_search_cross&&
              <CrossSearchUser id='UserInputCross'
                onClick={()=>{
                change_usersearchname("")
                update_found_users([])
                change_show_search_cross(false)
                }}>
              </CrossSearchUser>
              }
              </div>
                <UserList ref={list} style={{display:show_search_cross?'inline-block':'none'}}>
                <SearchHeader style={{display:show_search_cross && usersearchname !== '' && found_users.length !== 0 ?'flex':'none'}}>Found users:</SearchHeader>
                  {found_users.map(user => {
                    if(user === localStorage.getItem('user')) return
                    let url = '/users/'+user
                    return(
                      <FoundMatchUser to={url} onClick={()=>{
                        change_show_search_cross(false)
                          }} key={user}>
                          <FoundUserPic 
                            draggable={false}
                            src={'https://avatars.dicebear.com/api/initials/:'+user+'.svg'}>
                          </FoundUserPic>
                        <div>{user}</div>
                      </FoundMatchUser>
                      )
                    }
                  )}
                </UserList>
              </div>
              <NavBtnRight to='/Chat'>Chat</NavBtnRight>
              {logged_in?
              <>
                <NavBtnRight to={urlhandle}>{window.localStorage.getItem('user')}
                <UserIcon draggable={false} src={user_icon}></UserIcon>
                </NavBtnRight>
                <div ref={icon} id='bell' style={{display:'inline-block',position:'relative',textAlign:'center'}}>
                  <div style={{display:notification_number === 0?'none':'block',cursor:'pointer',position:'absolute',background:'#1982FC',zIndex:'10000',borderRadius:'50%',alignItems:'center',textAlign:'center',padding:'1px',fontSize: '50%',width:'12px',height:'12px',color:'white'}}>
                    {notification_number >9 ?'9+':notification_number}
                  </div>
                  <Bell onClick={()=>{
                  update_show_notifications(show_notifications?false:true)
                  show_search_cross&&change_show_search_cross(false)
                }} id='bellsvg'></Bell> 
                  {show_notifications&&
                  <BellDropDown id='bellmenu'>
                    <NotificationHeader >Notifications:</NotificationHeader>
                    {notification_array.length !== 0 && notification_array.map(notification =>{
                      return(
                        <Notification key={notification.id}>
                          <FoundUserPic 
                            draggable={false}
                            src={'https://avatars.dicebear.com/api/initials/:'+notification.user1+'.svg'}> 
                          </FoundUserPic>
                          {notification.user1} has sent you a friend request {moment(notification.timesent).fromNow()}.
                        <div style={{display: 'inline-flex',flexDirection: 'row',marginLeft:'1%',position:'relative',alignItems:'center'}}>
                          <div onClick={() => {
                            handleFriendRequest(true,notification.user1)
                            const id = notification_array.indexOf(notification)
                            console.log(id)
                            notification_array.splice(id,1)
                          }}  
                          style={{display:'flex',borderRadius:'50%',background:'#000913',alignItems:'center',justifyContent:'center',height:'24px',width:'24px',cursor:'pointer'}}>
                            <AcceptIcon></AcceptIcon>
                          </div>
                          <div style={{margin:'0 15px 0 15px',width:'0px',height:'32px',border:'1px solid #fff'}}></div>
                        <div onClick={() => {
                            handleFriendRequest(false,notification.user1)
                            const id = notification_array.indexOf(notification)
                            notification_array.splice(id,1)
                          }} 
                          style={{display:'flex',borderRadius:'50%',background:'#000913',alignItems:'center',justifyContent:'center',height:'24px',width:'24px',cursor:'pointer'}}>
                            <DeclineIcon></DeclineIcon>
                          </div>
                        </div>
                        </Notification>
                      )
                    })}
                      {notification_array.length === 0 &&
                        <Notification style={{textAlign:'center',display:'flex'}}>
                          You don't have any notifications present.
                        </Notification>
                      }
                    <DropdownContent>
                    </DropdownContent>
                  </BellDropDown>}
                </div>
                <NavBtnLink to='/sign-in' onClick={()=>{
                  const user_url = 'http://localhost:8000/set_offline/'+localStorage.getItem('user')
                  axios.post(user_url,{'user':localStorage.getItem('user')})
                  props.signout()
                  }}>
                  Logout
                </NavBtnLink>
              </>
              :undefined}
              {!logged_in?
              <>
                <NavBtnRight to='/sign-in'>Sign In</NavBtnRight>
                <NavBtnLink to='/sign-up'>Sign Up</NavBtnLink>
              </>
              :undefined}
        </NavBtn>
            </>:<></>}
          </Nav>
      )}
export default Navbar;