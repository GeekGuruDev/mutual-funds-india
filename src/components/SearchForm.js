import { useContext } from "react";
import { AppContext } from "../context";
import FundItem from "./FundItem.js";
import Loading from "./Loading";

const SearchForm = () => {
  const { loading, funds, searchText, setSearchText } = useContext(AppContext);
  return (
    <form
      className=" max-w-xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        className="w-full rounded px-4 py-2 border border-slate-300 focus-visible:outline-none focus-visible:shadow-md"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {searchText.length !== 0 && (
        <div className="bg-white divide-y md:max-w-xl my-1.5 rounded md:mx-auto">
          {loading && <Loading />}
          {!loading && !funds.length && (
            <p className="px-4 py-2">No Funds found.</p>
          )}
          {!loading &&
            funds.map((fund, index) => {
              return <FundItem key={index} {...fund} />;
            })}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
