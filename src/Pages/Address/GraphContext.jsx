import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const NodeContext = createContext("");

const NodeContextProvider = ({ children }) => {
  const [NodeID, SetNodeID] = useState(["All", ""]);
  const [ShowAddress, SetShowAddress] = useState(true);
  const [AllNodes, SetAllNode] = useState([]);
  const [UniqueTransactions, SetuniqueTransactions] = useState([]);
  const [AllTransactions, SetAllTransactions] = useState([]);
  const [NodeTableData, SetNodeTableData] = useState({});
  const [EdgeID, SetEdgeID] = useState(["All", "", ""]);
  const [EdgeTableData, SetEdgeTableData] = useState({});
  useEffect(() => {
    const fetchNodesData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/addresses/" + NodeID[0]
        );
        const { response: addresses } = response.data;

        SetAllNode(addresses);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchNodesData();

    const fetchUniqueTransactionsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/uniqueTransactions/" + NodeID[0]
        );
        const { response: uniqueTransactions } = response.data;
        SetuniqueTransactions(uniqueTransactions);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchUniqueTransactionsData();
    const fetchAllTransactionsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/Transactions/" + EdgeID[0]
        );
        const { response: Transactions } = response.data;
        SetAllTransactions(Transactions);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchAllTransactionsData();
    const fetchNodeTableData = async () => {
      if (NodeID[0] !== "All") {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/NodeTable/" + NodeID[0]
          );
          const { response: data } = response.data;
          SetNodeTableData(data);
        } catch (error) {
          console.error("Error fetching address data:", error);
        }
      }
    };
    fetchNodeTableData();
    const fetchEdgeTableData = async () => {
      if (EdgeID[0] !== "All") {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/EdgeTable/" + EdgeID[0]
          );
          const { response: data } = response.data;
          SetEdgeTableData(data);
        } catch (error) {
          console.error("Error fetching address data:", error);
        }
      }
    };
    fetchEdgeTableData();
  }, [NodeID, EdgeID]);
  return (
    <NodeContext.Provider
      value={{
        NodeID,
        SetNodeID,
        EdgeID,
        SetEdgeID,
        AllNodes,
        SetAllNode,
        ShowAddress,
        SetShowAddress,
        AllTransactions,
        SetAllTransactions,
        UniqueTransactions,
        SetuniqueTransactions,
        NodeTableData,
        SetNodeTableData,
        EdgeTableData,
        SetEdgeTableData,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

const UseNodeContext = () => {
  return useContext(NodeContext);
};

export { NodeContextProvider, UseNodeContext, NodeContext };
