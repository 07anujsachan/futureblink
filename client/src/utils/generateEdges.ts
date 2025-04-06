import type { Edge, Node } from '@xyflow/react';

export const generateEdges = (nodes: Node[]): Edge[] => {
  const edges: Edge[] = [];

  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `e-${nodes[i].id}-${nodes[i + 1].id}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      type: 'smoothstep', // or 'default'
    });
  }

  return edges;
};
