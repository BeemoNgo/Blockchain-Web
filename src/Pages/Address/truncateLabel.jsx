export const truncateLabel = (label) => {
  return (
    // Extract the first 4 characters from the label
    label.substring(0, 4) +
    // Add ellipses
    "..." +
    // Extract the last 4 characters from the label
    label.substring(label.length - 4, label.length)
  );
};
export default truncateLabel;
