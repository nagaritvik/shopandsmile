
import { useState, useEffect, useContext, createContext } from "react";

const searchcontext = createContext();
const Searchprovider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: []
    });

    return (
        <searchcontext.Provider value={[auth, setAuth]}>
            {children}
        </searchcontext.Provider>
    )
}

const useSearch = () => useContext(searchcontext);
export { useSearch, Searchprovider };