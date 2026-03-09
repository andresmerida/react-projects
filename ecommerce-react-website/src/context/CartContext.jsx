import {createContext, useState, useContext} from "react";
import {getProductById} from "../data/products.js";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId) {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      const updatedItems = cartItems.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProducts() {
    return cartItems.map(item => ({
      ...item,
      product: getProductById(item.id)
    })).filter(item => item.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter(item => item.id !== productId));
  }

  function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  }

  function getTotalCartPrice() {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      if (product) {
        return total + product.price * item.quantity;
      } else {
        return total;
      }
    }, 0);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      getCartItemsWithProducts,
      removeFromCart,
      updateCartQuantity,
      getTotalCartPrice,
      clearCart}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}