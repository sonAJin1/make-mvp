import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ComponentType } from '../../types/component';

interface ComponentItem {
  id: string;
  type: ComponentType;
  label: string;
  icon?: string;
}

const componentItems: ComponentItem[] = [
  { id: 'nav', type: ComponentType.NAVIGATION, label: 'Navigation Bar' },
  { id: 'button', type: ComponentType.BUTTON, label: 'Button' },
  { id: 'input', type: ComponentType.INPUT, label: 'Input Field' },
  { id: 'card', type: ComponentType.CARD, label: 'Card' }
];

const ComponentPalette: React.FC = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, component: ComponentItem) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
  };

  return (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Components
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {componentItems.map((item) => (
          <Paper
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            sx={{
              p: 2,
              cursor: 'move',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <Typography>{item.label}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ComponentPalette;