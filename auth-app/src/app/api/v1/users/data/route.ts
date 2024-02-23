import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await connect();
  try {
    const tokenData = getDataFromToken(request);

    const userData = await User.findById(tokenData.id).select('-password -__v');

    return NextResponse.json({ 
      ...userData._doc
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  }
}