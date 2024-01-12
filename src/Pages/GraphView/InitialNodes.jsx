import { truncateLabel } from "../Address/truncateLabel";

const colorPalette = [
  "#3F2021", // DARK BROWN
  "#B04A5A", // DEEP CARMINE PINK
  "#BA5B3F", // COPPER RUST
  "#CB9576", // COPPER RUST
  "#7FA0AC", // BLUE GRAY
];

export const generateInitialNodes = (Nodes, radius = 400) => {
  const numNodes = Nodes.length;
  const angleIncrement = (2 * Math.PI) / numNodes;

  return Nodes.map((nodeData, index) => ({
    id: nodeData.addressId,
    position: {
      x: radius * Math.cos(index * angleIncrement),
      y: radius * Math.sin(index * angleIncrement),
    },
    data: {
      label: nodeData.addressId,
      type: nodeData.type,
      color: null,
      selected: false,
    },

    type: "CustomNode",
  }));
};
