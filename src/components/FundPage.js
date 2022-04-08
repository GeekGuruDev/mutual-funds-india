import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context";
import FundInfo from "./FundInfo";
import Loading from "./Loading";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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
    data,
  } = fund;

  const [{ date: currentDate, nav: currentNav }, { nav: preNav }] = data;
  const chartData = data
    .slice(0, 30)
    .reverse()
    .map(({ nav, date }) => {
      return { Nav: Number(nav), date: date.slice(0, 5).replace("-", "/") };
    });
  const change = Math.round((currentNav - preNav) * 100000) / 100000;
  const changeRate = Number((change * 100) / preNav).toFixed(2);

  return (
    <section className="max-w-3xl mx-auto bg-white rounded-md p-8 shadow-lg">
      <h1 className="text-2xl tracking-wider font-bold border-b border-slate-300 pb-5 mb-10">
        {scheme_name}
      </h1>

      <article className="flex flex-wrap justify-between gap-y-5 tracking-wide">
        <FundInfo name="Fund House" value={fund_house} />
        <FundInfo name="Type" value={scheme_type} />
        <FundInfo name="Category" value={scheme_category} />
      </article>
      <article className="my-12">
        <h5 className="text-sm tracking-widest text-slate-400 ">Nav</h5>
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
      <article className="">
        <p className="py-2 text-center">30 days chart</p>
        <ResponsiveContainer width={"100%"} height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 0,
              right: 12,
              left: -24,
              bottom: 20,
            }}
          >
            <CartesianGrid stroke="#ccc" vertical={false} />
            <Line
              type="linear"
              dataKey="Nav"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="date" minTickGap={15} />
            <YAxis
              type="number"
              domain={["auto", "auto"]}
              allowDecimals={false}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </article>
    </section>
  );
};

export default FundPage;
