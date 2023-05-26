import React from "react";

const GenericButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-blue-800 duration-300"
    >
      {props.children}
    </button>
  );
};

export default GenericButton;
