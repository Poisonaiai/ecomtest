
import React from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    name: 'iPhone Cases',
    href: '/collections/iphone',
    description: 'Perfectly designed to fit all iPhone models',
    imageSrc: 'https://images.unsplash.com/photo-1603313011825-bd163518f44b?auto=format&fit=crop&w=600&h=600'
  },
  {
    name: 'Samsung Cases',
    href: '/collections/samsung',
    description: 'Premium protection for Samsung Galaxy phones',
    imageSrc: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&h=600'
  },
  {
    name: 'Google Pixel Cases',
    href: '/collections/google',
    description: 'Sleek cases for Google Pixel devices',
    imageSrc: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&h=600'
  }
];

const Collections = () => {
  return (
    <div className="bg-white py-16">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Shop by Phone</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection.name}
              to={collection.href}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-gray-200">
                <img
                  src={collection.imageSrc}
                  alt={collection.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-1">{collection.name}</h3>
                <p className="text-sm text-gray-200 mb-3">{collection.description}</p>
                <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                  Shop Now
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
