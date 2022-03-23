import styled from 'styled-components'
import '../styles/font_import.css';
import {FaSmile} from 'react-icons/fa'

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
    border-radius:6px;
    width: 70%;
    text-align: center;
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
export const Messageslist = styled.ul`
   position: relative;
   height: 500px;
   min-width: 500px;
   max-width: 700px;
   overflow: hidden; 
   display: inline-block;
   overflow-y: scroll;
   list-style: none;
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
    z-index: 100000;
`
export const Message = styled.li`
min-height: auto;
min-width: auto;
max-width: 800px;
text-align: start;
justify-content: center;
max-width: 500px;
border-radius: 12px 12px 12px 12px;
background: transparent;
border: 0;
list-style: none;
padding: 8px;
align-items: center;
overflow-wrap: break-word;
word-wrap: break-word;
hyphens: auto;
`