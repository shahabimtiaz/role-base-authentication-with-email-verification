'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {  useDispatch, useSelector } from "react-redux";
import { updateHeaderData } from "@app/reducers/headerReducer";
interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
  isVerified:boolean
}
function Header() {
  const [userData, setUserData] = useState<User>({ id: '', email: '', username: '', isAdmin: false, iat: 0, exp: 0,isVerified:false })
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const headerData = useSelector((state:any) => state.header.data);
  function Loading() {
    return <div className="h-screen z-50 flex justify-center items-center">loading...</div>
  }
  async function getUserData() {
    try {
      let response = await axios.get('/api/user');
      setUserData(response?.data?.data);
     
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false)
    }

  }
  useEffect(() => {
    getUserData();
    
  }, [userData,headerData])
  async function handleLogout() {
    setLoading(true);
    try {
      

      setUserData({ id: '', email: '', username: '', isAdmin: false, iat: 0, exp: 0,isVerified:false })
      await axios.post('/api/logout');
      let result = await dispatch(updateHeaderData(false))
        if(result)
          {
            setLoading(false)
            router.push('/');
          }
        
         
        

      
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
    } finally {
      
    }
  }
  return (
    loading ? <Loading /> : <header className='bg-rose-500 p-5 flex items-center justify-between md:flex-row sm:flex-col lg:flex-row xl:flex-row 2xl:flex-row flex-col'>
      <ul className='flex w-[300px] justify-between text-white'>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/user-dashboard'}>User Profile</Link></li>
        <li><Link href={'/admin-dashboard'}>Admin Profile</Link></li>

      </ul>


      {userData?.id ? <button className='bg-emerald-500 py-2 px-10 text-white hover:bg-emerald-700' onClick={handleLogout} >{'Logout'}</button> : <div className='flex justify-between w-[280px]'><Link className='bg-emerald-500 py-2 px-10 text-white hover:bg-emerald-700' href={'/login'} >Login</Link>
        <Link className='bg-emerald-500 py-2 px-10 text-white hover:bg-emerald-700' href={'/register'}>Register</Link></div>}


    </header>
  )
}

export default Header