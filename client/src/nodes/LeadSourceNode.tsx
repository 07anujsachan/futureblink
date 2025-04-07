/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";

export const LeadSourceNode = ({ data }: any) => {
  console.log(data)
  return (
    <div className="w-80 h-26 border border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white cursor-pointer hover:shadow-md transition">
      <div className="text-2xl text-gray-800 ">+</div>
      <h3 className="text-gray-700 font-semibold">
        {data.label || "Add Lead Source"}
      </h3>
      <p className="text-gray-800 text-sm  ">
    {data.emails.length !== 0 ? "Leads added! Click to add more" : "    Click to add leads in the sequence"}
      </p>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};
