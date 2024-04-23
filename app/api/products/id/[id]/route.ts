import { NextResponse } from "next/server";
import { connect, selectProduitById,selectAllProduits, deleteProduitById, Produit } from "@/app/models/produits";

export const GET = async (request: Request) => {
    await connect();
    const id = request.url.split("/").pop();
    console.log("ID: ", id); // log the ID
    let result = id ? await selectProduitById(id) : await selectAllProduits();
    console.log("Result: ", result); // log the result
    return NextResponse.json(result, { status: 200 });
  };

export const DELETE = async (request: Request) => {
  await connect();
  const { url } = request;
  const id = url.split("/").pop();
  if (!id) {
    return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
  }

  try {
    await deleteProduitById(id);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
};

