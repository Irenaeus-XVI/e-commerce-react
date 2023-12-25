import React, { createContext, useEffect, useState } from "react";
const TokenContext = createContext();

export const TokenContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


    return (
        <TokenContext.Provider value={{ token, setToken, user, setUser }}>
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
