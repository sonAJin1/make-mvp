import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UIComponent, ComponentType } from '../../types/component';

interface DraggableComponentProps {
  component: UIComponent;
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  onMouseDown,
  onResizeMouseDown,
  isDragging,
}) => {
  const renderComponent = () => {
    switch (component.type) {
      case ComponentType.NAVIGATION:
        return (
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Navigation</Typography>
            </Toolbar>
          </AppBar>
        );
      
      case ComponentType.LOGIN_FORM:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Username" variant="outlined" />
            <TextField label="Password" type="password" variant="outlined" />
            <Button variant="contained" color="primary">Login</Button>
          </Box>
        );
      
      case ComponentType.BUTTON:
        return <Button variant="contained">Button</Button>;
      
      case ComponentType.INPUT:
        return <TextField label="Input field" variant="outlined" />;
      
      case ComponentType.CARD:
        return (
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Card Title</Typography>
            <Typography variant="body2">Card content goes here</Typography>
          </Card>
        );
      
      default:
        return <Box>{component.type}</Box>;
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        left: component.properties.position.x,
        top: component.properties.position.y,
        width: component.properties.size.width,
        height: component.properties.size.height,
        border: '1px solid #ccc',
        backgroundColor: 'white',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      onMouseDown={onMouseDown}
    >
      {renderComponent()}
      <Box
        sx={{
          position: 'absolute',
          right: -5,
          bottom: -5,
          width: 10,
          height: 10,
          backgroundColor: '#1976d2',
          cursor: 'se-resize',
          borderRadius: '50%',
        }}
        onMouseDown={onResizeMouseDown}
      />
    </Box>
  );
};

export default DraggableComponent;