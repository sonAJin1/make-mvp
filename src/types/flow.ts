import { Node, Edge, EdgeMarker } from 'reactflow';

export interface FlowNode {
  id: string;
  type: 'screen' | 'action' | 'decision';
  data: {
    label: string;
  };
  position: { x: number; y: number };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'default' | 'straight' | 'step' | 'smoothstep' | 'bezier';
  animated?: boolean;
  style?: React.CSSProperties;
  markerStart?: EdgeMarker;
  markerEnd?: EdgeMarker;
  data?: any;
}

export interface UserFlow {
  nodes: FlowNode[];
  edges: FlowEdge[];
}