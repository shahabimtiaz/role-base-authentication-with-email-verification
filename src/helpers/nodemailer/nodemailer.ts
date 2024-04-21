import mongoConnect from '@lib/mongoConnect';
import { User } from '@models/User';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
mongoConnect()
export async function mailTransport(email:string,option:string)
{
    
    let user = await User.findOne({email}).select('-password');
    let responseObj = {
        success:false,
        message:''
    }
   try {
    if(user)
        {
            
            const verifyToken = await bcryptjs.hash(user?._id.toString(),10);
            
            
                    var transport = nodemailer.createTransport({
                        host: "sandbox.smtp.mailtrap.io",
                        port: 2525,
                        auth: {
                          user: process.env.NODEMAILER_USER,
                          pass: process.env.NODEMAILER_PASS
                        }
                      });
                  const mail = await transport.sendMail({
                        from: `NextJS fullstack authentication" <testing@nextjs.email>`, 
                        to: email, 
                        subject: option === 'forgetPass' ? 'Reset Password': 'Email Verification', 
                        text: "",
                        html: `
                        <h5>${option === 'forgetPass' ? 'Click on the link to go to forget password page' : 'Click on the link to verify email'}<h5>
                        <a href="${process.env.DOMAIN}/api/verifytoken?token=${verifyToken}">Click here</a>
                        
                        `,
                      });
                  
                    if(mail)
                        {
                            let updateObj = option === 'forgetPass' ? {
                                forgetPasswordToken:verifyToken,
                                forgetPasswordTokenExpiry:Date.now()
                            }: {
                                verifyToken:verifyToken,
                                verifyTokenExpiry:Date.now()
                            }
                           let updateFlag = await User.updateOne({email},updateObj)
                          if(updateFlag?.acknowledged)
                            {
                               console.log(updateFlag);
                                return responseObj = {
                                    success:true,
                                    message:'Please verify your email!'
                                }
                            }else{
                                return responseObj = {
                                    success:false,
                                    message:'There is a error while creating user'
                                }  
                            }
                            
                        }
             

        }else{
            return responseObj = {
                success:false,
                message:'There might be an issue in database please try again!'
            }
        }  
   } catch (error) {
    return responseObj = {
        success:false,
        message:'Server error'
    }
   }
        }
