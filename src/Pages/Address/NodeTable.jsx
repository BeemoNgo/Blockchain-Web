import React from "react";
import { Chip } from "@nextui-org/react"; // Import Chip component from @nextui-org/react for UI styling
import { Link } from "react-router-dom"; // Import Link from react-router-dom to create links
import { UseNodeContext } from "../Address/GraphContext"; // Importing our context hook to utilize global state

const NodeTable = () => {
  // Destructure to extract needed values and methods from the context
  const { NodeID } = UseNodeContext();
  const { NodeTableData } = UseNodeContext();

  return (
    <div className="">
      {/* Heading for the Address Details section */}
      <div className="text-base text-white">Address Details</div>

      {/* Display the NodeID, which is also a navigable link to the address page. */}
      <div className="font-bold text-2xl my-1 break-all text-white">
        {/* Use Link component to create a link to the address page */}
        <Link
          className="font-bold text-xl my-1 break-all"
          to={`/address/${NodeID[0]}`} // Specify the route parameter here
        >
          {NodeID[0]}
        </Link>
      </div>

      {/* Display additional node information using a Chip component */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Chip color="success">{NodeID[1]}</Chip>
      </div>

      {/* Divider line for UI separation */}
      <div className="divider"></div>

      {/* Table to display various node details. */}
      <table className="table rounded-xl bg-slate-950/70 w-full">
        <tbody className="">
          {/* Row for current balance */}
          <tr>
            <th className="text-white text-base">Current balance</th>
            <td className="text-right break-all text-white">
              {NodeTableData.current_balance} USDT
            </td>
          </tr>

          {/* Row for first transaction time */}
          <tr>
            <th className="text-white text-base">First txn time</th>
            <td className="text-right break-all text-white">{NodeTableData.timestamp}</td>
          </tr>

          {/* Row for transactions */}
          <tr>
            <th className="text-white text-base">Transactions</th>
            <td className="text-right break-all text-white">
              {NodeTableData.transactions}
            </td>
          </tr>

          {/* Row for maximum transaction amount */}
          <tr>
            <th className="text-white text-base">Maximum txn amount</th>
            <td className="text-right break-all text-white">
              {NodeTableData.max_transaction_value} USDT
            </td>
          </tr>

          {/* Row for total received amount */}
          <tr>
            <th className="text-white text-base">Total received</th>
            <td className="text-right break-all text-white">
              {NodeTableData.total_received} USDT
            </td>
          </tr>

          {/* Row for total sent amount */}
          <tr>
            <th className="text-white text-base">Total sent</th>
            <td className="text-right break-all text-white">
              {NodeTableData.total_sent} USDT
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NodeTable;
