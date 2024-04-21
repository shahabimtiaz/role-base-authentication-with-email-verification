import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import mongoConnect from "@lib/mongoConnect";
import { User } from "@models/User";
mongoConnect()
export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const reqBody = await req.json();
        const { verifyToken } = reqBody;

        if(verifyToken)
            {
                let updatedData = await User.updateOne({verifyToken:verifyToken},{isVerified:true});
                if(updatedData?.acknowledged)
                    {
                        return NextResponse.json({success:true,message:'User is verified successfully!'},{status:200})
                    }else{
                        return NextResponse.json({success:true,message:'Some error is occured while verifying the user!'},{status:200})
                    }
            }
        
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}