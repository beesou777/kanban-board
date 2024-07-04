import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <ul className="flex gap-4 bg-gray-900 text-white p-3 justify-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </>
  )
}

export default Navbar