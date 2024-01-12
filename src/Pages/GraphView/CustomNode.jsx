import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import Button from "@mui/material/Button";
import { truncateLabel } from "../Address/truncateLabel";
// import { Tooltip, Button } from "@nextui-org/react";
import { Box, Tooltip } from "@mui/material";
import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/GraphContext";

const CustomNode = ({ data }) => {
  // Destructure methods from the NodeContext to manage the global state regarding node interactions
  const { NodeID, SetNodeID, SetShowAddress } = UseNodeContext();
  
  // useState for managing hover state to determine when a user is hovering over a node
  const [hover, setHover] = useState(false);
  
  // Dynamically setting the text color based on the `data.type` of a node
  let textcolor = null;
  if (data.type == "eoa") {
    textcolor = "success";
  } else {
    textcolor = "warning";
  }

  // If NodeID matches the label of this node, set text color to indicate selection/error
  if (NodeID[0] === data.label) {
    textcolor = "error";
  }
  return (
    <Button
    // onClick handler updates global state with the label and type of the node, and hides address UI component  
    onClick={() => {
        SetNodeID([data.label, data.type]);
        SetShowAddress(false);
      }}
      // Dynamically set color using textcolor
      color={textcolor}
    >
      {/* Tooltip to display the type of the node when hovered. */}
      <Tooltip title={data.type}>
        <Box
          className={`px-4 py-2 shadow-md rounded-full bg-white border-2 border-stone-400 ease-in-out duration-300 ${
            hover ? "border-solid" : ""
          }`}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Text box to display the node label, truncated or full based on hover state. */}
          <Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "inherit",
            }}
            className={`ml-2 flex justify-center items-center`}
          >
            {/* Conditional rendering: Display full label if hover is true, else display truncated label. */}
            <div className="text-sm">
              {hover ? data.label : truncateLabel(data.label)}
            </div>
          </Box>

          {/* Handles to create edges (links) in the graph. */}
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
        </Box>
      </Tooltip>
    </Button>
  );
};

export default memo(CustomNode);
