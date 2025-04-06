import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { AppNode } from './types';

export const initialNodes: AppNode[] = [
 
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,

} satisfies NodeTypes;
