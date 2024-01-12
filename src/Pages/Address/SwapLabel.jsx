
export const SwapLabel = (node,sigma) => {
  // Retrieve the current 'truncated_label' attribute of the node
  let temp_label = sigma.getGraph().getNodeAttribute(node, "truncated_label");
  
  // Set the 'truncated_label' attribute to be the current 'label' attribute
  sigma
    .getGraph()
    .setNodeAttribute(
      node,
      "truncated_label",
      sigma.getGraph().getNodeAttribute(node, "label")
    );

  // Set the 'label' attribute to be the temporarily stored 'truncated_label' from the initial step
  sigma.getGraph().setNodeAttribute(node, "label", temp_label);
  
  // No return value is needed as we are modifying the graph in place
  return null;
};
export default SwapLabel;
