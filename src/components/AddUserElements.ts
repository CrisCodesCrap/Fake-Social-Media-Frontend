import { ImCross } from "react-icons/im"
import styled from "styled-components"

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
export const Exit = styled(ImCross)`
width: 30px;
height: 30px;
margin: 5%;
position: fixed;
justify-self: end;
cursor: pointer;
color: #fff;
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