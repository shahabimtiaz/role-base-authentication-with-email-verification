import {z} from 'zod';
export const TRegister =  z.object({
    username:z.string().min(3,'Username must be greater then 3 characters'),
    email:z.string().email('Please input a correct email'),
    password:z.string().min(6,'Password must be greater then 6 characters').refine((val)=> /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|{}\[\]:;"'<>?,./])(?=.*[a-zA-Z]).{6,25}$/.test(val),'Password must include uppercase letter, special character, be 6-25 characters.'),
    confirmPassword: z.string().min(6, 'Confirm Password must be greater than 6 characters')
}).refine((data)=>data?.password === data?.confirmPassword,{message:"Password doesn't matched",path: [
    "confirmPassword"
  ]})
export const TLogin = z.object({
    email:z.string().email('Please input a correct email'),
    password:z.string().min(6,'Password must be greater then 6 characters'),
})