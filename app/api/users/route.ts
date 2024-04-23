import { NextResponse } from "next/server";
import {
  connect,
  selectAllUsers,
  User
} from "@/app/models/users"; 

export const GET = async (request: Request) => {
    await connect();
    const users = await selectAllUsers();
    
    return NextResponse.json(users, { status: 200 });
  }

  export const POST = async (request: Request) => {
    await connect();
    try {
      const { name, email } = await request.json();
      await User.create({name,email});
      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
  };