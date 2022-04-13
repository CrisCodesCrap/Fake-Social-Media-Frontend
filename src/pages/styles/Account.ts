import styled from 'styled-components'
import '../styles/font_import.css';

export const Username = styled.h1`
    margin-left: 5px;
    color: #000913;
    font-family: 'Roboto', sans-serif;
`
export const AcceptRequestBtn = styled.button`
border: 1px solid #1982FC;
margin-top: 25px;
background: #1982FC;
color: #fff ;
height:8%;
min-width:50px;
border-radius:12px 0 0 12px;
cursor: pointer ;
padding: 1px;
transition: all 0.4s ease-in-out;
&:hover{
    transition: all 0.4s ease-in-out;
    background: #fff;
    color: #1982FC;
    border-radius: 0;
}
`
export const DeclineRequestBtn = styled.button`
border: 1px solid #1982FC;
margin-top: 25px;
background: #1982FC ;
color: #fff ;
height:8%;
min-width:50px;
border-radius:0 12px 12px 0;
cursor: pointer ;
padding: 1px;
transition: all 0.4s ease-in-out;
&:hover{
    transition: all 0.4s ease-in-out;
    background: #fff;
    color: #1982FC;
    border-radius: 0;
}
`
export const SendFriendRequestBtn = styled.button`
border: 1px solid #1982FC;
margin-top: 25px;
background: #1982FC ;
color: #fff ;
height:8%;
min-width:100px;
border-radius:12px;
cursor: pointer ;
padding: 1px;
transition: all 0.4s ease-in-out;
&:hover{
    transition: all 0.4s ease-in-out;
    background: #fff;
    color: #1982FC;
}
`
export const ClickedRequestButton = styled.button`
border: 1px solid #1982FC;
margin-top: 25px;
background: #fff;
    color: #1982fc ;
height:8%;
min-width:100px;
border-radius:12px;
cursor: pointer ;
padding: 1px;
transition: all 0.4s ease-in-out;
&:hover{
    transition: all 0.4s ease-in-out;
    background: #fff;
    color: #1982FC;
}
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
    padding: 10px;
    height: 60%;
    width: 20%;
    background-color: #fff;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius:12px;
    min-width:260px;
`

export const PageWrapper = styled.div`
    width:90%;
    height:90%;
    background: #046EE9;
    z-index: -1;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`
export const UserPic = styled.img`
    margin-top: 5%;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    z-index: 100000;
`
export const Wrapper = styled.div`
    width: 100%;
    height: 800px;
    user-select: none;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #fff;
    display: flex;
    z-index: 2;
    
`
