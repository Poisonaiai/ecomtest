
import React, { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [phoneModel, setPhoneModel] = useState('all');
  const [sortOption, setSortOption] = useState('recommended');

  const handleFilterChange = (model: string) => {
    setPhoneModel(model);
    if (model === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.phoneModel === model));
    }
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    let sortedProducts = [...filteredProducts];
    
    switch(option) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      default: // recommended (bestsellers first)
        sortedProducts.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }
    
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="bg-white py-12">
      <div className="container px-4 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">All Phone Cases</h1>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-gray-50 p-4 rounded-lg">
            {/* Phone Model Filter */}
            <div>
              <div className="text-sm text-gray-600 mb-2">Filter by Phone Model:</div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={phoneModel === 'all' ? 'default' : 'outline'}
                  className={phoneModel === 'all' ? 'bg-black text-white' : ''}
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </Button>
                <Button 
                  variant={phoneModel === 'iphone' ? 'default' : 'outline'}
                  className={phoneModel === 'iphone' ? 'bg-black text-white' : ''}
                  onClick={() => handleFilterChange('iphone')}
                >
                  iPhone
                </Button>
                <Button 
                  variant={phoneModel === 'samsung' ? 'default' : 'outline'}
                  className={phoneModel === 'samsung' ? 'bg-black text-white' : ''}
                  onClick={() => handleFilterChange('samsung')}
                >
                  Samsung
                </Button>
                <Button 
                  variant={phoneModel === 'google' ? 'default' : 'outline'}
                  className={phoneModel === 'google' ? 'bg-black text-white' : ''}
                  onClick={() => handleFilterChange('google')}
                >
                  Google
                </Button>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="w-full sm:w-48">
              <div className="text-sm text-gray-600 mb-2">Sort by:</div>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try changing your filters to see more products.</p>
            <Button onClick={() => handleFilterChange('all')}>View All Products</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
