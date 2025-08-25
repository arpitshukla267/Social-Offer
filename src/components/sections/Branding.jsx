import React from 'react'

function Branding() {
  return (
    <div className='flex flex-col items-center mt-20 w-full'>
      <p className="text-lg text-gray-400">As seen in</p>
      <ul className='flex justify-around items-center text-gray-500 mt-8 w-full flex-wrap'>
        <li>BuzzFeed</li>
        <li>Bloomberg</li>
        <li>The New York Times</li>
        <li>Forbes</li>
        <li>Shopify</li>
      </ul>
    </div>
  )
}

export default Branding
