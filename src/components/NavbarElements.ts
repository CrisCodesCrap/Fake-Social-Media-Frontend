import {FaBars,FaBell, FaSearch, FaCheck} from 'react-icons/fa';
import {ImCross} from 'react-icons/im';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import '../pages/styles/font_import.css';

export const Bell = styled(FaBell)`
  width: 25px;
  height: 25px;
  margin-left: 4px;
  margin-top: 5px;
  z-index: 10000000;
  position: relative;
  cursor: pointer;
  color:#000913;
`
export const BellDropDown = styled.div`
background: transparent;
margin-top: 25px;
box-shadow: -4px -3px 45px 21px rgba(0,0,0,0.35);
display: block;
right: 0;
color: #fff;
position:absolute;
min-width: 540px;
display: block;
z-index:1000000;
`
export const Notification = styled.div`
position:relative;
background:#1982fc;
min-height:40px;
width:100%;
transition: all 0.4s ease-in-out;
display:flex;
justify-content: space-between;
padding: 2px 8px 2px 8px;
align-items: center;
`
export const AcceptIcon = styled(FaCheck)`
  color:white;
  position:relative;
`
export const DeclineIcon = styled(ImCross)`
color:white;
position:relative;
`
export const FoundUserPic = styled.img`
  height: 30px;
  width:30px;
  margin-right: 15px;
  margin-left: 15px;
  z-index: 1000000;
  border-radius:50%;
`
export const SearchHeader = styled.div`
display:flex;
text-decoration: none;
text-align: center; 
cursor: pointer;
justify-content: start;
background:#3994FC;
position:relative;
height:19px;
align-items: center;
padding: 15px;
z-index: 100000000;
border-bottom: 1px solid white;
transition: all 0.2s ease-in-out;
color: white;

`

export const FoundMatchUser = styled(Link)`
display:flex;
text-decoration: none;
cursor: pointer;
justify-content: start;
background:#3994FC;
position:relative;
height:20px;
align-items: center;
padding: 15px;
z-index: 100000000;
transition: all 0.2s ease-in-out;
color: white;
&:hover{
  background:#0578FB;
  transition: all 0.2s ease-in-out;
  color:#000913;
};
`

export const UserList = styled.div`
    background: transparent;
    position: absolute;
    top: 120px;
    color: #000913;
    width: 180px;
    z-index: 100000000;
    border-radius: 6px;
`
export const DropdownContent = styled.div`
width:100%;
background: #1982fc;
height: 100px;
padding: 2px 8px 2px 8px;
border-radius: 0 0 2px 2px;
`
export const NotificationHeader = styled.div`
padding: 2px 8px 2px 8px;
background:#024A9B;
height: 40px;
border-radius: 2px 2px 0px 0px;
display: flex;
align-items: center;
justify-content: center;

color:#fff;
width: 100%;
`
export const UserInput = styled.input`
outline: none;
border: none;
text-align: start;
color: #000913;
width:160px;
height: 30px;
padding: 0;
border-radius:6px;
justify-content: center;
`
export const Search = styled(FaSearch)`
width: 20px;
height: 20px;
margin-right: 5px;
cursor: text;
color: #000913;
&.active {
    color: #000913;
    transition: all 0.2s ease-in-out;
  }
  &.hover {
    color: #000913;
    transition: all 0.2s ease-in-out;
  }
`

export const User_Icon = styled.img`
  min-width: 40px;
  border-radius:50%;
  margin-left: 8%;
  cursor: pointer;
`

export const Nav = styled.nav `
  height: 120px;
  user-select: none;
  display: flex;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 100;
  background: transparent !important;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
  @media screen and (max-width: 768px) {
    background: #1976d2;
  }
`;

export const NavBtnLeftMobile = styled(Link)`
  @media screen and (max-width: 768px) {
    z-index: 1000;
    height: 100%;
    align-items:center;
    font-size: 1.8em;
    color:#90CAF9 !important;
    &.active{
      color: white !important;
    }
    color: #6c757d;
    display: flex;
    align-items: center;
    font-weight: 900;
    justify-content: flex-start;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    text-shadow: 2px 2px 3px rgba(0,0,0,0.3);
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    &.active {
    color: #adb5bd;
    transition: all 0.4s ease-in-out;
    }
    &:hover{
    transition: all 0.4s ease-in-out;
    color: #adb5bd;
  }
}`;
  export const NavBtnLeft = styled(Link)`
  color: #000913;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: large;
  font-weight:500;
  font-stretch: none;
  text-decoration: none;
  padding: 0 1rem;
  height: 50%;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &.active {
    color: #000913;
    transition: all 0.2s ease-in-out;
    border-bottom: 2px solid #046EE9;
  }
  &:hover{
    transition: all 0.2s ease-in-out;
    color: #046EE9;
  }`;
export const NavBtnRight = styled(Link)`
  color: #000913;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: flex-end;
  text-decoration: none;
  padding: 0 1rem;
  height: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &.active {
    color: #000913;
    transition: all 0.2s ease-in-out;
    border-bottom: 2px solid #046EE9;
  }
  &:hover{
    transition: all 0.2s ease-in-out;
    color: #046EE9;
  }`;

export const Bars = styled(FaBars)`
  display: none;
  color: white !important;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 115%);
    font-size: 1.8rem;
    cursor: pointer;
    z-index: 1000;
}`;
export const CrossSearchUser = styled(ImCross)`
width: 20px;
height: 20px;
cursor: pointer;
color: #000913;
&.active {
    color: #000913;
    transition: all 0.2s ease-in-out;
  }
  &.hover {
    color: #000913;
    transition: all 0.2s ease-in-out;
  }
`
export const Cross = styled(ImCross)`
display: none;
color: white !important;
@media screen and (max-width: 768px) {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 115%);
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 1000;
}`;
export const MobileNavMenuButtonText = styled(Link)`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    min-width: 100%;
    color: white;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5%;
    color: #000913;
    transition: all 0.4s ease-in-out;
    width: 100%;
    height: 50px;
    text-decoration: none;
    text-shadow: 1px 2px 3px rgba(0,0,0,0.3);
    cursor: pointer;
    &.active{
      transition: all 0.4s ease-in-out;
      color: white;
    }
  };`
export const MobileNavMenuButtonSign = styled(Link)`
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 50px;
    background-color:#0d47a1;
    text-decoration: none;
    padding: 10px;
    color: #90CAF9;
    border-radius: 8px;
    margin-left: 3.5%;
    top: 0;
    translate: transform(0, 200);
    font-weight: 500;
    transition: all 0.4s ease-in-out;

    &.active{
      color: #fff;
      transition: all 0.4s ease-in-out;
    }
  }`
export const MobileNavMenu = styled.div`
    @media screen and (max-width: 768px) {
    display:block;
    position:absolute;
    height:200px;
    width:100%;
    border:none;
    background:#1976d2;
    margin-top: 4%;
    z-index:100;
    padding-top: 80px;
    transition: all 0.4s ease-in-out;
  };`
export const WrapperMobile = styled.div`
  @media screen and (max-width: 768px) {
  display:block;
  text-align: start;
  margin-top:6px;
  }
`
export const NavMenu = styled.div `
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }`;

export const NavBtn = styled.nav `
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: flex-end;
  margin-right: 18px;
  @media screen and (max-width: 768px) {
    display: none;
  }`;
  

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  white-space: nowrap;
  background: #3994FC;
  padding: 10px 22px;
  color: #fff;
  font-weight: 500;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.4s ease-in-out;
    background: #1982FC;
    color: #fff;
  }
  &.active{
    color: #fff;
    background: #1982FC;
  }
  `;

