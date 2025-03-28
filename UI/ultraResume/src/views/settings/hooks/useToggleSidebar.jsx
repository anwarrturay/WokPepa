import React from 'react'
import useAuth from '../../../hooks/useAuth';
const useToggleSidebar = () => {
    const {isOpen, setIsOpen} = useAuth();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
  return toggleSidebar;
}

export default useToggleSidebar