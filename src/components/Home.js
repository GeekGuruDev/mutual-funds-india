import { useContext, useEffect } from "react";
import { AppContext } from "../context";

const Home = () => {
  const { setSearchText } = useContext(AppContext);
  useEffect(() => {
    setSearchText("fund");
  }, []);
  return;
};

export default Home;
