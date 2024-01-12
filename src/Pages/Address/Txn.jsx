import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "@nextui-org/react";

// Hash Component: fetches and displays details of a blockchain transaction based on its hash
const Hash = () => {
  const { hash } = useParams(); // Get the hash parameter from the URL
  // Define state variables to store transaction data and loading state
  const [txnData, setTxnData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Similar utility function for converting timestamps
  const convertTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  useEffect(() => {
    // Define an asynchronous function to fetch transaction data from the API
    const fetchData = async () => {
      try {
        // Send GET request to API endpoint using Axios and retrieve transaction details
        const response = await axios.get(
          `http://localhost:8000/transaction/${hash}`
        );
        const { response: txntable } = response.data;
        // Update txnData state with fetched data and set loading state to false
        setTxnData(txntable);
        setIsLoading(false);
      } catch (error) {
        // Log errors to console and set loading state to false
        console.error("Error fetching hash data:", error);
        setIsLoading(false);
      }
    };
    // Invoke fetchData to get transaction data
    fetchData();
  }, [hash]);
  return (
    <div className="mt-10">
      <div className="text-2xl text-white">Transaction Details</div>
      <div className="text-lg my-1 break-all text-white">
        Txn Hash:{" "}
        {/* Render a link to the current transaction using the `Link` component. */}
        <Link className="text-lg text-white font-bold" key={hash} href={`/txn/${hash}`}>
          {hash}
        </Link>
      </div>

      <div className="divider"></div>

      {/* Similar layout for displaying transaction-related data */}
      <div className="bg-slate-950/40 shadow-xl rounded-xl w-1/2 justify-center item-center mb-10 p-2 m-auto">
        {/* Tabular representation of transaction data. */}
        <table className="table rounded-xl bg-slate-950/60">
          <tbody className="">
            <tr>
              <th className="text-white">From Address</th>
              <td className="text-right break-all">
                {txnData.map((data) => (
                  <Link
                    key={data.from_address}
                    href={`/Address/${data.from_address}`}
                  >
                    {data.from_address}
                  </Link>
                ))}
              </td>
            </tr>
            <tr>
              <th className="text-white">To Address</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => (
                  <Link
                    key={data.to_address}
                    href={`/Address/${data.to_address}`}
                  >
                    {data.to_address}
                  </Link>
                ))}
              </td>
            </tr>
            <tr>
              <th className="text-white">Time</th>
              <td className="text-right break-all text-white">
                {convertTimestampToDateTime(
                  txnData.map((data) => data.block_timestamp)
                )}
              </td>
            </tr>
            <tr>
              <th className="text-white">Timestamp</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.block_timestamp)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Value</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.value)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Input</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.input)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Transaction Index</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.transaction_index)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Gas</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.gas)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Gas Used</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.gas_used)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Gas Price</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.gas_price)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Transaction Fee</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.transaction_fee)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Block Number</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.block_number)}
              </td>
            </tr>
            <tr>
              <th className="text-white">Block Hash</th>
              <td className="text-right break-all text-white">
                {txnData.map((data) => data.block_hash)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hash;
