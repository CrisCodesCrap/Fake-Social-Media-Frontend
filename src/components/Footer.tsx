import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FooterElement,Copyright} from './FooterElements'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <FooterElement><div style={{cursor:'pointer'}} onClick={()=>navigate('/')}>All rights reserved.<Copyright></Copyright></div></FooterElement>
  )
}

export default Footer