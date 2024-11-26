import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <Link to="/seo">Home</Link>
        <Link to="/seo/about">About</Link>
        <Link to="/seo/contact-us">Contact Us</Link>
    </div>
  )
}
