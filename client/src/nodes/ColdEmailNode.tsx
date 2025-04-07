import { Mail, X } from "lucide-react";
import { useState } from "react";

export const ColdEmailNode = ({ data }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center w-80 p-4 border border-gray-300 rounded-xl bg-white shadow-sm hover:border-purple-400 transition-all"
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
      <div className="flex items-center justify-center w-16 h-12 rounded-lg bg-purple-50 border border-purple-400 mr-4">
        <Mail className="h-8 w-8 text-purple-500" />
      </div>

      {/* Text Content */}
      <div>
        <h3 className="text-gray-800 font-bold text-lg">Email</h3>
        <p className="text-gray-600">
          Subject:{" "}
          <span className="text-purple-600 font-semibold">
            {data.templateName || "Sample Template (added by user)"}
          </span>
        </p>
      </div>
    </div>
  );
};
