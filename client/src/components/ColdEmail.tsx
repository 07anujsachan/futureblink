import React, { useState } from "react";
import { createNode } from "../services"; // <-- your service function

const ColdEmailModal = ({ isOpen, onClose }: any ) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: any ) => {
    e.preventDefault();
    try {
      const newNode = {
        name: "Cold Email",
        type: "Email",
        data: {
          subject,
          body,
        },
      };
      await createNode(newNode);
      alert("Node created successfully!");
      onClose();
      setSubject("");
      setBody("");
    } catch (error) {
      console.error("Error creating node:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Create Cold Email</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Some basic inline styles for the modal
const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "400px",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex", justifyContent: "space-between",
  },
};

export default ColdEmailModal;
