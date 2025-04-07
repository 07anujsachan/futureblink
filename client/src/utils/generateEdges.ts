/* eslint-disable @typescript-eslint/no-explicit-any */
const createEdgesFromNodes = (nodes:any) => {
    const edges = [];
  
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        id: `edge-${nodes[i].id}-${nodes[i + 1].id}`,
        source: nodes[i].id,
        target: nodes[i + 1].id,
        type: "smoothstep",
        style: { stroke: "gray", strokeWidth: 2 },
      });
    }
  
    return edges;
  };
  
  export default createEdgesFromNodes;
  