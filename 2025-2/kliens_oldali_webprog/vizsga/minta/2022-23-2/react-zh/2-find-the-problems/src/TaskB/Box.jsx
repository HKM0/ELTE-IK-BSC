import { useState } from "react";

export const Box = (props) => {
  const [color, setColor] = useState(props.color);
  return (
    <div
      style={{
        position: "absolute",
        top: `${props.y}px`,
        left: `${props.x}px`,
        backgroundColor: color,
        width: "100px",
        height: "100px",
      }}
    ></div>
  );
};
