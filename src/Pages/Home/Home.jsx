import React, { useEffect, useState } from "react";
import NodeTable from "../Address/NodeTable";
import Search from "../../components/Search";
import Introduction from "../About/Introduction";
import { UseNodeContext } from "../Address/GraphContext";
import { Tabs, Tab } from "@nextui-org/react";
import LoadGraph from "../GraphView/LoadGraph";
import EdgeTable from "../Address/EdgeTable";

const Home = () => {
  const { ShowAddress, NodeID, EdgeID, SetNodeID, SetEdgeID } = UseNodeContext();
  const [hasSearched, setHasSearched] = useState(false); //new state variable to track if a user has searched or not
  // Set NodeID and EdgeID to their initial values when the component mounts
  useEffect(() => {
    SetNodeID(["All", ""]);
    SetEdgeID(["All", "", ""]);
  }, []); // Empty dependency array to run this effect once on mount

  // Check if NodeID[0] is "All" to determine whether to hide NodeTable
  const shouldHideNodeTable = NodeID[0] === "All" && EdgeID[0] === "All";

  return (
    <>
      <Introduction />

      <Search onSearch={() => setHasSearched(true)} />
        {hasSearched && (
          <div
            className={`grid ${
              shouldHideNodeTable
                ? " lg:grid-rows-3 h-700"
                : " lg:grid-rows-6 h-1200"
            } grid-cols-3 gap-x-4 gap-y-2 h-1200 lg:h-700`}
          >
            <div
              className={`rounded-xl row-start-1 col-span-3 lg:col-span-1 lg:row-start-1 lg:row-span-6 bg-slate-950/40 shadow-xl my-4 mx-auto w-full p-4 ${
                shouldHideNodeTable ? " hidden" : " row-span-1"
              }`}
            >
              <div className="text-xl font-medium w-full">
                {ShowAddress ? <EdgeTable /> : <NodeTable />}
              </div>
            </div>

            <div
              className={`rounded-xl  col-span-3 row-span-3${
                shouldHideNodeTable
                  ? " row-start-1 lg:col-span-3"
                  : " row-start-2 lg:col-span-2"
              } lg:row-start-1 lg:row-span-6 bg-slate-950/40 shadow-xl my-4 mx-auto w-full p-4`}
            >
              <div id="graph-section" className="text-xl font-medium w-full h-full">
                <LoadGraph />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Home;
