'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

function VerifyToken() {
    const [message,setMessage] = useState(null);
useEffect(()=>{
   async function verifyUser()
   {
    const queryString = window.location.search;
    let verifyToken =  queryString.split('verifyToken')[1].split('=')[1];
    let response = await axios.post('/api/verifytoken',{verifyToken});
    console.log(response)
    setMessage(response?.data?.message);
   }
    verifyUser();
},[])
  return (
    <div className='min-h-[89vh] flex justify-center items-center '><div className='px-16 bg-emerald-500 text-white rounded text-center py-10 md:text-4xl s,:text-2xl flex items-center'><FaCheck className='mr-3 border  p-3 rounded-full  text-6xl'/> {message ? message : ''}</div></div>
  )
}

export default VerifyToken