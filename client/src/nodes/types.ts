import type { BuiltInNode, Node } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type LeadSourceNode = Node<{ label: string; emails?: string[] }, 'lead-source'>;
export type ColdEmailNode = Node<{ label: string; subject: string; body: string }, 'cold-email'>;
export type DelayNode = Node<{ label: string;  time: string }, 'delay'>;
export type AddButtonNode = Node<{ label: string }, 'add-node-button'>;
export type AppNode = BuiltInNode | PositionLoggerNode | LeadSourceNode | ColdEmailNode | DelayNode | AddButtonNode;