import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import mongoConnect from "@lib/mongoConnect";
import { User } from "@models/User";
import { mailTransport } from "@helpers/nodemailer/nodemailer";
mongoConnect()
export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const reqBody = await req.json();
        const { username, email, password, confirmPassword, role } = reqBody;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        if (password !== confirmPassword) {
            return NextResponse.json({ success: false, message: "Password doesn't matched" }, { status: 200 })
        } else {
            const user = await User.findOne({ email });

            if (user) {
                return NextResponse.json({ success: false, message: "User already exists" }, { status: 200 })
            } else {
                const saveObj = {
                    username,
                    email,
                    password: hashedPassword,
                    isVerified: false,
                    isAdmin: role === 'admin' ? true : false,
                    verifyToken: '',
                    verifyTokenExpiry: '',
                    forgetPasswordToken: '',
                    forgetPasswordTokenExpiry: ''
                }
                const createUser = await User.create(saveObj);
                if (createUser.save()) {
                    let mailResponse = await mailTransport(createUser?.email,'verifyEmail');
                    return NextResponse.json({success:mailResponse?.success,message:mailResponse?.message},{status:200})
                }
            }
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}