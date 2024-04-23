import { NextResponse } from "next/server";
import { connect, selectAllProduits, selectAllFamille , Produit } from "@/app/models/produits";

export const GET = async (request: Request) => {
  await connect();
  const [products, familleTypes] = await Promise.all([selectAllProduits(), selectAllFamille()]);
  return NextResponse.json({ products, familleTypes }, { status: 200 });
};

export const POST = async (request: Request) => {
  await connect();
  try {
    const {  code,codeABar,Désignation,Famille,Marque,prixAchatHT,MB,TVA,pventeTTC,pventePubHT,dateCreation,dateModification} = await request.json();
    Produit.create({code,codeABar,Désignation,Famille,Marque,prixAchatHT,MB,TVA,pventeTTC,pventePubHT,dateCreation,dateModification} );
    return NextResponse.json({ status: 201 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  await connect();
  const { id, code, codeABar, Désignation, Famille, Marque, prixAchatHT, MB, TVA, pventeTTC, pventePubHT } = await request.json();

  try {
    const updatedProduct = await Produit.findByIdAndUpdate(id, {
      Code: code,
      codeABar: codeABar,
      Désignation: Désignation,
      Famille: Famille,
      Marque: Marque,
      prixAchatHT: prixAchatHT,
      MB: MB,
      TVA: TVA,
      pventeTTC: pventeTTC,
      pventePubHT: pventePubHT
    }, { new: true }); 
    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json("done", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
};
