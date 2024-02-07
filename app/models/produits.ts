import mongoose, { Schema, model, models } from "mongoose";
export interface Product {
    _id: String,
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
  
}
const produitSchema = new Schema({
  _id: String,
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

const Produit = models.product||model("product", produitSchema);

async function connect() {
 await  mongoose.connect(
    "mongodb+srv://fbmoddy:Fblux@cluster0.tmxybv9.mongodb.net/ecom?retryWrites=true&w=majority",
    {}
  )
}

function createProduit(produit: Product) {
  const newProduit = new Produit(produit);
  return newProduit.save();
}

function deleteProduitById(id: String) {
  return Produit.findByIdAndDelete(id);
}

function updateProduitById(id: String, produit: Product) {
  return Produit.findByIdAndUpdate(id, produit, { new: true });
}

async function selectAllProduits() {
  await  connect()
  let result = await Produit.find();
return result
}

function selectProduitById(id: String) {
  return Produit.findById(id);
}

// eslint-disable-next-line import/no-anonymous-default-export
export  {
  connect,
  Produit,
  createProduit,
  deleteProduitById,
  updateProduitById,
  selectAllProduits,
  selectProduitById,
};
