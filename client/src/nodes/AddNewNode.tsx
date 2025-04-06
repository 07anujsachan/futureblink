import { Handle, Position } from '@xyflow/react';

export default function AddNodeButton() {
  return (
    <div  className={`bg-blue-600 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer`}>
      + Add
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
