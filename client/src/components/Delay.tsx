import React, { useState } from "react";
import { X } from "lucide-react"; // optional, nice X icon
import { addNodeToSequence } from "../services"
type DelayProps = {
  onClose: () => void;
};

const Delay: React.FC<DelayProps> = ({ onClose }) => {
  const [delayNumber, setDelayNumber] = useState("");
  const [delayTime, setDelayTime] = useState("");
  
  return (
    <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
      <div className="relative  bg-gray-100 p-6 rounded-lg shadow-lg w-[800px] h-[600px]">
        {/* Cross button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black border-3 rounded-md border-black hover:border-red-500 hover:text-red-500 font-semibold"
        >
          <X size={24} />
        </button>

        <h2 className="text-4xl font-semibold mb-2 mt-4">Wait</h2>
        <p className="text-lg font-medium text-gray-500 mb-4">
          Add a delay between blocks.
        </p>
        <hr className="text-gray-300 mb-6" />
        <div className="flex flex-col gap-4">
            <form 
           >

           
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-xl font-semibold">
              Wait For
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500"
              placeholder="Enter number"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-xl font-semibold">
              Wait Type
            </label>
            <select className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500">
              <option>Days</option>
              <option>Hours</option>
              <option>Minutes</option>
              <option>Seconds</option>
            </select>
          </div>
          </form>
          <button className="bg-blue-600  text-white rounded-md py-2 px-3  hover:bg-blue-700">
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delay;
