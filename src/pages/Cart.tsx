import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag, MinusCircle, PlusCircle } from 'lucide-react';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button asChild className="bg-black hover:bg-gray-800 text-white">
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}`} className="flex border border-gray-200 rounded-lg overflow-hidden">
                {/* Product image */}
                <div className="w-24 sm:w-40 bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {/* Product details */}
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-500 mb-2 capitalize">Color: {item.selectedColor}</p>
                  <p className="text-gray-500 mb-4">${item.price.toFixed(2)}</p>
                  
                  {/* Quantity controls */}
                  <div className="mt-auto flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="mx-3 font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    
                    <div className="ml-auto font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Continue shopping */}
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{getCartTotal() > 50 ? 'Free' : '$4.99'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(getCartTotal() * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  ${(
                    getCartTotal() + 
                    (getCartTotal() > 50 ? 0 : 4.99) + 
                    (getCartTotal() * 0.07)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg"
              onClick={async () => {
                const total = (
                  getCartTotal() +
                  (getCartTotal() > 50 ? 0 : 4.99) +
                  (getCartTotal() * 0.07)
                ).toFixed(2);
                try {
                  const response = await axios.get(
                    'https://rampago-seamless-fiat-to-usdc-fiat-ramp.p.rapidapi.com/payment/',
                    {
                      params: {
                        OfferName: 'Ecommerce purchase',
                        Amount: Math.round(Number(total)),
                        Currency: 'USD',
                        ExternalId: Math.random().toString(36).substring(2, 15),
                      },
                      headers: {
                        'x-rapidapi-host': 'rampago-seamless-fiat-to-usdc-fiat-ramp.p.rapidapi.com',
                        'x-rapidapi-key': '9780927c53msh5d72f8c8c4bf4a7p197be5jsn72a76c55ded2',
                      },
                    }
                  );
                  // Try to find the first URL in the response
                  const data = response.data;
                  let paymentLink = data["payment link"] || data["payment_link"];
                  if (!paymentLink) {
                    // Try to find any URL in the response
                    const urlMatch = JSON.stringify(data).match(/https?:\/\/[^"\s]+/);
                    if (urlMatch) {
                      paymentLink = urlMatch[0];
                    } else {
                      // Try again with a simpler regex
                      const urlMatchSimple = JSON.stringify(data).match(/https?:[^"\s]+/);
                      if (urlMatchSimple) {
                        paymentLink = urlMatchSimple[0];
                      }
                    }
                  }
                  if (paymentLink) {
                    window.location.href = paymentLink;
                  } else {
                    alert('Failed to generate payment link. Full response: ' + JSON.stringify(data));
                  }
                } catch (error) {
                  alert('Error generating payment link.');
                }
              }}
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
