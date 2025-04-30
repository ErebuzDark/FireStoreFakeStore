import { API } from '@config/apiConfig';
import React, { useContext } from 'react';

// para sa cart items
export const getCartsItem = async () => {
  const [cartRes, productRes] = await Promise.all([
    API.get("carts"),
    API.get("products"),
  ]);

  const carts = cartRes.data;
  const products = productRes.data;

  const generateUniqueID = (productId, cartId) => {
    return `${productId * cartId * (Math.floor(Math.random() * 1000))}`;
  };

  const enrichedCarts = carts.map((cart) => ({
    ...cart,
    products: cart.products.map((item) => {
      const fullProduct = products.find((p) => p.id === item.productId);
      return {
        ...item,
        ...fullProduct,
        uniqueID: generateUniqueID(item.productId, cart.id),
      };
    }),
  }));
  // console.log(JSON.stringify(enrichedCarts, null, 3));
  return enrichedCarts;
};
