
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const Collection = () => {
  const { phoneModel } = useParams<{ phoneModel: string }>();
  
  const filteredProducts = phoneModel 
    ? products.filter(product => product.phoneModel === phoneModel)
    : [];
  
  const modelDisplayName = phoneModel ? 
    phoneModel.charAt(0).toUpperCase() + phoneModel.slice(1) : '';
  
  return (
    <div className="bg-white py-12">
      <div className="container px-4 mx-auto">
        {filteredProducts.length > 0 ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{modelDisplayName} Cases</h1>
              <p className="text-gray-600">
                {`Our premium collection of cases for ${modelDisplayName} phones.`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
            <p className="mb-8">Sorry, we couldn't find the collection you're looking for.</p>
            <Link 
              to="/products" 
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md inline-block"
            >
              Shop All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
