
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm product-card-hover">
      <Link to={`/product/${product.id}`}>
        <div className="relative pb-[100%]">
          {/* Product image */}
          <img 
            src={product.image} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Badges */}
          {(product.bestSeller || product.newArrival) && (
            <div className="absolute top-2 left-2">
              {product.bestSeller && (
                <Badge className="bg-black text-white mr-2">Best Seller</Badge>
              )}
              {product.newArrival && (
                <Badge className="bg-blue-600 text-white">New</Badge>
              )}
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-semibold">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 capitalize">{product.phoneModel}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
