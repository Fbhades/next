// app/api/products/[id].ts

import { NextResponse } from "next/server";
import { connect,selectAllProduits,selectProduitById,Product,createProduit,deleteProduitById ,updateProduitById} from "@/app/models/produits";
import { ObjectId } from "mongodb";

export const GET = async (request: Request) => {
  await connect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let result = id ? await selectProduitById(id) : await selectAllProduits();
  console.log(result);
  return NextResponse.json(result, { status: 200 });
};

export const POST = async (request: Request) => {
  await connect();
  const { code, codeABar, Désignation, Famille, Marque, prixAchatHT, MB, TVA, pventeTTC, pventePubHT } = await request.json();
  const newProduit: Product = { code, codeABar, Désignation, Famille, Marque, prixAchatHT, MB, TVA, pventeTTC, pventePubHT, dateCreation: new Date(), dateModification: new Date(), _id: new ObjectId().toString() };

  const result = await createProduit(newProduit);
  console.log(result);
  return NextResponse.json(result, { status: 201 });
};

export const DELETE = async (request: Request) => {
  await connect();
  const { searchParams } = new URL(request.url);
  const id  = searchParams.get("id");
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
export const PUT = async (request: Request) => {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
    }
  
    const updatedProduit = await request.json();
    try {
      const result = await updateProduitById(id, updatedProduit);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error updating product" }, { status: 500 });
    }
  };