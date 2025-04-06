/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { addNodeToSequence } from "../services";

const ColdEmailModal = ({ isOpen, onClose, seqId }: any) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleAddNode = async (type: any, data: any) => {
    try {
      const newNode = await addNodeToSequence(seqId, { type, data });
      console.log("Node Added Successfully:", newNode);
      // add to reactflow nodes here
    } catch (err) {
      console.error("Failed to add node:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <h2>Create Cold Email</h2>
        <form onSubmit={() => handleAddNode("cold-email", {
      label: "Email",
      emails: ,
      subject: String,
      body: String,
      delayTime: Number,
  })}>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColdEmailModal;
