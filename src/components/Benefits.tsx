
import React from 'react';
import { ShieldCheck, Truck, RefreshCcw, Clock } from 'lucide-react';

const benefits = [
  {
    name: 'Premium Quality',
    description: 'Durable materials and precision engineering in every case',
    icon: ShieldCheck
  },
  {
    name: 'Fast Shipping',
    description: 'Free shipping on all orders over $50',
    icon: Truck
  },
  {
    name: 'Easy Returns',
    description: '30-day hassle-free return policy',
    icon: RefreshCcw
  },
  {
    name: 'Lifetime Warranty',
    description: 'All products come with our lifetime warranty',
    icon: Clock
  }
];

const Benefits = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Why Choose CaseCraft</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.name} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
                <benefit.icon className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{benefit.name}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
