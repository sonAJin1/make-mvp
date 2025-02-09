import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UIComponent, ComponentType } from '../../types/component';
import DraggableComponent from './DraggableComponent';
import { DeviceType } from '../../types/device';

interface Position {
  x: number;
  y: number;
}

// Remove local DeviceType definition since we're using it from props
interface CanvasProps {
  selectedTemplate: Template | null;
  deviceType: 'web' | 'mobile';
  onDeviceTypeChange: (type: 'web' | 'mobile') => void;
}

const deviceDimensions = {
  web: { width: 900, height: 600 },
  mobile: { width: 375, height: 812 }
};

const defaultComponentSizes = {
  web: { width: 150, height: 75 },   // Adjusted component sizes for web
  mobile: { width: 100, height: 50 }  // Adjusted component sizes for mobile
};

interface Template {
  id: string;
  type: string;
  label: string;
  components: Array<{
    type: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
}

const Canvas: React.FC<CanvasProps> = ({ selectedTemplate, deviceType, onDeviceTypeChange }) => {
  // Remove local deviceType state since we're using it from props
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [resizing, setResizing] = useState<string | null>(null);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });

  const handleDeviceChange = (event: React.SyntheticEvent, newValue: 'web' | 'mobile') => {
    onDeviceTypeChange(newValue);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentData = JSON.parse(e.dataTransfer.getData('component'));
    const rect = e.currentTarget.getBoundingClientRect();
    
    const newComponent: UIComponent = {
      ...componentData,
      properties: {
        position: {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
        size: defaultComponentSizes[deviceType], // Use device-specific sizes
        style: {},
      },
    };

    setComponents([...components, newComponent]);
  };

  const handleMouseDown = (e: React.MouseEvent, id: string, isResize: boolean = false) => {
    e.stopPropagation();
    if (isResize) {
      setResizing(id);
    } else {
      setDragging(id);
    }
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      
      setComponents(components.map(comp => {
        if (comp.id === dragging) {
          return {
            ...comp,
            properties: {
              ...comp.properties,
              position: {
                x: comp.properties.position.x + dx,
                y: comp.properties.position.y + dy,
              }
            }
          };
        }
        return comp;
      }));
      
      setStartPos({ x: e.clientX, y: e.clientY });
    }
    
    if (resizing) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      
      setComponents(components.map(comp => {
        if (comp.id === resizing) {
          return {
            ...comp,
            properties: {
              ...comp.properties,
              size: {
                width: Math.max(100, comp.properties.size.width + dx),
                height: Math.max(50, comp.properties.size.height + dy),
              }
            }
          };
        }
        return comp;
      }));
      
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };

  useEffect(() => {
    if (selectedTemplate) {
      const scale = deviceType === 'mobile' ? (375 / 900) : 1;
      const templateComponents = selectedTemplate.components.map(comp => ({
        id: `${comp.type}-${Date.now()}-${Math.random()}`,
        type: comp.type as ComponentType,
        properties: {
          position: {
            x: comp.position.x * scale,
            y: comp.position.y * scale
          },
          size: {
            width: comp.size.width * scale,
            height: comp.size.height * scale
          },
          style: {},
        },
      } as UIComponent));
      
      setComponents(templateComponents);
    }
  }, [selectedTemplate, deviceType]); // Add deviceType as dependency

  // Update the canvas container Box component
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
      <Tabs value={deviceType} onChange={handleDeviceChange} sx={{ mb: 2 }}>
        <Tab value="web" label="Web" />
        <Tab value="mobile" label="Mobile" />
      </Tabs>
      
      <Box
        sx={{
          width: deviceDimensions[deviceType].width,
          height: deviceDimensions[deviceType].height,
          border: '1px dashed #ccc',
          position: 'relative',
          backgroundColor: '#f5f5f5',
          transform: deviceType === 'mobile' ? 'scale(0.8)' : 'none',
          transformOrigin: 'top center',
          overflowX: 'hidden',  // Prevent horizontal scroll
          overflowY: 'auto',    // Allow vertical scroll only
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {components.map((component) => (
          <DraggableComponent
            key={component.id}
            component={component}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            onResizeMouseDown={(e) => handleMouseDown(e, component.id, true)}
            isDragging={dragging === component.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Canvas;