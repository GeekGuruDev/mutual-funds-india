import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context";
import FundInfo from "./FundInfo";
import Loading from "./Loading";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const FundPage = () => {
  const { schemeCode } = useParams();
  const { setSearchText } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [fund, setFund] = useState(null);

  useEffect(() => {
    setSearchText("");
    const getSingleFund = async () => {
      setLoading(true);
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
      const data = await response.json();
      setLoading(false);
      setFund(data);
    };
    getSingleFund();
  }, [schemeCode]);

  if (loading)
    return (
      <div className="my-10">
        <Loading />
      </div>
    );

  const {
    meta: { fund_house, scheme_name, scheme_type, scheme_category },
    data: [{ date: currentDate, nav: currentNav }, { nav: preNav }],
  } = fund;
  const change = Math.round((currentNav - preNav) * 100000) / 100000;
  const changeRate = Number((change * 100) / preNav).toFixed(2);

  return (
    <section className="max-w-xl mx-auto bg-white my-10 rounded p-8">
      <h1 className="text-2xl tracking-wider font-bold">{scheme_name}</h1>
      <article className="my-8">
        <h5 className="text-sm font-medium">Nav</h5>
        <div className="flex gap-3 items-stretch">
          <span className="text-2xl font-medium">₹ {currentNav}</span>
          <div
            className={`m-1 text-xs flex items-center gap-1 rounded font-medium px-2  ${
              change < 0
                ? "bg-red-200 text-red-600"
                : "bg-green-200 text-green-600"
            }`}
          >
            {change < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
            {changeRate}%
          </div>
        </div>
        <p className="my-1 text-slate-400">Last Updated on {currentDate}</p>
      </article>
      <article className="flex flex-wrap justify-between gap-y-5 tracking-wide">
        <FundInfo name="Fund House" value={fund_house} />
        <FundInfo name="Type" value={scheme_type} />
        <FundInfo name="Category" value={scheme_category} />
      </article>
    </section>
  );
};

export default FundPage;
