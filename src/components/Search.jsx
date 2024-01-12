import {
  Card,
  CardBody,
  Input,
  Listbox,
  ListboxItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UseNodeContext } from "../Pages/Address/GraphContext";

const Search = (props) => {
  const { NodeID, SetNodeID, SetEdgeID, SetShowAddress } = UseNodeContext(); // Include SetNodeID
  const [AllAddresses, SetAllAddresses] = useState([]);
  const [AllTransactions, SetAllTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  // Initialize the filterType state with the default value "Address"
  const [filterType, setFilterType] = useState("1");
  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  useEffect(() => {
    const fetchAllNodesData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/addresses/All");
        const { response: addresses } = response.data;
        SetAllAddresses(addresses);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchAllNodesData();
    const fetchAllTransactionsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/Transactions/All"
        );
        const { response: Transactions } = response.data;
        SetAllTransactions(Transactions);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchAllTransactionsData();
  }, []);
  let filteredResults = [];
  if (filterType === "1") {
    filteredResults = AllAddresses.filter((node) =>
      node.addressId.includes(search)
    );
  } else if (filterType === "2") {
    filteredResults = AllTransactions.filter((txn) =>
      txn.hash.includes(search)
    );
  }

  useEffect(() => {
    // Check if the user types "all" and set NodeID accordingly
    if (search.toLowerCase() === "all") {
      SetNodeID(["All", ""]);
      SetEdgeID(["All", "", ""]);
    }
  }, [search, SetNodeID]);
  return (
    <div
      onFocus={() => setSearchFocus(true)}
      onBlur={() => setSearchFocus(false)}
    >
      <div className="grid grid-cols-12 justify-between gap-2 gap-x-4 gap-y-2">
        <Select
          label="Filter"
          className="col-span-12 sm:col-span-4"
          size="md"
          textValue={filterType}
          onChange={(e) => handleFilterChange(e.target.value)}
          defaultSelectedKeys={["1"]}
        >
          {/* Set the default select option to "Address" */}
          <SelectItem key={1} value="Address">
            Address
          </SelectItem>
          <SelectItem key={2} value="Transaction">
            Transaction
          </SelectItem>
        </Select>
        <Input
          size="md"
          className="col-span-12 sm:col-span-8"
          radius="md"
          label={`Enter the wallet...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center relative">
        <Card
          className={`z-50 w-full absolute mt-2 transition-[height] duration-150 ease-in-out ${
            search.length > 0 && searchFocus ? "h-auto max-h-40" : "h-0"
          }`}
        >
          <CardBody className="p-1">
            <Listbox aria-label="Results">
              {filteredResults.map((result, index) => (
                <ListboxItem
                  key={index}
                  textValue={
                    filterType === "1" ? result.addressId : result.hash
                  }
                  onClick={() => {
                    if (filterType === "1") {
                      SetNodeID([result.addressId, result.type]);
                      SetShowAddress(false);
                    } else if (filterType === "2") {
                      SetEdgeID([
                        result.hash,
                        result.from_address,
                        result.to_address,
                      ]);

                      SetShowAddress(true);
                    }
                    if (props.onSearch) props.onSearch(); // Invoke the onSearch prop after the search
                  }}
                >
                  {filterType === "1" ? (
                    result.addressId
                  ) : (
                    <Link key={result.hash} href={`/txn/${result.hash}`}>
                      {result.hash}
                    </Link>
                  )}
                </ListboxItem>
              ))}
            </Listbox>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Search;
