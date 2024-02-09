'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header";
import { Carouselapp } from "@/components/carousel";
import ProductsList from "@/components/produits";
import { Product } from "./models/produits";
import CategoryFilter from "@/components/categorieFilter";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [familleTypes, setFamilleTypes] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      console.log(response.data);
      setProducts(response.data.products);
      setFamilleTypes(response.data.familleTypes);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    setError(null);
  
    if (category === '') {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        console.log((await response).data);
        setProducts((await response).data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${category}`);
        console.log((await response).data);
        setProducts((await response).data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-16sticky top-0 z-50">
        <Header />
      </div>
      <div className=" px-16 flex items-center justify-center">
        <Carouselapp />
      </div>

      <div className="px-4 py-8 mx-auto w-4/5 h-4/5">
        <CategoryFilter
          categories={familleTypes}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <p>Loading...</p>}

          {error && <p>Error: {error}</p>}

          {products.map((product: Product) => (
              <div
                key={product._id as string}
                className="border border-gray-100 bg-white p-6 rounded"
              >
                <ProductsList product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}