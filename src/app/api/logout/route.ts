import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest, res: NextResponse) {
  try {
    let response = NextResponse.json(
      { success: true, message: "logout successfully" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: false,
      expires: Date.now(),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
