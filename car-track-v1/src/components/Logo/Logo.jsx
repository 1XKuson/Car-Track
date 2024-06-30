import React from 'react'
import Logo1 from '../../Icon/logo1.jpg'
import Logo2 from '../../Icon/logo2.jpg'
import Logo3 from '../../Icon/logo3.jpg'
import Logo4 from '../../Icon/logo4.jpg'
import Logo5 from '../../Icon/logo5.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='logoComponent'>
      <img src={Logo1} alt="" />
      <img src={Logo2} alt="" />
      <img src={Logo3} alt="" />
      <img src={Logo4} alt="" />
      <img src={Logo5} alt="" />
    </div>
  )
}

export default Logo
