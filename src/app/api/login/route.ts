import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import mongoConnect from "@lib/mongoConnect";
import { User } from "@models/User";
import jsonwebtoken from 'jsonwebtoken';
mongoConnect()
export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        const user = await User.findOne({email});
        let comparePassword = await bcryptjs.compare(password,user?.password);
        if(comparePassword)
            {
                const tokenInfo = {
                    id:user?._id,
                    email:user?.email,
                    username:user?.username,
                    isAdmin:user?.isAdmin,
                    isVerified:user?.isVerified
                }
                const token = jsonwebtoken.sign(tokenInfo,process.env.JWT_SECRET!,{expiresIn:'1d'});
                let response = NextResponse.json({success:true,message:'Login successfully!'},{status:200});
                response.cookies.set('token',token,{httpOnly:true});
                return response;
            }else{
                return NextResponse.json({ success: false, message: 'Password is incorrect' }, { status: 200 })
            }

    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 })
    }
}