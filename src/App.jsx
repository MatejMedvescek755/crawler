import { useState } from "react";
import "./App.css";
import getTransactions from "./api/transactions";
import TransactionCard from "./TransactionCard";
import logo from "./assets/log.svg";

function App() {
  const [transactions, setTransactions] = useState(undefined);
  const [errorParam, setErrorParam] = useState(undefined);
  const [loading, setLoading] = useState(false);
  async function fetchData(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const addr = formData.get("address");
    const block = formData.get("block");

    setErrorParam(undefined);
    setLoading(true);

    try {
      const data = await getTransactions(addr, block);

      if (data.status === "0") {
        // API returned error
        setErrorParam(data.result || "Unknown error");
        setTransactions([]);
      } else {
        setTransactions(data.result || []);
      }
    } catch (error) {
      console.error(error);
      setErrorParam("Failed to fetch transactions");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <form className="controls" onSubmit={(e) => fetchData(e)}>
        <label htmlFor="address">Ethereum address</label>
        <input name="address" placeholder="Ethereum address" />
        <label htmlFor="block">Starting Block</label>
        <input type="number" name="block" defaultValue={999990} />
        <button type="submit">Submit</button>
      </form>

      <div className="results">
        {loading ? (
          <div className="spinner">
            <img src={logo} alt="spinner" />
          </div>
        ) : errorParam ? (
          <div>{errorParam}</div>
        ) : transactions?.length ? (
          transactions
            .slice(0, 100)
            .map((el) => <TransactionCard data={el} key={el.hash} />)
        ) : (
          <div>Results</div>
        )}
      </div>
    </div>
  );
}
export default App;
