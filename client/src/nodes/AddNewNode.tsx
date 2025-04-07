import { Handle, Position } from "@xyflow/react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddNodeButton = ({ onAdd }: any) => {
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={onAdd}
      className="w-80 flex justify-center items-center"
    >
      <div
        style={{
          cursor: "pointer",
          border: "solid 2px #2B80FF",
          color: "#2B80FF",
          padding: " 2px 10px",
          fontSize: "20px",
          borderRadius: "8px",
          textAlign: "center",
          width: "3rem",
        }}
      >
        +
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    </div>
  );
};
