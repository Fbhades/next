import { NextResponse } from "next/server";
import { connect, deleteCommand } from "@/app/models/command";

export const DELETE = async (request: Request) => {
    await connect();
    const { url } = request;
    const id = url.split("/").pop();
    if (!id) {
      return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
    }
    try {
        await deleteCommand(id);
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
      }
}