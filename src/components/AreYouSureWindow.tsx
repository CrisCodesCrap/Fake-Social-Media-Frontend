import axios from 'axios'
import { LeaveButton } from '../pages/styles/Chat'
import { Exit, Header, WindowWrapper, Wrapper } from './CreateGroupElements'

const AreYouSureWindow = ({updateShowSure, current_user,current_user_chat,update_current_user_chat,isLeaving}:any) => {
    function noHandler(){
        updateShowSure(false)
    }
    async function confirmHandler(){
    const deleteGroupUrl = 'http://localhost:8000/groups/delete/' + current_user
    updateShowSure(true)
    await axios.post(deleteGroupUrl,{'username':current_user,'room':current_user_chat.room,'isCreator':current_user_chat.isCreator})
    .then(res => {
      update_current_user_chat({username:'',room:0,type:undefined,isCreator:false,participants:[],created:0})
    })
    updateShowSure(false)    
}
    async function confirmLeavingHandler(){
        const groupLeaveUrl = 'http://localhost:8000/leaveGroup/'+current_user
        await axios.post(groupLeaveUrl,{'username':current_user,'room':current_user_chat.room,'isAdmin':current_user_chat.isCreator})
        .then(response => {
          update_current_user_chat({username:'',room:0,type:undefined,isCreator:false,participants:[],created:0})
          axios.post('http://127.0.0.1:4000/send_msg',response.data)
        })
        updateShowSure(false)
    }
    return (
    <Wrapper>
        <Exit onClick={()=>updateShowSure(false)}></Exit>
        <WindowWrapper style={{color:'#1982fc'}}>
            <Header>Are you sure?</Header>
            {isLeaving?
                <h3>You are the last person in the group, by leaving you are deleting it!</h3>
            :
                <h3>Are you sure you want to delete this group?</h3>
            }
            <h4>All the messages will be lost..</h4>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'46px'}}>
                <LeaveButton onClick={()=>isLeaving?confirmLeavingHandler():confirmHandler()} style={{background:'#fff',border:'1px solid #1982fc',color:'#1982fc',padding:'6px 20px 6px 20px'}}>
                    Yes.
                </LeaveButton>
                <LeaveButton onClick={()=>noHandler()} style={{padding:'6px 20px 6px 20px'}}>
                    No.
                </LeaveButton>
            </div>
        </WindowWrapper>
    </Wrapper>
  )
}

export default AreYouSureWindow