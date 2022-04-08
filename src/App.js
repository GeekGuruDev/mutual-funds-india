import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import FundPage from "./components/FundPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-200 text-slate-500 flex flex-col pl-[calc(100vw-100%)]">
      <Header />
      <main className="flex-grow mx-4 my-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="fund/:schemeCode" element={<FundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
