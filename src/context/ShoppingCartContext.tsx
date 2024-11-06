import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  addToCart: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: number) {
    if (!cartItems.find(item => item.id === id)) return;
    setCartItems(currItems =>
      currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  }

  function decreaseQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id != id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id != id);
    });
  }

  function addToCart(id: number) {
    setCartItems([...cartItems, { id, quantity: 1 }]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
