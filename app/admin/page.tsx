'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import App from '@/components/header';
import axios from 'axios';
import { Product } from '@/app/models/produits';
import { ICommand } from '../models/command';

export default function Admin() {
  const productFormDialog = document.getElementById('product-form-dialog') as HTMLDialogElement;
  const form = document.getElementById('form') as HTMLFormElement;

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cproducts, setcProducts] = useState<Record<string, Product>>({});
  const [familleTypes, setFamilleTypes] = useState<string[]>([]);
  const [commands, setCommands] = useState<ICommand[]>([]);
  const [currentTable, setCurrentTable] = useState<'products' | 'commands'>("products");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const productIds = commands?.flatMap((command) => command.productIds);
      const productResponses = await Promise.all(productIds?.map((id) => fetch(`/api/products/id/${id}`)));
      const productsData = await Promise.all(productResponses?.map((response) => response.json()));
      const products = productsData.reduce((acc, productData) => {
        acc[productData._id] = productData;
        return acc;
      }, {});
      setcProducts(products);
    }
    fetchData();
  }, [commands]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/command');
      const data = await response.json();
      setCommands(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products);
      setFamilleTypes(Array.from(new Set(data.products.map((product: Product) => product.Famille))));
    }
    fetchData();
  }, []);
  function showModelAdd(){
    productFormDialog.showModal();
    form.name = "add"; 
  }
  function showModelUpdate(id: string){
    fetch(`/api/products/id/${id}`)
    .then((response) => response.json())
    .then((product) => {
      var button=document.getElementById("formbutton") as HTMLButtonElement;
      button.value = "update product";
      (document.getElementById('_id') as HTMLInputElement).value = product._id? product._id.toString() : 0;
      (document.getElementById('code') as HTMLInputElement).value = product.Code? product.Code.toString() : 0;
      (document.getElementById('codeABar') as HTMLInputElement).value = product.codeABar ? product.codeABar.toString() : 0;
      (document.getElementById('Désignation') as HTMLInputElement).value = product.Désignation;
      (document.getElementById('Famille') as HTMLSelectElement).value = product.Famille;
      (document.getElementById('Marque') as HTMLInputElement).value = product.Marque;
      (document.getElementById('prixAchatHT') as HTMLInputElement).value =product.prixAchatHT? product.prixAchatHT.toString() : 0;
      (document.getElementById('MB') as HTMLInputElement).value =product.MB? product.MB.toString():0;
      (document.getElementById('TVA') as HTMLInputElement).value = product.TVA ? product.TVA.toString() :0;
      (document.getElementById('pventeTTC') as HTMLInputElement).value =product.pventeTTC? product.pventeTTC.toString():0;
      (document.getElementById('pventePubHT') as HTMLInputElement).value = product.pventePubHT ?product.pventePubHT.toString():0;
      form.name="update";
      productFormDialog.showModal();
    })
    .catch((error) => console.error(error));
  }
  function unshowModel(){
    productFormDialog.close();
  }
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    if (form.name === "add") {
    const formData = new FormData(event.target);
    const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: parseInt(formData.get('code') as string),
          codeABar: parseInt(formData.get('codeABar') as string),
          Désignation: formData.get('Désignation') as string,
          Famille: formData.get('Famille') as string,
          Marque: formData.get('Marque') as string,
          prixAchatHT: parseFloat(formData.get('prixAchatHT') as string),
          MB: parseFloat(formData.get('MB') as string),
          TVA: parseFloat(formData.get('TVA') as string),
          pventeTTC: parseFloat(formData.get('pventeTTC') as string),
          pventePubHT: parseFloat(formData.get('pventePubHT') as string),
          dateCreation: new Date(),
          dateModification: new Date(), }),
    });
    if (!response.ok) {
      console.error("Error creating user:");
      return;
    }
    router.refresh();
    productFormDialog.close();
  }
  if (form.name === "update") {
    const formData = new FormData(event.target);
    const id = formData.get('_id') as string;
    const response = await fetch(`http://localhost:3000/api/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          code: parseInt(formData.get('code') as string),
          codeABar: parseInt(formData.get('codeABar') as string),
          Désignation: formData.get('Désignation') as string,
          Famille: formData.get('Famille') as string,
          Marque: formData.get('Marque') as string,
          prixAchatHT: parseFloat(formData.get('prixAchatHT') as string),
          MB: parseFloat(formData.get('MB') as string),
          TVA: parseFloat(formData.get('TVA') as string),
          pventeTTC: parseFloat(formData.get('pventeTTC') as string),
          pventePubHT: parseFloat(formData.get('pventePubHT') as string),
          dateCreation: new Date(),
          dateModification: new Date(), }),
    });
    if (!response.ok) {
      console.error("Error creating user:");
      return;
    }
    router.refresh();
    productFormDialog.close();
  }
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/products/id/${id}`);
    router.refresh();
  };

  const handleDeleteCommand = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/command/${id}`);
    router.refresh();
  };

  return (
    <div className="p-4">
      <App/>
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="flex items-center justify-between">
    <button onClick={() => setCurrentTable("products")} className={`mr-4 ${currentTable === "products" ? "text-blue-500" : "text-gray-500"}`}>
    Products
    </button>
    <button onClick={() => setCurrentTable("commands")} className={`${currentTable === "commands" ? "text-blue-500" : "text-gray-500"}`}>
    Commands
    </button>
    </div>
    {currentTable === "products" && (
      <div>
      <button id="add-product-btn" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>showModelAdd()}>
      Add Product
      </button>
      <table className="w-full min-w-max table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Code à Barre</th>
            <th className="px-4 py-2">Désignation</th>
            <th className="px-4 py-2">Famille</th>
            <th className="px-4 py-2">Marque</th>
            <th className="px-4 py-2">Prix Achat HT</th>
            <th className="px-4 py-2">MB</th>
            <th className="px-4 py-2">TVA</th>
            <th className="px-4 py-2">Prix Vente TTC</th>
            <th className="px-4 py-2">Prix Vente Pub HT</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product._id} className="bg-white border-b">
              <td className="px-4 py-2">{product.Code}</td>
              <td className="px-4 py-2">{product.codeABar}</td>
              <td className="px-4 py-2">{product.Désignation}</td>
              <td className="px-4 py-2">{product.Famille}</td>
              <td className="px-4 py-2">{product.Marque}</td>
              <td className="px-4 py-2">{product.prixAchatHT}</td>
              <td className="px-4 py-2">{product.MB}</td>
              <td className="px-4 py-2">{product.TVA}</td>
              <td className="px-4 py-2">{product.pventeTTC}</td>
              <td className="px-4 py-2">{product.pventePubHT}</td>
              <td className="px-4 py-2">
                <a>
                  <button onClick={()=>showModelUpdate(product._id)} className="text-red-500 ml-2">Edit</button>
                </a>
                <button onClick={() => handleDelete(product._id)} className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
      <dialog id="product-form-dialog" className="w-full max-w-lg p-4 bg-white shadow-md rounded">
      <form id="form"  onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <input type="hidden" name="_id" id="_id" value="" />
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="code">
              Code:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" name="code" id="code" required />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="codeABar">
              Code à Barre:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" name="codeABar" id="codeABar" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="Désignation">
              Désignation:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="Désignation" id="Désignation" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="Famille">
              Famille:
            </label>
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="Famille" id="Famille" required>
              {familleTypes.map((familleType) => (
                <option key={familleType} value={familleType}>
                  {familleType}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="Marque">
              Marque:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" name="Marque" id="Marque" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="prixAchatHT">
              Prix Achat HT:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" step="0.01" name="prixAchatHT" id="prixAchatHT" required />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="MB">
              MB:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" step="0.01" name="MB" id="MB" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="TVA">
              TVA:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" step="0.01" name="TVA" id="TVA" required />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="pventeTTC">
              Prix Vente TTC:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" step="0.01" name="pventeTTC" id="pventeTTC" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="pventePubHT">
              Prix Vente Pub HT:
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" step="0.01" name="pventePubHT" id="pventePubHT" required />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button id="formbutton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Add Product
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={()=>unshowModel()}>
            anuller
          </button>
        </div>
      </form>
      </dialog>
      {currentTable === "commands" && (
      <table className="w-full min-w-max table-auto">
  <thead>
    <tr className="bg-gray-200 text-gray-800">
      <th className="px-4 py-2">User Email</th>
      <th className="px-4 py-2">Product Designation</th>
      <th className="px-4 py-2">Quantity</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {commands?.map((command: ICommand) => (
      <tr key={command._id} className="bg-white border-b">
        <td className="px-4 py-2">{command.email}</td>
        <td className="px-4 py-2">
          {command.productIds.map((productId) => (
            <span key={productId}>{cproducts[productId]?.Désignation}, </span>
          ))}
        </td>
        <td className="px-4 py-2">
          <button onClick={() => handleDeleteCommand(command._id)} className="text-red-500 ml-2">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>)}
    </div>
    
  );
}