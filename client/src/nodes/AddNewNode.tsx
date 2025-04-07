/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddNodeButton = ({ onAdd }: any) => {
    return (
      <div
        style={{
        
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
  