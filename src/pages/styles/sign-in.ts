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
    background:#046EE9;
    height:100%;
    width:100%;
    position: absolute;
`
export const FormWrapper = styled.div`
    position: absolute;
    top:50%;
    left:65%;
    transform: translate(-50%,-50%);
    color: #1f1c1f;
    background:#fff;
    width: 60%;
    height: 38em;
    text-align: center;
    border:none;
    display: inline-block;
    vertical-align: middle;
    justify-content: center;
    
    border-radius: 8px;
    @media screen and (max-width: 768px) {
        top: 50%;
        width: 85%;
        left: 50%;
    }
    @media screen and (min-width: 769px) and (max-width: 1040px) {
        width: 50%;
        top: 50%;
        left: 50%;
    }
    @media screen and (min-width: 1180px){
        width: 55%;
        top: 50%;
        left: 65%;
    }
`
export const Form = styled.form`
    position:absolute;
    top:57%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 66%;
    height: 36em;
    background: #0353AE;
    transition: all 0.4s ease-in-out;
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
    width:25%;
    background: #1982FC;
    border-radius: 8px;
    padding:8px;
    border: none;
    color:white;
    margin-left: 25%;
    text-align:center;
    justify-content: center;
    align-items: center;
    font-weight: 750;
    transition: all 0.4s ease-in-out;
    font-family: sans-serif;
    cursor: pointer;
    &:hover{
        background: #3994FC;
        transition: all 0.4s ease-in-out;
    }
    @media screen and (min-width: 768px) and (max-width: 900px) {
        margin-left: 32%;
    }
    @media screen and (min-width: 901px){
        margin-left: 35%;
    }
    @media screen and (max-width: 768px) {
        width:50%;
    }
`
export const Lock_Locked = styled(FaLock)`
    background:transparent;
    color:#000913;
    position:absolute;
    margin-top: 28px;
    right:28%;
    cursor:pointer;
    &:hover{
        color: #0248A2;
        transition: all 0.4s ease-in-out;
    }
    @media screen and (max-width:768px){
        margin-top: 30px;
        right:25%;
    }
`
export const Lock_Open = styled(FaLockOpen)`
    background:transparent;
    color:#000913;
    position:absolute;
    margin-top: 28px;
    right:28%;
    cursor:pointer;
    &:hover{
        color: #0248A2;
        transition: all 0.4s ease-in-out;
    }
    @media screen and (max-width:768px){
        margin-top: 30px;
        right:25%;
    }
`
export const ForgotPasswordSpn = styled(Link)`
    position:absolute;
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
    @media screen and (min-width: 769px) and (max-width: 820px) {
    position:absolute;
    left:19%;
    text-align: center;
    margin-top:3.5%;
    color:#adb5bd;
    cursor:pointer;
    font-size:small;
    transition: all 0.4s ease-in-out;
    &:hover{
    color: #ced4da;
    transition: all 0.4s ease-in-out;
        }
    }
    @media screen and (min-width: 821px) and (max-width: 900px) {
    position:absolute;
    left:21%;
    text-align: center;
    margin-top:3%;
    color:#adb5bd;
    cursor:pointer;
    font-size:small;
    transition: all 0.4s ease-in-out;
    &:hover{
    color: #ced4da;
    transition: all 0.4s ease-in-out;
        }
    }
    @media screen and (min-width: 901px) and (max-width: 1024px) {
    left:24%;
    margin-top:3.5%;
    }
    @media screen and (min-width: 1024px) and (max-width: 1120px){
    left:22%;
    margin-top:3.5%;
    }
    @media screen and (min-width: 1120px) and (max-width: 1280px){
    left:22%;
    margin-top:4%;
    }
    @media screen and (min-width: 1280px){
    left:26%;
    margin-top:3%;
    }
    @media screen and (max-width:768px) {
    position:relative;
    margin-bottom: 10px;
    bottom: 1.5%;
    }
    @media screen and (width:769px){
        left:20%;
        margin-top:2.5%;
    }
`
