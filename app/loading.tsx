import React from 'react'
import Logo from '@/assets/logo-Icon.svg'
import Image from 'next/image'
const Loading = () => {
  return (
    <>
        <div className="flex items-center justify-center h-screen animate-pulse duration-700">
            <Image src={Logo} alt="logo" />
        </div>
    </>
  )
}

export default Loading
