/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEdge } from "@xyflow/react";

export const CustomEdge = (props: any) => {
    return <BaseEdge {...props} style={{ stroke: '#888', strokeWidth: 2 }} />;
  };
  