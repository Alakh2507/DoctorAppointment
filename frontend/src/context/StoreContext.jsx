import { createContext, useState } from "react";
import { doctors } from '../assets/assets_frontend/assets.js'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("hello");
    

  const contextValue = {
    token,
    setToken,
    doctors,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
