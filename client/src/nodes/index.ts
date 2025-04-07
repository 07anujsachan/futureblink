import type { NodeTypes } from '@xyflow/react';

import { AddNodeButton } from './AddNewNode';
import { ColdEmailNode } from './ColdEmailNode';
import { LeadSourceNode } from './LeadSourceNode';
import { AppNode } from './types';

export const initialNodes: AppNode[] = [
  
  
];

export const nodeTypes = {
  'lead-source': LeadSourceNode,
  'cold-email': ColdEmailNode,
  'add-node-button': AddNodeButton,
} satisfies NodeTypes;


