import React, { useState, useEffect } from 'react'
import { isAuthentication } from "../utils/auth"
import { logout } from "../services/auth"
import { toast } from 'react-toastify';

const Navigation: React.FC = () => {
  const [ isTokenValid, setIsTokenValid ] = useState(true)
  
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    let token = isAuthentication();
    setIsTokenValid(token);
  }, [])

  if (!isTokenValid) {
    toast.error('Token has expired, please log in again.');
    logout();
  }

  return (
    <header className='w-full px-[5%] bg-blue-dark'>
      <nav className='flex p-[20px]'>
        <a className='logo' href='/'>
          <h2 className='text-flicker icon-left text-[20px] font-bold text-iq-pramary'>MovieStream</h2>
        </a>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  )
}

export default Navigation