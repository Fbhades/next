import { NextResponse } from "next/server";
import { selectUserByEmail , connect} from "@/app/models/users";

export const GET = async (request: Request) => {
    await connect();
    const email = request.url.split("/").pop();
    const users = await selectUserByEmail(email);
    return NextResponse.json(users, { status: 200 });
  }