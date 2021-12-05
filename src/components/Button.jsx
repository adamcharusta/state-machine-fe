import PropTypes from "prop-types";
import React from "react";
import noop from "lodash/noop";

export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="bg-indigo-300 hover:bg-indigo-400 disabled:opacity-50 disabled:bg-indigo-300 h-10 w-48 rounded-md font-bold disabled:cursor-wait"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: noop,
  disabled: false,
};
