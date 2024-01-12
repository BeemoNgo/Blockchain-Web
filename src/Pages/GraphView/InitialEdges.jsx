export const generateInitialEdges = (UniqueTransactions) =>
  UniqueTransactions.map((EdgeData) => ({
    // Assign the hash of the transaction as the unique ID for the edge
    id: EdgeData.hash,
    // Specify the position for the edge
    position: { x: 10, y: 0 },
    // The source address of the transaction (from_address)
    source: EdgeData.from,
    // The destination address of the transaction (to_address)
    target: EdgeData.to,
    // Animate the edge for better visualization
    animated: true,
    // Label for the edge, displaying total amount and count of transactions
    label: EdgeData.total + " USDT " + EdgeData.count + " txn",
  }));
