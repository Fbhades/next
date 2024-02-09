import { NextResponse } from "next/server";
import { connect, selectAllProduits, selectAllFamille } from "@/app/models/produits";

export const GET = async (request: Request) => {
  await connect();
  const [products, familleTypes] = await Promise.all([selectAllProduits(), selectAllFamille()]);
  return NextResponse.json({ products, familleTypes }, { status: 200 });
};

