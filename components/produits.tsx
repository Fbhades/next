/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Product } from '@/app/models/produits';

interface ProductsListProps {
  product: Product;
}

function ProductsList({ product }: ProductsListProps) {
  return (
    <div className="border border-gray-100 bg-white p-6 rounded">
      <img
        src="https://t4.ftcdn.net/jpg/02/24/40/43/360_F_224404329_KrZ69DD38fjb4zYKL01AKCy46zALlkWv.jpg"
        alt={product.Famille as string}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{product.Famille}</h3>
      <p className="mt-1.5 text-sm text-gray-700">
        {product.Désignation}
      </p>
      <p className="mt-1.5 text-sm text-gray-700">
        {product.prixAchatHT?.toFixed(2)}
      </p>
      <form className="mt-4">
        <button
          className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
}

export default ProductsList;