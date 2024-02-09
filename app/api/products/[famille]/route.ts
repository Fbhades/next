import { NextResponse } from "next/server";
import { connect, selectProduitsByFamille } from "@/app/models/produits";

export const GET = async (request: Request) => {
  await connect();
  const famille = request.url.split("/").pop();
  console.log("ID: ", famille); // log the ID
  if (famille) {
    let result = await selectProduitsByFamille(famille);
    console.log("Result: ", result); // log the result
    return NextResponse.json(result, { status: 200 });
  } else {
    return NextResponse.json({ error: "Parameter 'famille' is missing." }, { status: 400 });
  }
};