/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SequenceBuilderPage.tsx

import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddBlockModal from "../components/AddBlockModal";
import { Header } from "../components/Header";
import { LeadSourceModal } from "../components/LeadSourceModal";
import { initialNodes } from "../nodes";
import { AppNode } from "../nodes/types";
import { getSequenceById } from "../services";

export default function SequenceBuilderPage() {
  const location = useLocation();
  const { id } = useParams();

  const name = new URLSearchParams(location.search).get("name");

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [emails, setEmails] = useState<string>("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeSequence, setActiveSequence] = useState(null);

  const onConnect: OnConnect = (connection) =>
    setEdges((eds) => addEdge(connection, eds));

  const getSequence = async () => {
    try {
      const data = await getSequenceById(id);
      setActiveSequence(data);
      console.log(activeSequence);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSequence();
  }, []);

  const handleNodeClick = (event: any, node: any) => {
    setSelectedNodeId(node.id);
  };
  const activeNode = nodes.find((node: any) => node.id === selectedNodeId);

  console.log(emails);
 
  const handleSaveEmails = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId && node.type === "lead-source") {
          return {
            ...node,
            data: {
              ...node.data,
              emails: emails.split(",").map((e) => e.trim()),
            },
          };
        }
        return node;
      })
    );
    setSelectedNodeId(null);
    setEmails("");
  };

  const renderNodes: AppNode[] = [...nodes];

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      {/* Top Action Bar */}
      <div className="w-full px-12 py-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{name}</h1>

        <div className="flex gap-3 items-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {}}
          >
            Save & Schedule
          </button>

          <button
            className="bg-white border-blue-600 border-2 text-blue-600 px-4 py-2 rounded"
            onClick={() => {}}
          >
            Save as Paused
          </button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 px-12 relative">
        <ReactFlow
          nodes={renderNodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
          style={{
            height: "72vh",
            border: "1px solid rgb(230, 230, 230)",
            borderRadius: "12px",
          }}
        >
          <MiniMap />
          <Controls />
          <Background bgColor="#f2f2f2" />

          {/* Floating Add Node Button */}
          {/* <button
            onClick={() => {
              console.log("Open Add Node Modal");
            }}
            className="absolute  bg-blue-600 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            +
          </button> */}
        </ReactFlow>
      </div>
      {activeNode?.data?.label === "Add Lead Source" && (
        <LeadSourceModal
          emails={emails}
          setEmails={setEmails}
          handleSaveEmails={handleSaveEmails}
          setSelectedNodeId={setSelectedNodeId}
        />
      )}

      {activeNode?.data?.label === "+" && (
        <AddBlockModal
          onSelect={() => console.log("hello")}
          onClose={() => setSelectedNodeId(null)}
          seqId={id}
        />
      )}
    </div>
  );
}
