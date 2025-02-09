import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FeatureSelector from './components/Builder';
import ComponentPalette from './components/Builder/ComponentPalette';
import TemplatePalette from './components/Builder/TemplatePalette';
import Canvas from './components/Builder/Canvas';
import AdminCanvas from './components/Builder/AdminCanvas';  // Add this import
import { DeviceType } from './types/device';  // Keep this import
import { UserFlow } from './types/flow';  // Add this import

const theme = createTheme();

// Add template type definition
// Update Template interface
interface Template {
  id: string;
  type: string;
  label: string;
  description: string;
  requiresAdmin: boolean;
  userFlow?: UserFlow;  // Add this
  components: Array<{
    type: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
}

// Remove duplicate DeviceType definition
function App() {
  const [leftPanelTab, setLeftPanelTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [deviceType, setDeviceType] = useState<DeviceType>('web');
  const [viewMode, setViewMode] = useState<'user' | 'admin'>('user');
  const [showFlow, setShowFlow] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<UserFlow | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    if (template.userFlow) {
      setCurrentFlow(template.userFlow);
      setShowFlow(true);
    }
  };

  const handleLeftPanelChange = (event: React.SyntheticEvent, newValue: number) => {
    setLeftPanelTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Left Panel */}
        <Box sx={{ width: 250, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
          <Tabs value={leftPanelTab} onChange={handleLeftPanelChange}>
            <Tab label="Templates" />
            <Tab label="Components" />
          </Tabs>
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {leftPanelTab === 0 ? (
              <TemplatePalette onTemplateSelect={handleTemplateSelect} />
            ) : (
              <ComponentPalette />
            )}
          </Box>
        </Box>

        {/* Center Panel - Canvas */}
        <Box sx={{ flex: 1, p: 3 }}>
          {selectedTemplate?.requiresAdmin ? (
            <Box sx={{ height: '100%' }}>
              <Tabs value={viewMode} onChange={(_, newValue) => setViewMode(newValue)}>
                <Tab value="user" label="사용자 화면" />
                <Tab value="admin" label="관리자 화면" />
              </Tabs>
              <Box sx={{ mt: 2, height: 'calc(100% - 48px)' }}>
                {viewMode === 'user' ? (
                  <Canvas 
                    selectedTemplate={selectedTemplate}
                    deviceType={deviceType}
                    onDeviceTypeChange={setDeviceType}
                  />
                ) : (
                  <AdminCanvas 
                    selectedTemplate={selectedTemplate}
                    deviceType="web"
                    onDeviceTypeChange={setDeviceType}
                  />
                )}
              </Box>
            </Box>
          ) : (
            <Canvas 
              selectedTemplate={selectedTemplate}
              deviceType={deviceType}
              onDeviceTypeChange={setDeviceType}
            />
          )}
        </Box>

        {/* Right Panel */}
        <Box sx={{ width: 300, borderLeft: 1, borderColor: 'divider', overflowY: 'auto' }}>
          <FeatureSelector />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;