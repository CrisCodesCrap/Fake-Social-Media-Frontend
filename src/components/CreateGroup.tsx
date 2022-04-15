import { ReactElement, useEffect, useRef, useState } from 'react'
import {WindowWrapper,Header,Wrapper, GroupCreateIcon, Exit, WindowContent, GroupInput, WindowContentMini, Delete,Search, FoundSearchUsers, UserWrapper, FoundUserPic, CheckBox, ConfirmButton} from './CreateGroupElements'
import axios from 'axios'
const CreateGroup = (props:any):ReactElement => {
  const [groupName, setGroupName] = useState<string>(props.currentUser+'\'s group')
  const [currentUserSearch, updateSearch] = useState<string>("")
  const [showCross, setShowCross] = useState<boolean>(false)
  const [selectedUsers, updateSelectedUsers] = useState<string[]>([])
  const [searchResults, updateSearchResults] = useState<any[]>([])
  const input = useRef<any>(null)
  
  async function createGroupHandler() {
    if(selectedUsers.length === 0) return
    let groupMembers = [...selectedUsers,props.currentUser]
    let currentUserUrl = 'http://localhost:8000/create_group/'+props.currentUser
    await axios.post(currentUserUrl, {
      'groupName': groupName,
      'userCreator': props.currentUser,
      'groupMembers': groupMembers
    }).then(res => {
      console.log(res)
    })
  }
  function QueryUserHandler(e:any){
    updateSearch(e.target.value)
    axios.post('http://localhost:8000/query_users',{'username_fragment':currentUserSearch})
    .then(response => {
      updateSearchResults(response.data['found_users'])
    })
    .catch(error => {
      console.log(error)
    })
    currentUserSearch === '' && updateSearchResults([])
  }
  function selectUser(user:string){
    if(selectedUsers.includes(user)){
      updateSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))
      console.log(selectedUsers)
    }
    else{
      updateSelectedUsers([...selectedUsers, user])
      console.log(selectedUsers)
    }
  }
  function handleGroupNameChange(e:any) {
    e.preventDefault()
    setGroupName(e.target.value)
  }
  function clickDelete(){
    updateSearch('')
    updateSearchResults([])
    setShowCross(false)
  }
  useEffect(() => {
    function clickHandler(e:any) {
      if (e.target.id === 'search'||!input.current?.contains(e.target)) {
        setShowCross(false)
      }
    }
    window.addEventListener('click',clickHandler)
    return() => {
      window.removeEventListener('click',clickHandler)
    }
  },[showCross,setShowCross])
  useEffect(() => {
    props.currentUserChat.username !== '' && !props.currentUserChat.type && !selectedUsers.includes(props.currentUserChat.username) && updateSelectedUsers([...selectedUsers, props.currentUserChat.username])
  },[props.currentUserChat])
  return (
    <Wrapper>
        <Exit onClick={()=>props.updateShowCreateGroup(false)}></Exit>
        <WindowWrapper>
          <Header>
            Create a group
            <GroupCreateIcon></GroupCreateIcon>
          </Header>
          <WindowContent>
            <h4 style={{margin:'0'}}>
              Choose a group name:
            </h4> 
            <GroupInput 
              value={groupName} 
              onChange={handleGroupNameChange} 
              placeholder='Enter the name here'>
            </GroupInput>
          </WindowContent>
          <WindowContentMini>    
            <Header>Add users:</Header>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'46px',borderBottom:'1px solid #1982fc'}}>
              
              {!showCross&&
                <Search onClick={()=>setShowCross(true)} id={'search'}>
                </Search>
              }
                <GroupInput 
                  onChange={(e:any)=>QueryUserHandler(e)} 
                  onClick={()=>setShowCross(true)} 
                  value={currentUserSearch} 
                  ref={input} 
                  autoComplete="off" 
                  style={{width:'55%',margin:showCross?'0 0 0 25px':'0 25px 0 0'}} 
                  placeholder='Search for a user'>
                </GroupInput>
              
              {showCross&&
                <Delete onClick={clickDelete}>
                </Delete>
              }
            </div>
            <FoundSearchUsers>
              {
                selectedUsers.map(function(user:string){
                  return(
                    <UserWrapper onClick={()=>selectUser(user)} style={{background:'#1982fc'}} key={user+' Wrapper'}>
                      <FoundUserPic src={'https://avatars.dicebear.com/api/initials/:'+user+'.svg'}></FoundUserPic>
                      <div draggable={false} style={{display:'inline-block',margin:'0',padding:'0'}}>{user}</div>
                    </UserWrapper>
                  )
                })
              }
              {
                searchResults.map(function(user){
                  return(
                    props.currentUser !== user && !selectedUsers.includes(user)&&
                    <UserWrapper onClick={()=>selectUser(user)} key={user+' Wrapper'}>
                        <FoundUserPic
                          draggable={false}
                          src={'https://avatars.dicebear.com/api/initials/:'+user+'.svg'}>
                        </FoundUserPic>
                          <div draggable={false} style={{display:'inline-block',margin:'0',padding:'0'}}>{user}</div>
                    </UserWrapper>
                  )
                })
              }
            </FoundSearchUsers>
          </WindowContentMini>
          <ConfirmButton onClick={createGroupHandler} style={{color:selectedUsers.length===0?'#ACD2FE':'#fff',background:selectedUsers.length===0?'#fff':'#1982fc',cursor:selectedUsers.length===0?'not-allowed':'pointer'}}>
            Create
          </ConfirmButton>
        </WindowWrapper>
    </Wrapper>
  )
}
export default CreateGroup
