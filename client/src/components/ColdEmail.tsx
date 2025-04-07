/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { addNodeToSequence } from "../services";

const ColdEmailModal = ({ isOpen, onClose, seqId, emails, setNodes }: any) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
   console.log(seqId);
    
   const handleAddNode = async (type: any, data: any) => {
    try {
      const newNode = await addNodeToSequence(seqId, { type, data });
  
      console.log("Node Added Successfully:", newNode);
  
      setNodes((prev:any) => {
        const lastNode = prev[prev.length - 1];
  
        return [
          ...prev,
          {
            id: newNode._id,
            type: type,
            position: {
              x: lastNode?.position?.x || 0,
              y: (lastNode?.position?.y || 0) + 100,
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md w-[800px] h-[600px]">
        <h2 className="text-2xl font-semibold mt-2 ">Create Cold Email</h2>
        <hr className="text-gray-300 my-4" />
        <form
          onSubmit={(e) =>{
           e.preventDefault()
            handleAddNode("cold-email", {
              label: "Email",
              emails: emails,
              subject: String,
              body: String,
              delayTime: Number,
            })
           } }
        >
          <div className="flex flex-col gap-2">
            <label className="text-xl text-black">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Email Subject..."
              className="border border-black text-black placeholder-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500 mt-1"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label className="text-xl text-black">Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              placeholder="Email Body"
              className="border border-black text-black placeholder-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500 resize-none mt-1"
              rows={6} // optional: controls height
            />
          </div>

          <div className="mt-8 " >
            <button
              type="submit"
              className="bg-blue-100 border-2 border-blue-500 rounded-md py-1 text-xl font-semibold px-3 hover:bg-blue-500 hover:text-white mr-4"
            >
              Create
            </button>
            <button type="button" onClick={onClose} 
              className="bg-blue-100 border-2 border-blue-500 rounded-md py-1 text-xl font-semibold px-3 hover:bg-blue-500 hover:text-white"
              >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColdEmailModal;
