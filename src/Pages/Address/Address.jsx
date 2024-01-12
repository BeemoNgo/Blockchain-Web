import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { UseNodeContext } from "../Address/GraphContext";
import { Box, Tooltip } from "@mui/material";
import { CircularProgress } from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import axios from "axios";
import truncateLabel from "./truncateLabel";
import { Link } from "@nextui-org/react";

const Address = () => {
  const { address_id } = useParams();
  const [addressData, setAddressData] = useState([]);
  const [Address, SetAddress] = useState([]);
  const { NodeID, NodeTableData, SetNodeTableData } = UseNodeContext();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Function to convert a timestamp to a date-time string
  const convertTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    return date.toLocaleString(); // You can customize the format using toLocaleString options
  };

  // Effect hook that fetches address data and node table data from an API when the component mounts
  useEffect(() => {
    // Fetch paginated address table data from the API
    const fetchData = async () => {
      try {
        if (page === 1) {
          // Reset addressData when loading the first page
          setAddressData([]);
        }

        const response = await axios.get(
          `http://localhost:8000/AddressTable/${address_id}?page=${page}`
        );
        const { response: AddressTable } = response.data;

        setAddressData((prevData) => [...prevData, ...AddressTable]);
        setIsLoading(false);
        const response2 = await axios.get(
          `http://localhost:8000/AddressTable/${address_id}?page=${page + 1}`
        );
        const { response: next } = response2.data;
        // Check if there are more pages to load
        setHasMore(next.length !== 0);
      } catch (error) {
        console.error("Error fetching address data:", error);
        setIsLoading(false);
      }
    };
    fetchData();

    // Fetch node table data from the API
    const fetchNodeTableData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/NodeTable/" + address_id
        );
        const { response: data } = response.data;
        SetNodeTableData(data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchNodeTableData();

    // Fetch address details from the API
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/address/" + address_id
        );
        const { response: address } = response.data;
        SetAddress(address);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchAddress();
  }, [address_id, page]);

  // Function to handle loading more data when user clicks the "Load More" button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="mt-10">
      <div className="text-white">Address Details</div>
      <div className="font-bold text-xl my-1 break-all text-white">{address_id}</div>
      <div className="flex flex-wrap gap-2 mt-4">
        {Address && Address.length > 0 ? (
          <Chip color="success">{Address[0].type}</Chip>
        ) : (
          <div>
            <CircularProgress size="sm" aria-label="Loading..." />
          </div>
        )}
      </div>

      <div className="divider"></div>

      {/* Display node table data with current balance, transaction details, etc. */}
      <div className="bg-slate-900/50 shadow-xl rounded-xl w-1/2 justify-center item-center p-3 m-auto">
        <table className="table rounded-xl bg-black/30">
          <tbody className="">
            <tr>
              <th className="text-white text-lg">Current balance</th>
              <td className="text-right break-all text-white text-base">
                {NodeTableData.current_balance} USDT
              </td>
            </tr>
            <tr>
              <th className="text-white text-lg">First txn time</th>
              <td className="text-right text-white break-all text-base">
                {NodeTableData.timestamp}
              </td>
            </tr>
            <tr>
              <th className="text-white text-lg">Transactions</th>
              <td className="text-right text-white break-all text-base">
                {NodeTableData.transactions}
              </td>
            </tr>
            <tr>
              <th className="text-white text-lg">Maximum txn amount</th>
              <td className="text-right text-white break-all text-base">
                {NodeTableData.max_transaction_value} USDT
              </td>
            </tr>
            <tr>
              <th className="text-white text-lg">Total received</th>
              <td className="text-right text-white break-all">
                {NodeTableData.total_received} USDT
              </td>
            </tr>
            <tr>
              <th className="text-white text-lg">Total sent</th>
              <td className="text-right text-white break-all text-base">
                {NodeTableData.total_sent} USDT
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Table
        isHeaderSticky
        aria-label="Address table with infinite pagination"
        className="mt-10"
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center mt-4">
              <button
                className="btn btn-primary"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                Load More
              </button>
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="hash">Hash</TableColumn>
          <TableColumn key="to_address">To Address</TableColumn>
          <TableColumn key="value">Value</TableColumn>
          <TableColumn key="transaction_index">Transaction Index</TableColumn>
          <TableColumn key="gas">Gas</TableColumn>
          <TableColumn key="gas_used">Gas Used</TableColumn>
          <TableColumn key="gas_price">Gas Price</TableColumn>
          <TableColumn key="transaction_fee">Transaction Fee</TableColumn>
          <TableColumn key="block_number">Block Number</TableColumn>
          <TableColumn key="block_hash">Block Hash</TableColumn>
          <TableColumn key="block_timestamp">Block Timestamp</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={addressData}
          loadingContent={<Spinner color="white" />}
        >
          {/* Map through each item and display it in a table row */}
          {(item) => (
            <TableRow key={item.hash}>
              {/* Define how each cell should render */}
              {(columnKey) => (
                <TableCell>
                  {columnKey === "hash" ||
                  columnKey === "to_address" ||
                  columnKey === "block_hash" ? (
                    <Tooltip title={item[columnKey]}>
                      {columnKey === "to_address" ? (
                        <Link href={`/address/${item[columnKey]}`}>
                          {truncateLabel(item[columnKey])}
                        </Link>
                      ) : columnKey === "hash" ? (
                        <Link href={`/txn/${item[columnKey]}`}>
                          {truncateLabel(item[columnKey])}
                        </Link>
                      ) : (
                        truncateLabel(item[columnKey])
                      )}
                    </Tooltip>
                  ) : columnKey === "block_timestamp" ? (
                    convertTimestampToDateTime(item[columnKey])
                  ) : (
                    item[columnKey]
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Address;
