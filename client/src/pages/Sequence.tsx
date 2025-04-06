/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SequenceBuilderPage.tsx

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type OnConnect
} from '@xyflow/react';

import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { initialEdges } from '../edges';
import { initialNodes } from '../nodes';
import { AppNode, LeadSourceNode } from '../nodes/types';


import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';

export default function SequenceBuilderPage() {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get('name');

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emails, setEmails] = useState<string>('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect: OnConnect = (connection) =>
    setEdges((eds) => addEdge(connection, eds));

  // Auto add Lead Source Node when empty
  useEffect(() => {
    if (nodes.length === 0) {
      const leadSourceNode: LeadSourceNode = {
        id: uuidv4(),
        type: 'lead-source',
        position: { x: 250, y: 100 },
        data: {
          label: 'Add Lead Source',
        },
      };
      setNodes([leadSourceNode]);
    }
  }, [nodes, setNodes]);

  const handleNodeClick = (event: any, node: any) => {
    if (node.data.label === 'Add Lead Source') {
      setSelectedNodeId(node.id);
      setShowEmailModal(true);
    }
  };

  const handleSaveEmails = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId && node.type === 'lead-source') {
          return {
            ...node,
            data: {
              ...node.data,
              emails: emails.split(',').map((e) => e.trim()),
            },
          }
        }
        return node
      })
    )
    setShowEmailModal(false)
    setEmails('')
  }
  
  


  return (
    <div className="w-full h-screen flex flex-col">
      <Header/>
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
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
          style={{height: "72vh", border: "1px solid rgb(230, 230, 230)", borderRadius: "12px" }}
        >
          <MiniMap />
          <Controls />
          <Background bgColor='#f2f2f2' />

          {/* Floating Add Node Button */}
          <button
            onClick={() => {
              console.log('Open Add Node Modal')
            }}
            className="absolute bottom-5 right-5 bg-blue-600 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            +
          </button>
        </ReactFlow>
      </div>
      {showEmailModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-[400px]">
      <h2 className="text-lg font-semibold mb-4">Enter Emails (comma separated)</h2>
      <input
        type="text"
        className="w-full border px-3 py-2 mb-4"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="abc@gmail.com, xyz@gmail.com"
      />
      <div className="flex justify-end gap-3">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => {
            setShowEmailModal(false);
            setEmails('');
          }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSaveEmails}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
