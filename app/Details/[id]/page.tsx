/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import { Product } from '@/app/models/produits';
import { useParams } from 'next/navigation';

const ProductDetails = () => {
  const {id} = useParams<{id:string}>();  
  const [product, setProduct] = React.useState<Product | null>(null);

  const fetchProduct = async () => {
    const response = await fetch(`/api/products/id/${id}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setProduct(data);
    } else {
      console.error('Error fetching product');
    }
  };

  React.useEffect(() => {
    console.log(id);
    if(id){
    fetchProduct();}
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { code, Désignation, Famille, prixAchatHT, Marque, dateCreation, dateModification } = product;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 lg:w-1/4 p-4 lg:p-6">
          <img
            src="https://t4.ftcdn.net/jpg/02/24/40/43/360_F_224404329_KrZ69DD38fjb4zYKL01AKCy46zALlkWv.jpg"
            alt={Famille as string}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4">{Famille}</h1>
          <p className="mb-4">
            <span className="font-semibold mr-1">Code:</span> {code}
          </p>
          <p className="mb-4">
            <span className="font-semibold mr-1">Désignation:</span> {Désignation}
          </p>
          <p className="mb-4">
            <span className="font-semibold mr-1">Marque:</span> {Marque}
          </p>
          <p className="mb-4">
            <span className="font-semibold mr-1">Achat HT:</span> {prixAchatHT}
          </p>
          <p className="mb-4">
            <span className="font-semibold mr-1">Date de création:</span> {new Date(dateCreation).toLocaleString()}
          </p>
          <p className="mb-4">
            <span className="font-semibold mr-1">Date de modification:</span> {new Date(dateModification).toLocaleString()}
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              className="flex-1 rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;