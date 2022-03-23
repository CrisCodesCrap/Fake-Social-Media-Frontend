import {ReactElement,useEffect,useState} from "react";
import {useWindowSize} from "usehooks-ts"
import {Nav,FoundMatchUser,FoundUserPic,CrossSearchUser,Cross,Search,NavBtn,UserList,WrapperMobile,MobileNavMenuButtonSign,MobileNavMenuButtonText,NavBtnLeftMobile,Bars,NavMenu,NavBtnRight,NavBtnLeft,NavBtnLink,MobileNavMenu,User_Icon as UserIcon, UserInput} from './NavbarElements';
//import {NavDark,CogMenuWrapperDark,CogMenuDark,CogDark,CrossDark,DarkModeBtnDark,NavBtnDark,WrapperMobileDark,MobileNavMenuButtonSignDark,MobileNavMenuButtonTextDark,NavBtnLeftMobileDark,BarsDark,NavMenuDark,NavBtnRightDark,NavBtnLeftDark,NavBtnLinkDark,MobileNavMenuDark} from './NavbarElementsDark';
import { auth } from "../auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = (props:any):ReactElement => {
    const navigate = useNavigate()
    const {width} = useWindowSize()
    const [navshow, change_nav] = useState<boolean>(false)
    const [show_search_cross, change_show_search_cross] = useState<boolean>(false)
    const [usersearchname, change_usersearchname] = useState<string>("")
    let logged_in = window.localStorage.getItem('token')
    const user_icon = 'https://avatars.dicebear.com/api/initials/:'+localStorage.getItem('user')+'.svg'
    const [found_users,update_found_users] = useState<any[]>([])
    const QueryUserHandler = () =>{
      axios.post('http://localhost:8000/query_users',{'username_fragment':usersearchname})
      .then(response => {
        console.log(response.data['found_users'])
        update_found_users(response.data['found_users'])
      })
    }
    const urlhandle ='/users/'+window.localStorage.getItem('user')
    useEffect(() =>{
      const userinput = document.getElementById('UserInput')
      const userinputSearch = document.getElementById('UserInputSearch')
      const userinputCross = document.getElementById('UserInputCross')
      window.addEventListener('click',(e)=>{
        if(
          userinput !== null &&
          show_search_cross &&
          e.target !== userinput &&
          userinputCross !== null &&
          e.target !== userinputCross &&
          userinputSearch !== null &&
          e.target !== userinputSearch
          )
           change_show_search_cross(false)
      })
    },[show_search_cross,change_show_search_cross])
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
              <Search id='UserInputSearch' style={{display:show_search_cross?'none':'grid'}}></Search>
              <UserInput id='UserInput' onClick={()=>{
                change_show_search_cross(true)
              }} onChange={(e)=>{
                change_usersearchname(e.target.value)
                QueryUserHandler()
              }} placeholder='Search users.'
              value={usersearchname}></UserInput>
              <CrossSearchUser
               id='UserInputCross' 
               style={{display:show_search_cross?'grid':'none'}}
               onClick={()=>{
                change_usersearchname("")
               }}></CrossSearchUser>
                <UserList style={{display:show_search_cross?'grid':'none'}}>
                  {found_users.map(user => {
                    return(
                      <FoundMatchUser onClick={()=>{
                        const urlhandlequery ='/users/'+user
                        navigate(urlhandlequery)
                      }} key={user}>
                        <FoundUserPic
                         src={'https://avatars.dicebear.com/api/initials/:'+user+'.svg'}></FoundUserPic>
                        <div>{user}</div>
                      </FoundMatchUser>
                    )
                  })}
                </UserList>
              <NavBtnRight to='/Chat'>Chat</NavBtnRight>
              {logged_in?
              <>
                <NavBtnRight to={urlhandle}>{window.localStorage.getItem('user')}
                <UserIcon src={user_icon}></UserIcon>
                </NavBtnRight>
                <NavBtnLink to='/sign-in' onClick={()=>{
                  const user_url = 'http://localhost:8000/set_offline/'+localStorage.getItem('user')
                  axios.post(user_url,{'user':localStorage.getItem('user')})
                  props.signout()
                }}>Logout</NavBtnLink>
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