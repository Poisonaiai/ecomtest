import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Card, CardContent } from './ui/card';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  // Filter bestsellers
  const bestSellers = products.filter(product => product.bestSeller);
  
  // Filter new arrivals
  const newArrivals = products.filter(product => product.newArrival);

  return (
    <div className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        {/* Products (was Best Sellers) */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h2>
            <Link to="/products" className="text-sm text-gray-600 hover:text-black underline">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
