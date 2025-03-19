import React, {useContext, useEffect, useState} from 'react'
import logo from "../assets/ultraResume-book.png";
import toure from "../assets/Toure.png"
import AuthContext  from '../context/AuthContext';
import axios from '../api/axios';
const Header = () => {
  const url = "/users"
  // getting the userId from AuthContext.
  const [user, setUser] = useState();
  const { userId } = useContext(AuthContext)

  useEffect(()=>{

    const fetchSpecificUser = async ()=>{
        try{
            const res = await axios.get(
              `${url}/${userId}`,
              {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
              }
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
    <div className='bg-white relative py-2 flex justify-between'>
      {/* Logo Section */}
      <div className="flex items-center justify-center ml-2">
            <img src={logo} alt="logoImage" className='w-[30px]'/>
            <div className="text-lg font-montserrat font-medium ml-2">ultraResume</div>
      </div>
      {/* User profile */}
      <div className="flex items-center justify-center rounded-4xl">
        <img src={user ? user.image : toure} alt="toureImage" className='w-[40px] rounded-3xl mr-1' />
      </div>
    </div>
  )
}

export default Header