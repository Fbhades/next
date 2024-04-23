import mongoose, { Schema, model, models } from "mongoose"; 

export interface Product {
  _id:  string;
  Code: number;
  codeABar: number;
  Désignation: string;
  Famille: string;
  Marque: string;
  prixAchatHT: number;
  MB: number;
  TVA: number;
  pventeTTC: number;
  pventePubHT: number;
  dateCreation: Date;
  dateModification: Date;
}

const produitSchema = new Schema({
  code: Number,
  codeABar: Number,
  Désignation: String,
  Famille: String,
  Marque: String,
  prixAchatHT: Number,
  MB: Number,
  TVA: Number,
  pventeTTC: Number,
  pventePubHT: Number,
  dateCreation: Date,
  dateModification: Date,
});

const Produit = models.product || model("product", produitSchema);

async function connect() {
  await mongoose.connect(
    "mongodb+srv://fbmoddy:Fblux@cluster0.tmxybv9.mongodb.net/ecom?retryWrites=true&w=majority",
    {}
  );
}

function createProduit(produit: Product) {
  const newProduit = new Produit(produit);
  return Produit.create(newProduit);
}

function deleteProduitById(_id: string) {
  return Produit.findByIdAndDelete(_id);
}

function updateProduitById(_id: string, produit: Product) {
  return Produit.findByIdAndUpdate(_id, produit, { new: true });
}

async function selectAllProduits() {
  let result = await Produit.find();
  return result;
}

async function selectProduitById(_id: string) {
  try {
    await connect();
    console.log("Provided ID: ", _id);
    const objectId =new mongoose.Types.ObjectId(_id);
    console.log("Converted ObjectId: ", objectId);
    const result = await Produit.findById({_id:_id});
    console.log("Query Result: ", result);
    return result;
  } catch (error: any) {
    throw new Error(`Error fetching product by ID: ${error.message}`);
  }
}

async function selectProduitsByFamille(famille: string) {
  try {
    await connect();
    const products = await Produit.find({ Famille: famille });
    return products;
  } catch (error: any) { 
    throw new Error(`Error fetching products by Famille: ${error.message}`);
  }
}

async function selectAllFamille() {
  try {
    await connect();
    const familleTypes = await Produit.distinct('Famille');
    return familleTypes;
  } catch (error: any) {
    throw new Error(`Error fetching unique famille types: ${error.message}`);
  }
}
export {
  connect,
  Produit,
  createProduit,
  deleteProduitById,
  updateProduitById,
  selectAllProduits,
  selectProduitById,
  selectProduitsByFamille, 
  selectAllFamille,
};
