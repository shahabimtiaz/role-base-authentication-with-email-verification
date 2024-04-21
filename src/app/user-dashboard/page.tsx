'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
interface UserData {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
  isVerified:boolean;
}
function UserDashboard() {
  const [userData,setUserData] = useState<UserData>({ id: '', email: '', username: '', isAdmin: false, iat: 0, exp: 0,isVerified:false });
useEffect(()=>{
async function getUser(){
let response = await axios.get('/api/user');
if(response)
  {
    setUserData(response?.data?.data)
    console.log(response)
  }
}
getUser()
},[])
  return (
    <div className='min-h-[89vh] flex justify-center items-center'><div className='w-[600px] p-5 bg-emerald-500 rounded'>
      <h3 className='text-white text-center md:text-4xl sm:text-2xl md:mb-10 sm:mb-5 '>User Details</h3>
      <div className='flex uppercase justify-between text-white'>
        <p>Name:</p>
        <p>{userData?.username}</p>
      </div>
      <div className='flex uppercase justify-between text-white'>
        <p>Email:</p>
        <p>{userData?.email}</p>
      </div>
      <div className='flex uppercase justify-between text-white'>
        <p>is Admin:</p>
        <p>{userData?.isAdmin ? 'yes': 'no'}</p>
      </div>
      <div className='flex uppercase justify-between text-white'>
        <p>Verified user:</p>
        <p>{userData?.isVerified ? 'Yes' : 'no'}</p>
      </div>  
   </div></div>
  )
}

export default UserDashboard