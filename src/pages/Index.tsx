import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Benefits from '@/components/Benefits';
import Newsletter from '@/components/Newsletter';

const Index = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <Newsletter />
    </div>
  );
};

export default Index;
