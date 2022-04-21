import {FaSearch, FaUserPlus} from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import styled from 'styled-components'

export const Wrapper = styled.div`
height: 100%;
width: 100%;
display: flex;
justify-content: end;
align-items: start;
top: 50%;
left: 50%;
text-align: center;
clear: both;
position: fixed;
z-index: 999999;
transform: translate(-50%, -50%);
background: rgba(0, 0, 0, 0.75);
opacity: initial;
`
export const Header = styled.div`
height: 12%;
user-select: none;
display: flex;
justify-content: center;
align-items: center;
color: #fff;
z-index: 999999999;
position: relative;
background: #1982FC;
border:1px solid #1982FC;
border-radius: 12px 12px 0 0;
`
export const WindowWrapper = styled.div`
height: 70%;
background: #fff;
border-radius: 12px;
width: 25%;
position: absolute;
top: 50%;
outline: none;
padding: 0;
left: 50%;
transform: translate(-50%,-50%);

`
export const GroupCreateIcon = styled(FaUserPlus)`
height:20px;
width:20px;
margin-left: 1%;
color: #fff;
z-index: 999999999;
outline: none;
`
export const Exit = styled(ImCross)`
width: 30px;
height: 30px;
margin: 5%;
position: fixed;
justify-self: end;
cursor: pointer;
color: #fff;
`
export const WindowContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: start;
margin:5% 0 0 10%;
`
export const GroupInput = styled.input`
outline: none;
height: 30px;
margin-left: 2.5%;
border: none;
width: 65%;
`
export const WindowContentMini = styled.div`
width: 80%;
height: 50%;
border-radius: 12px 12px 6px 6px;
border: 1px solid #1982fc;
align-items: start;
margin:10% 0 0 10%;
`
export const Search = styled(FaSearch)`
width: 20px;
height: 20px;
margin-right: 5px;
cursor: text;
color: #000913;
`
export const Delete = styled(ImCross)`
width: 20px;
height: 20px;
margin-right: 5px;
cursor: pointer;
color: #000913;
`
export const FoundSearchUsers = styled.div`
display: flex;
height: 300px;
width: 100%;
flex-direction: column;
`
export const ConfirmButton = styled.button`
border-radius:20px;
margin: 10% 0 0 0;
font-weight: 700;
color: #1982fc;
cursor: pointer;
border: 1px solid #1982fc;
height: 40px;
width: 60%;
`
export const UserWrapper = styled.div`
height: 15%;
width: 100%;
text-align: left;
border-bottom:1px solid #1982fc;
overflow-wrap: break-word;
word-wrap: break-word;
hyphens: auto;
display: flex;
align-items: center;
cursor: pointer;
`
export const FoundUserPic = styled.img`
height: 1.5em;

width:1.5em;
margin: 0 5px 0 5px;
z-index: 1000000;
border-radius:50%;
`
export const CheckBox = styled.input`
position: relative;
width: 30px;
height: 30px;
color: #fff;
border: 1px solid grey;
border-radius: 12%;
appearance: none;
font-size: large;
outline: 0;
margin-right: 5%;
cursor: pointer;
z-index: 1000000;
transition: all 0.3s ease-in-out;
&:checked{
    transition: all 0.3s ease-in-out;
    font-size: larger;
    justify-content: center;
    display: flex;
    &::before{
        transition: all 0.3s ease-in-out;
        content: '✖';
        color: #1982fc;
  }
}
`
