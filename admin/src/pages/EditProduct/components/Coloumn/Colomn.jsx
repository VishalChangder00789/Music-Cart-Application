import React from "react";
import PropTypes from "prop-types";

const NameColumn = ({ name, maxWidth = "100%" }) => {
  const MAX_LENGTH = 100;

  // Truncate the name if it exceeds the maximum length
  const truncatedName =
    name.length > MAX_LENGTH ? `${name.slice(0, MAX_LENGTH)}...` : name;

  return (
    <div
      className="flex"
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth, // Dynamically set maxWidth
      }}
      title={name} // Display the full name on hover
    >
      {truncatedName}
    </div>
  );
};

// PropTypes for validation
NameColumn.propTypes = {
  name: PropTypes.string.isRequired,
  maxWidth: PropTypes.string, // Add maxWidth prop
};

export default NameColumn;
