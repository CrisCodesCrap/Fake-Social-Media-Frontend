import {ReactElement,useEffect,useState} from "react";
import {useWindowSize} from "usehooks-ts"
import {Nav,Cross,NavBtn,WrapperMobile,MobileNavMenuButtonSign,MobileNavMenuButtonText,NavBtnLeftMobile,Bars,NavMenu,NavBtnRight,NavBtnLeft,NavBtnLink,MobileNavMenu,User_Icon as UserIcon} from './NavbarElementsLight';
//import {NavDark,CogMenuWrapperDark,CogMenuDark,CogDark,CrossDark,DarkModeBtnDark,NavBtnDark,WrapperMobileDark,MobileNavMenuButtonSignDark,MobileNavMenuButtonTextDark,NavBtnLeftMobileDark,BarsDark,NavMenuDark,NavBtnRightDark,NavBtnLeftDark,NavBtnLinkDark,MobileNavMenuDark} from './NavbarElementsDark';
import { auth } from "../auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = (props:any):ReactElement => {
    const navigate = useNavigate()
    const {width} = useWindowSize()
    const [navshow, change_nav] = useState(false)
    let logged_in = window.localStorage.getItem('token')
    const user_icon = 'https://avatars.dicebear.com/api/initials/:'+localStorage.getItem('user')+'.svg'
    const urlhandle ='/users/'+window.localStorage.getItem('user')
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