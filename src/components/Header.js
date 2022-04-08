import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const Header = () => {
  return (
    <header className="mx-4 mb-8">
      <h1 className="text-3xl text-green-600 text-center font-medium tracking-wide my-6">
        <Link to="/">
          Mutual Funds <span className="text-orange-600">India</span>
        </Link>
      </h1>
      <SearchForm />
    </header>
  );
};

export default Header;
