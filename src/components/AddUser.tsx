import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import {Wrapper, Exit, WindowWrapper, Header} from './AddUserElements'
import { ConfirmButton, Delete, FoundSearchUsers, FoundUserPic, GroupInput, Search, UserWrapper, WindowContentMini } from './CreateGroupElements'

const AddUser = ({updateShowAddUser, updateCurrentUserChat,currentUser,currentUserChat}:any) => {
    const [currentUserSearch, updateSearch] = useState<string>("")
    const [showCross, setShowCross] = useState<boolean>(false)
    const [selectedUsers, updateSelectedUsers] = useState<string[]>([])
    const [searchResults, updateSearchResults] = useState<any[]>([])
    const input = useRef<any>(null)
    function AddUserHandler() {
        const addUserUrl = 'http://localhost:8000/addUserToGroup/'+currentUser
        axios.post(addUserUrl,{'username':currentUser,'room':currentUserChat.room,'usersToAdd':selectedUsers}).then(async response => {
        await axios.post('http://127.0.0.1:4000/send_msg',response.data)
    })
    updateCurrentUserChat(
      {username:currentUserChat.username,
        room:currentUserChat.room,
        type:currentUserChat.type,
        admin:currentUserChat.admin,
        isCreator:currentUserChat.isCreator,
        created:currentUserChat.created,
        participants:[...currentUserChat.participants, ...selectedUsers]
      })
    updateShowAddUser(false)
    updateSelectedUsers([])
    updateSearchResults([])
    }
    function QueryUserHandler(e:any){
      e.preventDefault()
      updateSearch(e.target.value)
        axios.post('http://localhost:8000/query_users',{'username_fragment':currentUserSearch})
        .then(response => {
          updateSearchResults(response.data['found_users'])
        })
        .catch(error => {
          console.error(error)
        })
        currentUserSearch === '' && updateSearchResults([])
      }
    function selectUser(user:string){
        if(selectedUsers.includes(user)){
          updateSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))
        }
        else{
          updateSelectedUsers([...selectedUsers, user])
        }
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
    return (
    <Wrapper>
        <Exit onClick={()=>updateShowAddUser(false)}></Exit>
        <WindowWrapper>
            <Header>Add users.</Header>
            <WindowContentMini style={{marginTop:'10%'}}>    
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
                    if(!currentUserChat.participants.includes(user)){
                        return(
                    <UserWrapper onClick={()=>selectUser(user)} style={{background:'#1982fc'}} key={user+' Wrapper'}>
                      <FoundUserPic src={'https://avatars.dicebear.com/api/initials/:'+user+'.svg'}></FoundUserPic>
                      <div draggable={false} style={{display:'inline-block',margin:'0',padding:'0'}}>{user}</div>
                    </UserWrapper>
                  )
                }
                })
              }
              {
                searchResults.map(function(user){
                    if(!currentUserChat.participants.includes(user)){
                        return(
                        currentUser !== user && !selectedUsers.includes(user)&&
                    <UserWrapper onClick={()=>selectUser(user)} key={user+' Wrapper'}>
                        <FoundUserPic
                          draggable={false}
                          src={'https://avatars.dicebear.com/api/initials/:'+user+'.svg'}>
                        </FoundUserPic>
                          <div draggable={false} style={{display:'inline-block',margin:'0',padding:'0'}}>{user}</div>
                    </UserWrapper>
                  )
                }else updateSearchResults(selectedUsers.filter(element=>element !== user))
                })
              }
            <div style={{display:'flex',justifyContent:'center',color:'gray',marginTop:'3%',alignItems:'center',fontWeight:'300'}}>
                {searchResults.length === 0 && currentUserSearch !== '' && 'No users found.'}
            </div>
            </FoundSearchUsers>
          </WindowContentMini>
          <ConfirmButton onClick={()=>AddUserHandler()} style={{color:selectedUsers.length===0?'#ACD2FE':'#fff',background:selectedUsers.length===0?'#fff':'#1982fc',cursor:selectedUsers.length===0?'not-allowed':'pointer'}}>
            {selectedUsers.length===0?'You haven\'t selected any users':'Add the selected'}
          </ConfirmButton>
        </WindowWrapper>
    </Wrapper>
  )
}

export default AddUser

