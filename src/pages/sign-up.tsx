import {Form,Wrapper,UserIcon,Lock_Locked as LockLocked,Lock_Open as LockOpen,FormWrapper,SubmitButton,FormInput} from './styles/sign-in';
//import {FormDark,WrapperDark,UserIconDark,Lock_LockedDark as LockLockedDark,Lock_OpenDark as LockOpenDark,FormWrapperDark,SubmitButtonDark,FormInputDark} from './styles/sign-inDark';
import {ReactElement, useState} from 'react'
import { useWindowSize } from 'usehooks-ts'
import {auth} from '../auth'
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = (props:any):ReactElement => {
  const [isprivacy, change_privacy] = useState(true)
  const {width} = useWindowSize()
  const [logindata, change_data] = useState({
    email: "",
    username: "",
    password: ""
  })
  let navigate = useNavigate()
  const handleemail = (e:any) =>{
    const email:string = e.target.value
    change_data({email:email,username:logindata.username,password:logindata.password})
  }
  const handleusername = (e:any) =>{
    const username:string = e.target.value
    change_data({email:logindata.email,username:username,password:logindata.password})
  }
  const handlepassword = (e:any) =>{
    const password:string = e.target.value
    change_data({email:logindata.email,username:logindata.username,password:password})
  }
  const APIRequestHandler = () =>{
    axios.post('http://127.0.0.1:8000/sign-up',
    {
      email:logindata.email,
      username:logindata.username,
      password:logindata.password
    })
    .then(response => {
      console.log(response)
      if (response.data['code'] === 'success'){
        window.localStorage.setItem('token',response.data['token'])
        window.localStorage.setItem('user', logindata.username)
        console.log(window.localStorage.getItem('user'))
        auth.signin(logindata.username)
        navigate('/')
      } 
    })
    .catch(error => console.error(error))
  }
  if(auth.isAuthenticated){
    return(
    <Navigate to='/Account'/>
  )} 
  return (
    <Wrapper>
      <Form>
        <FormWrapper>
          <h1 style={{marginTop: '150px'}}>Sign up<UserIcon></UserIcon></h1>
          <FormInput placeholder="Email:" type="email" onChange={handleemail} ></FormInput>
          <FormInput placeholder="Username:" type="text" onChange={handleusername} ></FormInput>
          <FormInput placeholder="Password:" type={isprivacy?'password':'text'} onChange={handlepassword} style={{marginBottom:'24px'}}></FormInput>
          {isprivacy?<LockLocked onClick={()=>{change_privacy(isprivacy?false:true)}}></LockLocked>:undefined}
          {!isprivacy?<LockOpen onClick={()=>{change_privacy(isprivacy?false:true)}}></LockOpen>:undefined}
          <br></br>
          <div style={{height:'0px',backgroundColor:'transparent',width:width<=768 ? '70%':'60%',left:width<=768?'15%':'20%',position:'absolute',border:'1px dashed #1f1c1f'}}></div>
          <br></br>

          {width<=768?<br></br>:undefined}
          <SubmitButton onClick={APIRequestHandler}>Sign in</SubmitButton>
        </FormWrapper>
      </Form>
    </Wrapper>
  )
}
export default Signup