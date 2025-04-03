import React from 'react'

const Footer = () => {
  return (
    <footer className='text-xs mx-3 font-medium text-center'>
      <p>&copy; {new Date().getFullYear()} ultraResume. All rights reserved.</p>
    </footer>
  )
}

export default Footer