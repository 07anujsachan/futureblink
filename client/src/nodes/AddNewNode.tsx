/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddNodeButton = ({ onAdd }: any) => {
  return (
    <div
      style={{
        cursor: "pointer",
        border: "solid 2px #2B80FF",
        color: "#2B80FF",
        padding: " 2px 10px",
        fontSize: "20px",
        borderRadius: "8px",
      }}
      onClick={onAdd}
    >
      +
    </div>
  );
};
