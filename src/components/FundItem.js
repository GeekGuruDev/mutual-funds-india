import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context";

const FundItem = ({ schemeCode, schemeName, onClick }) => {
  const { setSearchText } = useContext(AppContext);
  return (
    <Link
      to={`/fund/${schemeCode}`}
      className="py-2 block px-4 hover:bg-green-50"
    >
      {schemeName}
    </Link>
  );
};

export default FundItem;
