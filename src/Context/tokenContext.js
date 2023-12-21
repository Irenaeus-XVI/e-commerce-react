import React, { createContext, useState } from "react";

const TokenContext = createContext();

export const TokenContextProvider = (props) => {
    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
