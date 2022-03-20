import styled from 'styled-components'
import {FaLock,FaLockOpen,FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const UserIconDark = styled(FaUser)`
    color: #7289DA;
    position: relative;
    margin-left:2%;
    transition: all 0.4s ease-in-out;
    &:hover{
        color: #7289DA;
        transition: all 0.4s ease-in-out;
    }
`
export const WrapperDark = styled.div`
    background:#646A75;
    height:100%;
    width:100%;
    position: absolute;
`
export const FormWrapperDark = styled.div`
    position: absolute;
    top:50%;
    left:65%;
    transform: translate(-50%,-50%);
    color: #18191B;
    background:#2F3136;
    width: 60%;
    height: 38em;
    text-align: center;
    border:none;
    display: inline-block;
    vertical-align: middle;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
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
export const FormDark = styled.form`
    position:absolute;
    top:57%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 66%;
    height: 36em;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    background: linear-gradient(-90deg,#3A59CB,#4D69D0, #5F79D5,#7289DA);
    background-size: 600% 600%;
    -webkit-animation: MorphGradient 20s ease infinite;
    -moz-animation: MorphGradient 20s ease infinite;
    animation: MorphGradient 20s ease infinite;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 768px) {
    width:100%;
    top:52%;
    transform: translate(-50%,-50%);
    }
    @media screen and (min-height: 600px) and (max-height: 654px) {
    width:100%;
    top:64%;
    transform: translate(-50%,-50%);
    }
    @media screen and (min-height: 655px) and (max-height: 667px) {
    width:100%;
    top:62%;
    transform: translate(-50%,-50%);
    }
    @media screen and (min-height: 668px) and (max-width: 1040px) and (max-height: 760px) {
    width:100%;
    top:57%;
    transform: translate(-50%,-50%);
    }
    @-webkit-keyframes MorphGradient {
    0%{background-position:0% 39%}
    50%{background-position:100% 62%}
    100%{background-position:0% 50%}
}
@-moz-keyframes MorphGradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes MorphGradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
`
export const FormInputDark = styled.input`
    height:22px;
    border:1px solid #646A75 !important;
    background: #646A75 !important;
    border-radius: 8px;
    color: #0E0E10 !important;
    width:50%;
    border:none;
    margin-top:24px;
    color:inherit;
    text-align:center;
    outline:none;
    @media screen and (max-width:768px) {
        height:25px;
        width:56%;
    }
    &::placeholder{
        color: #0E0E10 !important;
        opacity: 0.5;
        font-weight: 700;
    }
`
export const SubmitButtonDark = styled.div`
    height:8%;
    width:26%;
    padding:12px;
    background: #7289DA;
    border-radius: 8px;
    border: none;
    color:white;
    margin-left: 24%;
    font-weight: 750;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    transition: all 0.4s ease-in-out;
    font-family: sans-serif;
    cursor: pointer;
    &:hover{
        background: #5F79D5;
        transition: all 0.4s ease-in-out;
    }
    @media screen and (min-width: 768px) and (max-width: 900px) {
        height:7%;
        margin-left: 32%;
    }
    @media screen and (min-width: 901px){
        margin-left: 35%;
        height: 8%;
    }
    @media screen and (max-width: 768px) {
        width:50%;
        margin-left:5%;
    }
`
export const Lock_LockedDark = styled(FaLock)`
    background:transparent;
    color:#7289DA;
    position:absolute;
    margin-top: 28px;
    right:28%;
    cursor:pointer;
    &:hover{
        color: #5F79D5;
        transition: all 0.4s ease-in-out;
    }
    @media screen and (max-width:768px){
        margin-top: 30px;
        right:25%;
    }
`
export const Lock_OpenDark = styled(FaLockOpen)`
    background:transparent;
    color:#7289DA;
    position:absolute;
    margin-top: 28px;
    right:28%;
    cursor:pointer;
    &:hover{
        color: #5F79D5;
        transition: all 0.4s ease-in-out;
    }
    @media screen and (max-width:768px){
        margin-top: 30px;
        right:25%;
    }
`
export const ForgotPasswordSpnDark = styled(Link)`
    position:absolute;
    text-align: center;
    color:#A9AEB6;
    cursor:pointer;
    text-decoration: none;
    font-size:small;
    transition: all 0.4s ease-in-out;
    &:hover{
    color: #9AA0A9;
    transition: all 0.4s ease-in-out;
        }
    @media screen and (min-width: 769px) and (max-width: 820px) {
    left:19%;
    margin-top:3.5%;
    }
    @media screen and (min-width: 821px) and (max-width: 900px) {
    left:21%;
    margin-top:3%;
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
