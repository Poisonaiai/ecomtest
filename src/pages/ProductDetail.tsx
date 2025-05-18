import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id || '0'));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, '');
  };
  
  // Find related products (same phone model but different products)
  const relatedProducts = products
    .filter(p => p.phoneModel === product.phoneModel && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white">
      <div className="container px-4 mx-auto py-12">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="flex items-center text-gray-600 hover:text-black">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to products
            </Link>
          </Button>
        </div>
        
        {/* Product details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product image */}
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product info */}
          <div>
            {/* Badges */}
            <div className="mb-4 flex">
              {product.bestSeller && (
                <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full mr-2">
                  Best Seller
                </span>
              )}
              {product.newArrival && (
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  New Arrival
                </span>
              )}
            </div>
            
            {/* Title and price */}
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <Select 
                value={quantity.toString()} 
                onValueChange={(value) => setQuantity(parseInt(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Add to cart button */}
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg mb-6"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            
            {/* Guarantee */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                30-day money-back guarantee, 1-year warranty, and free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="group">
                  <Link to={`/product/${relatedProduct.id}`} className="block">
                    <div className="bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <img 
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium mb-1">{relatedProduct.name}</h3>
                    <p className="font-bold">${relatedProduct.price.toFixed(2)}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
