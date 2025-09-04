import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center">

        <span className="absolute inline-flex h-16 w-16 rounded-full bg-[#435f56] opacity-75 animate-ping"></span>

        <span className="absolute inline-flex h-12 w-12 rounded-full bg-[#435f56] opacity-75 animate-ping [animation-delay:400ms]"></span>

        <span className="absolute inline-flex h-20 w-20 rounded-full bg-[#435f56] opacity-75 animate-ping [animation-delay:600ms]"></span>
      </div>
    </div>
  )
}

export default Loader
