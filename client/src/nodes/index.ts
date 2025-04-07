import type { NodeTypes } from '@xyflow/react';

import { v4 as uuidv4 } from 'uuid';
import { AddNodeButton } from './AddNewNode';
import { PositionLoggerNode } from './PositionLoggerNode';
import { AppNode } from './types';

export const initialNodes: AppNode[] = [
  
    {
      id: uuidv4(),
     type: "lead-source",
     position: { x: 250, y: 100 },
     data: {
       label: "Add Lead Source",
     }
    },
    {
      id: 'add-node-button',
      type: 'add-node-button',
      position: { x: 250, y: 200 },
      data: { label: '+' },
    },
  
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'add-node': AddNodeButton,

} satisfies NodeTypes;


