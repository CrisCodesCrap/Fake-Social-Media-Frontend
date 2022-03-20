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
    cursor: pointer;
`
export const MessageWrapper = styled.div`
display: flex;
align-items: center;
margin: 50px;
` 
export const Messageslist = styled.ul`
   position: relative;
   height: 500px;
   min-width: 600px ;
   display: inline-block;
   overflow-y: scroll;
   list-style: none;
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
text-align: start;
justify-content: center;
max-width: 500px;
border-radius: 12px 12px 12px 12px;
background: #fff;
border: 0;
list-style: none;
padding: 8px;
align-items: center;
overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`