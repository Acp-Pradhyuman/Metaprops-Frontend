import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({
  color = "white",
  bgColor = "white",
  height = 50,
  width = 50,
  margin = "5em 0"
}) => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
        margin: `${margin}`,
      }}
    >
      <Oval
        color={color}
        secondaryColor={bgColor}
        height={height}
        width={width}
        strokeWidth={7}
      />
    </div>
  );
};

export default Loader;
