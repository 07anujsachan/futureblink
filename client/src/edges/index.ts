import type { EdgeTypes } from '@xyflow/react';
import { CustomEdge } from './CustomEdge';

export const edgeTypes = {
  'default': CustomEdge,
  'smoothstep': CustomEdge,
} satisfies EdgeTypes;
