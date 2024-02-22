import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists." }, { status: 400, statusText: "User already exists." })
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({ username, email, password: hashedPassword });

    return NextResponse.json({
      message: "user created successfully"
    }, {
      status: 201,
      statusText: "User created successfully"
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}