import React from 'react'
import './Hero.scss';

const Hero = () => {
  return (
    
    <div className="hero-container">
      <div className="hero-content">
        <h4 className="hero-title">Welcome to collo blog</h4>
        <p className='hero-desc'>Always be updated so as to get every content in our blog</p>
        <div className="hero-sub">
        <input type='email' className='hero-email' placeholder='Enter your email' />
        <button className='hero-btn'>Subscribe</button>
      </div>
      <span>We care about your privacy policy</span>
      </div>
    </div>
  )
}

export default Hero