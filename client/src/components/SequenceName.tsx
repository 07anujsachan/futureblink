/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from "@headlessui/react";
import objectId from 'bson-objectid';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSequence } from "../services";

export const SequenceName = ({ isOpen, onClose }: any) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const createSequences = async () => {
    const tempId = objectId().toHexString();
    console.log(tempId)
    try {
      const data = await createSequence({
        _id: tempId,
        name: name,
        status: "Draft",
        nodes: ["605c3c1b8e620f23b8d4b5d1", "605c3c1b8e620f23b8d4b5d2"],
        currentNodeId: null,
        lastExecutedNodeIndex: null,
      });
      if (data) {
        if (!name) return;
        navigate(`/builder/${tempId}?name=${encodeURIComponent(name)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="flex items-center justify-center min-h-screen bg-black/50">
        <Dialog.Panel className="bg-white p-6 rounded max-w-lg w-full space-y-4">
          <Dialog.Title className="text-2xl font-bold">
            Create a Sequence from Scratch
          </Dialog.Title>
          <p>
            Create a new sequence from scratch with multiple building blocks.
          </p>

          <input
            type="text"
            placeholder="Enter a name for your sequence"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full p-2 rounded"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Back
            </button>
            <button
              onClick={createSequences}
              disabled={!name}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Create Sequence
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
