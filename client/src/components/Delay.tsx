/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react"; // optional, nice X icon
import { useState } from "react";
import { addNodeToSequence } from "../services";

const Delay = ({
  onClose,
  isOpen,
  setNodes,
  seqId,
}: any) => {
  const [delayNumber, setDelayNumber] = useState("");
  const [delayTime, setDelayTime] = useState("");

  const handleAddNode = async (type: any, data: any) => {
    try {
      const newNode = await addNodeToSequence(seqId, { type, data });

      console.log("Node Added Successfully:", newNode);

      setNodes((prev: any) => {
        const lastNode = prev[prev.length - 1];

        return [
          ...prev,
          {
            id: newNode._id,
            type: type,
            position: {
              x: lastNode?.position?.x || 0,
              y: (lastNode?.position?.y || 0) + 50,
            },
            data: data,
          },
        ];
      });

      onClose();
    } catch (err) {
      console.error("Failed to add node:", err);
    }
  };
  if (!isOpen) return null;
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
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNode("delay", {
                label: "Wait",
                delayTime: `${delayNumber} ${delayTime}`,
              });
            }}
          >
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 text-xl font-semibold">
                Wait For
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500"
                placeholder="Enter number"
                value={delayNumber}
                onChange={(e) => setDelayNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 text-xl font-semibold">
                Wait Type
              </label>
              <select
                value={delayTime}
                onChange={(e) => setDelayTime(e.target.value)}
                className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500"
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
                <option value="seconds">Seconds</option>
              </select>
            </div>
          <button type="submit" className="bg-blue-600  text-white rounded-md py-2 px-3  hover:bg-blue-700">
            Insert
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Delay;
