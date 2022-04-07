import { createContext, useState, useEffect } from "react";

const initialCtx = {
  searchText: "",
  setSearchText: () => {},
  funds: [],
  loading: false,
  setLoading: () => {},
};
const AppContext = createContext(initialCtx);

const AppProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const getFunds = async () => {
      setLoading(true);
      if (searchText.length === 0) return;
      const response = await fetch(
        `https://api.mfapi.in/mf/search?q=${searchText}`
      );
      const data = await response.json();
      if (!ignore) {
        setFunds(data);
        setLoading(false);
      }
    };
    const timer = setTimeout(() => {
      getFunds();
    }, 500);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [searchText]);

  return (
    <AppContext.Provider
      value={{ searchText, setSearchText, funds, loading, setLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
