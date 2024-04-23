import { NextResponse } from "next/server";
import { connect ,addCommand,getAllCommands} from "@/app/models/command";

export const GET = async (request: Request) => {
    await connect();
    const command = await getAllCommands();
    return NextResponse.json(command, { status: 200 });
  }

  export const POST = async (request: Request) => {
    await connect();
    const reqBody = await request.json();
    const { email, products } = reqBody;
    console.log(email,products);
    try {
        const addedCommand = await addCommand(email, products);
        return NextResponse.json(addedCommand, { status: 201 });
      } catch (error) {
        console.error('Error adding command:', error);
        return NextResponse.json({ message: 'Error adding command' }, { status: 500 });
      }
  };