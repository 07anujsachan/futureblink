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
import { useNavigate, useParams } from "react-router-dom";
import AddBlockModal from "../components/AddBlockModal";
import { Header } from "../components/Header";
import { LeadSourceModal } from "../components/LeadSourceModal";
import { initialNodes } from "../nodes";
import { AppNode } from "../nodes/types";
import { getSequenceById, startSequence } from "../services";
import createEdgesFromNodes from "../utils/generateEdges";

export default function SequenceBuilderPage() {
  const { id } = useParams();
const navigate = useNavigate()
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [emails, setEmails] = useState<string>("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeSequence, setActiveSequence] = useState(null);
  const [allEmails, setAllEmails] = useState<string[]>([]);

  const onConnect: OnConnect = (connection) =>
    setEdges((eds) => addEdge(connection, eds));

  
  useEffect(() => {
    const nonAddButtonNodes = nodes.filter(
      (node) => node.type !== "add-node-button"
    );
    const addButtonNode = nodes.find((node) => node.type === "add-node-button");

    if (!addButtonNode) return;

    const lastNode = nonAddButtonNodes[nonAddButtonNodes.length - 1];

    const updatedAddButtonNode = {
      ...addButtonNode,
      position: {
        x: lastNode?.position?.x || 250,
        y: (lastNode?.position?.y || 100) + 100, // 150px gap below last node
      },
    };

    setNodes([...nonAddButtonNodes, updatedAddButtonNode]);
  }, [nodes.length]);

  const handleSaveAndSchedule = async () => {
    try {
   
  
      await startSequence(id); 
  
     console.log("started");
     
  
      navigate("/dashboard");  // Redirect to Dashboard
  
    } catch (err) {
      console.error(err);
    
    }
  };
  
  const getSequence = async () => {
    try {
      const data = await getSequenceById(id);
      setActiveSequence(data?.sequence);

      const nodesFromBackend = data?.sequence?.nodes?.map(
        (node: any, index: any) => ({
          id: node._id,
          type: node.type,
          position: { x: 250, y: index * 150 },
          data: {
            label: node.data.label,
            emails: node.data.emails,
            subject: node.data.subject,
            body: node.data.body,
            delayTime: node.data.delayTime,
          },
        })
      );

     setNodes([...nodesFromBackend]);
 
     const edges = createEdgesFromNodes(nodesFromBackend);
     setEdges(edges);

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

  const handleSaveEmails = () => {
    let updatedEmails: string[] = [];

    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNodeId && node.type === "lead-source") {
        const currentEmails = emails.split(",").map((e) => e.trim());
        updatedEmails = [...allEmails, ...currentEmails]; // merge previous + current emails

        return {
          ...node,
          data: {
            ...node.data,
            emails: currentEmails,
          },
        };
      }
      return node;
    });

    setNodes(updatedNodes);
    setAllEmails(updatedEmails); // Update your state here
    setSelectedNodeId(null);
    setEmails("");
  };

  const renderNodes: AppNode[] = [...nodes];
  console.log(activeSequence);

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      {/* Top Action Bar */}
      <div className="w-full px-12 py-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{activeSequence?.name}</h1>

        <div className="flex gap-3 items-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSaveAndSchedule}
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
      {activeNode?.data?.label === "Lead Source" && (
        <LeadSourceModal
          emails={emails}
          setEmails={setEmails}
          handleSaveEmails={handleSaveEmails}
          setSelectedNodeId={setSelectedNodeId}
        />
      )}

      {activeNode?.data?.label === "+" && (
        <AddBlockModal
          onClose={() => setSelectedNodeId(null)}
          seqId={id}
          emails={allEmails}
          setNodes={setNodes}
        />
      )}
    </div>
  );
}
