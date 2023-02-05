import React from "react";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

