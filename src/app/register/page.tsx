'use client'
import Link from 'next/link'
import { FormEvent, useEffect, useState, useTransition } from 'react'
import { TRegister } from '@validationSchema'
import {  fromZodError } from 'zod-validation-error'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
interface errorType {
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}
function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', role: 'user' })
    const [errors, setErrors] = useState<errorType>({});
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validate = TRegister.safeParse(formData);
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
                url: `/api/registration`,
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
                        toast.success(response?.data?.message);
                        router.push('/login');
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
        setFormData({ username: '', email: '', password: '', confirmPassword: '', role: 'user' })
    }
    useEffect(() => {
        setErrors({});
    }, [formData])
    return (
        <div className='min-h-[89vh] flex justify-center items-center'>
            <div className='w-[500px] bg-emerald-500 flex p-4 rounded flex-col justify-center items-center'>
                <h3 className='text-4xl text-white mb-5'>Register your account!</h3>
                <form className='flex flex-col justify-center' onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='username' className='text-white mb-2' >Enter Username:</label>
                        <input type='text' value={formData.username} id='username' className='w-[350px] h-[35px] rounded outline-none px-2' placeholder='Username' onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        {errors?.username ? <p className='text-sm text-black mt-2'>{errors?.username}</p> : ''}
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='email' className='text-white mb-2' >Enter Email:</label>
                        <input type='email' value={formData.email} id='email' className='w-[350px] h-[35px] rounded outline-none px-2' placeholder='Email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        {errors?.email ? <p className='text-sm text-black mt-2'>{errors?.email}</p> : ''}
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='password' className='text-white mb-2' >Enter Password:</label>
                        <input value={formData.password} type='password' id='password' className='w-[350px] h-[35px] rounded outline-none px-2' placeholder='Password' onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        {errors?.password ? <p className='text-sm text-black mt-2'>{errors?.password}</p> : ''}
                    </div>
                    <div className='flex flex-col mb-5  '>
                        <label htmlFor='confirmPassword' className='text-white mb-2' >Confirm Password:</label>
                        <input type='password' value={formData.confirmPassword} id='confirmPassword' className='w-[350px] h-[35px] rounded outline-none px-2' placeholder='Confirm Password' onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                        {errors?.confirmPassword ? <p className='text-sm text-black mt-2'>{errors?.confirmPassword}</p> : ''}
                    </div>
                    <div className='flex flex-col mb-5  '>
                        <label htmlFor='role' className='text-white mb-2' >Select Role:</label>
                        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className='h-[35px] outline-none'>
                            <option value={'user'}>user</option>
                            <option value={'admin'}>admin</option>
                        </select>
                    </div>
                    <button className='bg-rose-500 text-white hover:bg-rose-700 py-2 px-10 mb-2' disabled={isPending}>{isPending ? 'Processing ' : 'Sign In'}</button>
                    <p className='text-sm text-slate-300'>Already have an account? <Link href={'/login'} className='text-rose-500 hover:underline'>Click here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register