import PropTypes from "prop-types";
import React from "react";

export default function Container({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 bg-gray-300">
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
