import type { BuiltInNode, Node } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type LeadSourceNode = Node<{ label: string; emails?: string[] }, 'lead-source'>;
export type AppNode = BuiltInNode | PositionLoggerNode | LeadSourceNode;