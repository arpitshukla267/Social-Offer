'use client'
import React from 'react'

function Header() {
  return (
    <div className="flex justify-between items-center px-12 py-6">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-gray-800">
        Social Offer<span className="text-pink-400">❤</span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-10 text-[15px] font-medium">
        <li className="hover:text-pink-500 duration-200 poppins-extralight-italic cursor-pointer">Search</li>
        <li className="hover:text-pink-500 duration-200 poppins-extralight-italic cursor-pointer">How It Works</li>
        <li className="hover:text-pink-500 duration-200 poppins-extralight-italic cursor-pointer">Pricing</li>
        <li className="hover:text-pink-500 duration-200 poppins-extralight-italic cursor-pointer">Login</li>
        <li className="hover:text-pink-500 duration-200 poppins-extralight-italic cursor-pointer">Join as Brand</li>
        <li className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text poppins-bold-italic text-transparent font-semibold cursor-pointer">
          Join as Creator
        </li>
      </ul>
    </div>
  )
}

export default Header
