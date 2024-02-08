/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Product } from '@/app/models/produits';
import Link from 'next/link';

interface ProductsListProps {
  product: Product;
}

function ProductsList({ product }: ProductsListProps) {
  const productId = product._id.toString();

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
      <div className="mt-4 flex space-x-4">
        <Link href={`/Details/${productId}`} legacyBehavior>
          <a>
            <button className="flex-1 rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
              Details
            </button>
          </a>
        </Link>
        <button
          className="flex-1 rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductsList;