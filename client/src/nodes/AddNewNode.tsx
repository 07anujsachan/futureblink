/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddNodeButton = ({ nodes, onAdd }: any) => {
    const lastNode = nodes[nodes.length - 1];
  
    if (!lastNode) return null;
  
    return (
      <div
        style={{
          position: "absolute",
          left: lastNode.position.x + 50, // center align
          top: lastNode.position.y + 250, // below last node
          cursor: "pointer",
          background: "#000",
          color: "#fff",
          padding: "8px",
          borderRadius: "50%",
        }}
        onClick={onAdd}
      >
        +
      </div>
    );
  };
  