import styled from 'styled-components'
import {FaLock,FaLockOpen,FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const UserIcon = styled(FaUser)`
    color: #000913;
    position: relative;
    margin-left:2%;
    transition: all 0.4s ease-in-out;
    &:hover{
        color: #0248A2;
        transition: all 0.4s ease-in-out;
    }
`

export const Wrapper = styled.div`
    background:#CDE4FE;
    height: 48em;
    width:100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const FormWrapper = styled.div`
    color: #1f1c1f;
    background:#fff;
    margin-right: 5%;
    width: 60%;
    height: 36em;
    text-align: center;
    border:none;
    display: inline-block;
    justify-content: center;
    border-radius: 8px;
    @media screen and (max-width:768px){
        width:80%;
        margin-right: 10%;
    }
    
`
export const Form = styled.form`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 60%;
    height: 42em;
    background: #1982FC;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width:768px){
        width:100%;
    }
`
export const FormInput = styled.input`
    height:22px;
    border:1px solid #000913 !important;
    border-radius: 8px;
    width:50%;
    border:none;
    margin-top:24px;
    color:inherit;
    text-align:center;
    outline: none;
    @media screen and (max-width:768px) {
        height:25px;
        width:56%;
    }
`
export const SubmitButton = styled.div`
    width:50%;
    background: #1982FC;
    border-radius: 8px;
    padding: 8px 0 8px 0px;
    margin-top: 2%;
    border: none;
    color:white;
    text-align:center;
    justify-content: center;
    margin-left: 25%;
    align-items: center;
    font-weight: 750;
    transition: all 0.4s ease-in-out;
    font-family: sans-serif;
    cursor: pointer;
    &:hover{
        background: #3994FC;
        transition: all 0.4s ease-in-out;
    }
`
export const Lock_Locked = styled(FaLock)`
    background:transparent;
    color:#000913;
    margin-top:29.5px;
    position: absolute;
    transform: translate(-20px,0);
    cursor:pointer;
    &:hover{
        color: #0248A2;
        transition: all 0.4s ease-in-out;
    }
`
export const Lock_Open = styled(FaLockOpen)`
    background:transparent;
    color:#000913;
    margin-top:29.5px;
    position: absolute;
    transform: translate(-20px,0);
    cursor:pointer;
    &:hover{
        color: #0248A2;
        transition: all 0.4s ease-in-out;
    }
`
export const ForgotPasswordSpn = styled(Link)`
    text-align: center;
    color:#40444B;
    cursor:pointer;
    text-decoration: none;
    font-size:small;
    transition: all 0.4s ease-in-out;
    &:hover{
    color: #212529;
    transition: all 0.4s ease-in-out;
        }
`
