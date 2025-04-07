import { Clock, X } from "lucide-react";
import { useState } from "react";

export const DelayNode = ({ data }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-lg w-80 shadow-md p-4 flex items-center gap-4 border hover:border-blue-400 transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cross icon */}
      {hovered && (
        <button className="absolute top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full">
          <X size={16} className="text-red-500" />
        </button>
      )}

      {/* Icon box */}
      <div className="bg-blue-50 p-3 rounded-md border border-blue-200 flex items-center justify-center">
        <Clock size={32} className="text-blue-400" />
      </div>

      {/* Text section */}
      <div className="flex flex-col">
        <span className="text-gray-800 font-semibold">Delay</span>
        <span className="text-gray-600">
          Wait <span className="text-blue-500">{data.time || "1 Hour(s)"}</span>
        </span>
      </div>
    </div>
  );
};
