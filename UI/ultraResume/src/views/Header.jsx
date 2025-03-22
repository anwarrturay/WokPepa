import React, { useEffect, useState} from 'react'
import logo from "../assets/ultraResume-book.png";
import toure from "../assets/Toure.png"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { Search } from 'lucide-react';
const Header = () => {
  const [user, setUser] = useState();
  const url = "/users"
  const imageURL = "http://localhost:3500"
  // getting the userId from AuthContext.
  const { auth } = useAuth();
  const userId = auth?.userId
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController()

  useEffect(()=>{

    const fetchSpecificUser = async ()=>{
        try{
            const res = await axiosPrivate.get(
              `${url}/${userId}`,
              {signal: controller.signal},
            )
            console.log(res.data);
            setUser(res.data)
        }catch(error){
          console.error("Error fetching user data:", error);
        }
    }
    fetchSpecificUser();
    
  }, [userId])

  return (
    <div className='bg-white relative w-[340px] xs:w-full sm:w-full md:w-full xl:w-full left-0 right-0 py-2 flex justify-between'>
      {/* Logo Section */}
      <div className="flex items-center justify-center ml-2">
            <img src={logo} alt="logoImage" className='w-[30px]'/>
            <div className="text-lg font-montserrat font-medium ml-2">ultraResume</div>
      </div>
      {/* User profile */}
      <div className="flex items-center justify-center rounded-4xl">
        <img src={user && `${imageURL}${user.image}`} alt="toureImage" className='w-[40px] h-[40px] rounded-full m-2 ' />
      </div>
    </div>
  )
}

export default Header