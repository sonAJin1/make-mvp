import React from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  Node,
  Edge,
  Viewport,
  ReactFlowProvider
} from 'reactflow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { UserFlow } from '../../types/flow';
import 'reactflow/dist/style.css';

interface FlowViewerProps {
  open: boolean;
  onClose: () => void;
  flow: UserFlow;
  title: string;
}

const FlowViewer: React.FC<FlowViewerProps> = ({ open, onClose, flow, title }) => {
  console.log('FlowViewer Props:', { open, flow, title });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>{title} - User Flow</DialogTitle>
      <DialogContent>
        <ReactFlowProvider>
          <div style={{ 
            width: '100%', 
            height: '600px', 
            backgroundColor: '#f8f8f8',
            border: '1px solid #ddd'
          }}>
            <ReactFlow
              nodes={flow.nodes}
              edges={flow.edges}
              fitView
              defaultEdgeOptions={{
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#555' }
              }}
              style={{ background: '#fff' }}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FlowViewer;