import styled from 'styled-components'
import '../styles/font_import.css';

export const Username = styled.h1`
    margin-left: 5px;
    color: #000913;
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
    padding: 10px;
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
    background: #046EE9;
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
    background: #fff;
    z-index: -2;
    
`
