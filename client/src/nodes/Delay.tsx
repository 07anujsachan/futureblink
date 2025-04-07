/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";
import { Clock } from "lucide-react";
import { useState } from "react";

export const DelayNode = ({ data }: any) => {
  const [hovered, setHovered] = useState(false);
console.log(data);

  return (
    <div
      className="relative bg-white rounded-lg w-80  p-4 flex items-center gap-4 shadow-md hover:border-blue-400 transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
   


      <div className="bg-blue-50 p-3 rounded-md border border-blue-200 flex items-center justify-center">
        <Clock size={32} className="text-blue-400" />
      </div>


      <div className="flex flex-col">
        <span className="text-gray-800 font-semibold">Delay</span>
        <span className="text-gray-600">
          Wait <span className="text-blue-500">{data.delayTime}</span>
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};
