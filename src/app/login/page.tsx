'use client';
import { updateHeaderData } from '@app/reducers/headerReducer';
import { TLogin } from '@validationSchema';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fromZodError } from 'zod-validation-error';
interface errorType {
  email?: string,
  password?: string
}
function Login() {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<errorType>({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validate = TLogin.safeParse(formData);
      if (!validate.success) {
          const zodErrors = fromZodError(validate?.error)?.details;
          let errObj = {};
          zodErrors.map((item) => {
              errObj = { ...errObj, [item?.path[0]]: item?.message }
          })
          setErrors(errObj);
      } else {
          let config = {
              method: 'post',
              url: `/api/login`,
              headers: {
                  'Content-Type': 'application/json'
              },
              data: JSON.stringify(formData)
          };

          startTransition(async () => {
              try {
                  let response: any = await axios.request(config);
                  console.log(response)
                  if (response?.data?.success) {
                    dispatch(updateHeaderData(true));
                    router.push('/');
                    
                      toast.success(response?.data?.message);
                      
                  } else {

                      toast?.error(response?.data?.message)
                  }
              } catch (error) {
                  console.error('Error:', error);
                  toast.error('An error occurred while processing your request.');
              } finally {
                  clearFields()

              }

          })
      }
  }
  const clearFields = () => {
      setFormData({ email: '', password: '' })
  }
  useEffect(() => {
      setErrors({});
  }, [formData])
  return (
     <div className='min-h-[89vh] flex justify-center items-center'>
    <div className='w-[500px] bg-emerald-500 flex p-4 rounded flex-col justify-center items-center'>
        <h3 className='text-4xl text-white mb-5'>Login your account!</h3>
    <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
       
        <div className='flex flex-col mb-2'>
        <label htmlFor='email' className='text-white mb-2' >Enter Email:</label>
        <input type='email' id='email' className='w-[350px] h-[35px] rounded outline-none px-2' placeholder='Email' onChange={(e)=>setFormData({ ...formData, email: e.target.value })} value={formData?.email}/>
        {errors?.email ? <p className='text-sm text-black mt-2'>{errors?.email}</p> : ''}
        </div>
        <div className='flex flex-col mb-2'>
        <label htmlFor='password' className='text-white mb-2' >Enter Password:</label>
        <input type='password' id='password' className='w-[350px] h-[35px] rounded outline-none px-2' placeholder='Password' onChange={(e)=>setFormData({ ...formData, password: e.target.value })} value={formData?.password}/>
        {errors?.password ? <p className='text-sm text-black mt-2'>{errors?.password}</p> : ''}
        </div>
      
        <button className='bg-rose-500 text-white hover:bg-rose-700 py-2 px-10 mb-2' disabled={isPending}>{isPending ? 'Processing' : 'Login'}</button>
        <p className='text-sm text-slate-300'>Don't have an account? <Link href={'/register'} className='text-rose-500 hover:underline'>Click here</Link></p>
        </form>
    </div>
</div>
  )
}

export default Login