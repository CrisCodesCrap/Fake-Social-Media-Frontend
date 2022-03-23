import {FaBars, FaSearch} from 'react-icons/fa';
import {ImCross} from 'react-icons/im';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import '../pages/styles/font_import.css';

export const FoundUserPic = styled.img`
  height: 30px;
  width:30px;
  margin-right: 5%;
  z-index: 1000000;
  border-radius:50%;
`

export const FoundMatchUser = styled.div`
display:flex;
cursor: pointer;
justify-content: start;
min-width:160px;
background:#3994FC;
position:relative;
height:20px;
padding: 15px;
align-items: center;
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
width:35%;
background: transparent;
display: grid;
justify-content: start;
position: absolute;
top: 120px;

color: #000913;
height: 35px;
z-index: 100000000;
`

export const UserInput = styled.input`
outline: none;
border: none;
text-align: start;
color: #000913;
width: 35%;
height: 20%;
border-radius:6px;
justify-content: center;
position: relative;
align-items:center;
`
export const Search = styled(FaSearch)`
width: 12%;
cursor: text;
color: #000913;
&.active {
    color: #000913;
    transition: all 0.2s ease-in-out;
    border-bottom: 2px solid #046EE9;
  }
  &.hover {
    color: #000913;
    transition: all 0.2s ease-in-out;
    border-bottom: 2px solid #046EE9;
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
width: 12%;
height: 15%;
cursor: pointer;
color: #000913;
&.active {
    color: #000913;
    transition: all 0.2s ease-in-out;
    border-bottom: 2px solid #046EE9;
  }
  &.hover {
    color: #000913;
    transition: all 0.2s ease-in-out;
    border-bottom: 2px solid #046EE9;
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

