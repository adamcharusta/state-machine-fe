import PropTypes from "prop-types";
import React from "react";

export default function ImgBox({ src, isLoading, isError, isEmpty }) {
  const animation = isLoading ? "animate-pulse" : "";
  const content = isError ? (
    <span className="font-bold">
      Oops, something went wrong, please try again
    </span>
  ) : (
    <img src={src} alt={src} />
  );
  const background = isError ? "bg-red-300" : "bg-green-300";

  return (
    <div
      className={`w-96 h-96 flex justify-center items-center flex-col ${animation} ${background}`}
    >
      {isEmpty && (
        <span className="font-bold">
          What are you waiting for? Upload a photo.
        </span>
      )}
      {content}
    </div>
  );
}

ImgBox.propTypes = {
  src: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isEmpty: PropTypes.bool,
};

ImgBox.defaultProps = {
  src: null,
  isLoading: false,
  isError: false,
  isEmpty: true,
};
