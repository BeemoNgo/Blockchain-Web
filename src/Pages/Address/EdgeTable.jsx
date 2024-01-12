import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseNodeContext } from "../Address/GraphContext";
import { truncateLabel } from "../Address/truncateLabel";
import Tooltip from "@mui/material/Tooltip";
import EastIcon from "@mui/icons-material/East";

const EdgeTable = () => {
  const { NodeID, EdgeID, NodeTableData, EdgeTableData, AllTransactions } =
    UseNodeContext();
  return (
    <div className="">
      {/* Heading for the table */}
      <div className="text-base mb-3 text-white">Transaction Details</div>

      {/* Display sender and receiver addresses with an arrow between */}
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex justify-center items-center text-indigo-400">
          {/* Link to sender's address */}
          <Link
            to={`/address/${EdgeID[1]}`}
            className="font-bold text-xl my-1 break-all"
          >
            <Tooltip title={EdgeID[1]}>{truncateLabel(EdgeID[1])}</Tooltip>
          </Link>
        </div>
        <div className="col-span-1 flex justify-center items-center text-white">
          {/* Arrow icon */}
          <EastIcon
            fontSize="medium"
            style={{ verticalAlign: "middle", margin: "0 4px" }}
          />
        </div>
        <div className="col-span-1 flex justify-center items-center text-indigo-400">
          {/* Link to receiver's address */}
          <Link
            to={`/address/${EdgeID[2]}`}
            className="font-bold text-xl my-1 break-all"
          >
            <Tooltip title={EdgeID[2]}>{truncateLabel(EdgeID[2])}</Tooltip>
          </Link>
        </div>
      </div>

      <div className="divider"></div>
      {/* Display main transaction details */}
      <table className="table rounded-xl bg-slate-950/60 w-full">
        <tbody className="">
          <tr>
            <th className="text-white">Transactions</th>
            <td className="text-right break-all text-white">
              {EdgeTableData.transactions}
            </td>
          </tr>
          <tr>
            <th className="text-white">Transaction volume</th>
            <td className="text-right break-all text-white">
              {EdgeTableData.totalValue} USDT
            </td>
          </tr>
          <tr>
            <th className="text-white">First txn time</th>
            <td className="text-right break-all text-white">{EdgeTableData.ealiest}</td>
          </tr>
          <tr>
            <th className="text-white">Latest txn time</th>
            <td className="text-right break-all text-white">{EdgeTableData.latest}</td>
          </tr>
        </tbody>
      </table>

      <div className="divider"></div>

      {/* Heading for the transactions list */}
      <div className="text-lg text-white">Transactions List</div>
      <div className="table-container overflow-scroll mt-5 h-40 lg:h-48 xl:h-64 rounded-xl">
        <table className="table rounded-xl  bg-slate-950/60 w-full">
          <thead>
            <tr>
              <th className="text-white">Time/Hash</th>
              <th className="text-white">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through all transactions and rendering each transaction detail */}
            {AllTransactions.map((transaction) => (
              <tr key={transaction.hash}>
                <td className="text-white">
                  {new Date(
                    transaction.block_timestamp * 1000
                  ).toLocaleString()}
                  <div>
                    <Link href={`/txn/${transaction.hash}`}>
                      <Tooltip title={transaction.hash}>
                        {truncateLabel(transaction.hash)}
                      </Tooltip>
                    </Link>
                  </div>
                </td>
                <td className="text-white">{transaction.value} USDT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EdgeTable;
