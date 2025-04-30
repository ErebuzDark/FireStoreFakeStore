import React, { createContext, useState } from 'react';

export const Context = createContext();

const ContextProvider = ({ children  }) => {
  const [cartCount, setCartCount] = useState(null);
  return (
    <Context.Provider
      value={{
        cartCount, setCartCount,

      }}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
