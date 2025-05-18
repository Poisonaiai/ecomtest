import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-50"></div>
        
        {/* Content */}
        <div className="relative pt-10 pb-16 sm:pb-24">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text content */}
              <div className="text-center md:text-left animate-fade-in">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4">
                  Protect Your Phone in Style
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
                  Discover our premium selection of high-quality phone cases that combine protection with beautiful design.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button asChild className="bg-black hover:bg-gray-800 text-white">
                    <Link to="/products">Shop All Cases</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-black text-black hover:bg-gray-100">
                    <Link to="/collections/iphone">iPhone Cases</Link>
                  </Button>
                </div>
              </div>
              
              {/* Image */}
              {/* Removed hero image section */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
