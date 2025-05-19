import React, { createContext, useState } from 'react';

export const Context = createContext();

const ContextProvider = ({ children  }) => {
  const [cartCount, setCartCount] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  return (
    <Context.Provider
      value={{
        cartCount, setCartCount,
        userInfo, setUserInfo,
      }}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
