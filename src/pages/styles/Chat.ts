import styled from 'styled-components'
import '../styles/font_import.css';
import {FaSmile,FaUserPlus,FaEllipsisV,FaCommentMedical} from 'react-icons/fa'

export const SmileIcon = styled(FaSmile)`
    height:20px;
    width:20px;
    justify-content: center;
    position: relative;
    align-items: center;
    cursor: pointer;
    color: #1982FC;
    transition: all 0.4s ease-in-out; 
    &:hover{
        transition: all 0.4s ease-in-out; 
        color:#3994FC;
    }
`
export const Msginput = styled.input`
    outline: none;
    height: 30px;
    position:relative;
    border: none;
    border-radius:12px;
    width: 70%;
    border: 1px solid #1982FC;
    text-align: center;
    z-index: 100;
`
export const Sendbtn = styled.button`
    height: 40px;
    width: 80px;
    position:relative;
    border: none;
    background: #1982FC;
    color: #fff;
    font-weight: 600;
    border-radius:6px;
    outline: none;
    cursor: block;
    transition: all 0.4s ease-in-out; 
    &:hover{
        transition: all 0.4s ease-in-out; 
        background-color:#3994FC;
    }
`
export const MessageWrapper = styled.div`
display: flex;
align-items: center;
margin: 50px;
` 
export const ChatRoomHeader = styled.div`
    border: 1px solid #1982FC;
    user-select: none;
    width: 66%;
    background: #1982FC;
    color: #fff;
    display: inline-flex;
    text-align: center;
    align-items: center;
    padding: 1% 0 1% 0;
    height:50px;
    z-index: 1000;
    position: relative;
    border-radius: 6px 6px 0 0 ;
`
export const ChatRoomSettingsIcon = styled(FaEllipsisV)`
    height:20px;
    width:20px;
    cursor: pointer;
    float: right;
    margin-right: 5%;
    color: #fff;
    z-index: 999999999;
    outline: none;
`
export const CreateGroupIcon = styled(FaCommentMedical)`
    height:20px;
    outline: none;
    width:20px;
    cursor: pointer;
    float: right;
    margin-right: 5%;
    color: #fff;
`
export const CreateGroupButton = styled.button`
background: #3ABEFF;
margin-top: 6%;
font-size: medium;
font-weight: 600;
border: 1px solid #3ABEFF;
padding:1.5%;
border-radius: 12px;
color: #fff;
outline: none;
cursor: pointer;
transition: all 0.4s ease-in-out; 
&:hover{
    background: #fff;
    color: #3ABEFF;
    transition: all 0.4s ease-in-out; 
}
`
export const Messageslist = styled.ul`
   position: relative;
   border:1px solid #1982FC;
   margin: 0 0 12px 0;
   height: 400px;
   width:66%;
   overflow: hidden; 
   display: inline-block;
   overflow-y: scroll;
   list-style: none;
   z-index: 100000;
   border-radius:0px 0px 6px 6px;
   padding: 1% 0 1% 0;
    &::-webkit-scrollbar {
        width: 0.3em;
        overflow-y: hidden;
    }
   &::-webkit-scrollbar-thumb{
       background-color:#046EE9;
       border-radius: 16px;
       height:4px;
       transition: all 0.4s ease-in-out; 
   }
`
export const UserPic = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 100;
`
export const Message = styled.li`
min-height: auto;
min-width: auto;
text-align: start;
justify-content: center;
max-width: 500px;
border-radius: 22px;
background: transparent;
border: 0;
list-style: none;
padding: 10px;
align-items: center;
overflow-wrap: break-word;
word-wrap: break-word;
hyphens: auto;
`
