import styled from 'styled-components'
import '../styles/font_import.css';

export const Username = styled.h1`
    margin-left: 5px;
    color: #562C2C;
    font-family: 'Roboto', sans-serif;
`
export const DescriptionInput = styled.input`
outline: none;
border: 1px solid #000;
border-radius:6px;
`
export const DescriptionSaveBtn = styled.button`
background: blue;
height:40px;
width:100px;
border: none;
border-radius:8px;
cursor: pointer;
color: white;
margin-top:10%;
font-weight: bolder;
`
export const AccountWrapper = styled.div`
    width: 20%;
    height: 70%;
    background-color: #fff;
    position: absolute;
    top:50%;
    left: 25%;
    transform: translate(-50%, -50%);
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius:12px;
    min-width:260px;
    @media screen and (max-width: 1024px) {
        left: 50%;
    }
`

export const PageWrapper = styled.div`
    width:90%;
    height:90%;
    position:absolute;
    background: #127475;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 8px;
`
export const UserPic = styled.img`
    margin-top: 5%;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    z-index: 100000;
`
export const Wrapper = styled.div`
    width:100%;
    height:100%;
    position:absolute;
    background: #0e9594;
    z-index: -2;
`
export const Msginput = styled.input`
    outline: none;
    height: 20px;
    position:absolute;
    top: 45%;
    left:50%;
    transform: translate(-50%,-50%);
    border: 1px solid black;
`
export const Sendbtn = styled.button`
    height: 40px;
    width: 80px;
    position:absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    border: 1px solid black;
`
export const Messageslist = styled.ul`
    height: 50px;
`
export const Message = styled.li`
height: 30px;
text-align: center;
justify-content: center;
width: 80px;
border-radius: 12px;
background: #fff;
border: 0;
list-style: none;
margin:90px;
`
