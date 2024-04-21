import { NextRequest, NextResponse } from "next/server";
import jsonwebtoken from 'jsonwebtoken';
export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
       let token = req.cookies.get('token')?.value || "";
     if(token)
        {
            let decodedToken = jsonwebtoken.verify(token,process.env.JWT_SECRET!);
            if(decodedToken)
             {
                 return NextResponse.json({ success: true, data:decodedToken  }, { status: 200 })
             }else{
                 return NextResponse.json({ success: true, data:''}, { status: 200 })
             }
        }else{
            return NextResponse.json({ success: true, data:''}, { status: 200 }) 
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}