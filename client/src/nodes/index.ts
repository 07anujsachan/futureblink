import type { NodeTypes } from '@xyflow/react';

import { AddNodeButton } from './AddNewNode';
import { ColdEmailNode } from './ColdEmailNode';
import { DelayNode } from './Delay';
import { LeadSourceNode } from './LeadSourceNode';
import { AppNode } from './types';
export const initialNodes: AppNode[] = [
  
  
];

export const nodeTypes = {
  'lead-source': LeadSourceNode,
  'cold-email': ColdEmailNode,
  'add-node-button': AddNodeButton,
  'delay':DelayNode,
} satisfies NodeTypes;


