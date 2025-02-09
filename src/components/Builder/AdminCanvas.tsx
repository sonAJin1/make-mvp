import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input, { InputProps } from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DeviceType } from '../../types/device';

const deviceDimensions = {
  web: { width: 900, height: 600 },
  mobile: { width: 375, height: 812 }
};

interface AdminInput {
  field: string;
  type: 'text' | 'image' | 'number' | 'rich-text' | 'list';
  label: string;
}

interface Template {
  id: string;
  type: string;
  label: string;
  description: string;
  requiresAdmin: boolean;
  adminInputs?: AdminInput[];
  components: Array<{
    type: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
}

interface AdminCanvasProps {
  selectedTemplate: Template | null;
  deviceType: DeviceType;
  onDeviceTypeChange: (type: DeviceType) => void;
}

const AdminCanvas: React.FC<AdminCanvasProps> = ({ selectedTemplate, deviceType, onDeviceTypeChange }) => {
  // Admin layout components
  const adminLayout = {
    header: { type: 'ADMIN_HEADER', position: { x: 0, y: 0 }, size: { width: 900, height: 60 } },
    sidebar: { type: 'ADMIN_SIDEBAR', position: { x: 0, y: 60 }, size: { width: 200, height: 540 } },
    content: { type: 'ADMIN_CONTENT', position: { x: 200, y: 60 }, size: { width: 700, height: 540 } }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
      <Box
        sx={{
          width: 900, // Fixed web width
          height: 600,
          border: '1px dashed #ccc',
          position: 'relative',
          backgroundColor: '#f5f5f5',
          padding: 0, // Remove padding for exact sizing
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Admin Header */}
        <Box
          sx={{
            position: 'absolute',
            ...adminLayout.header.position,
            width: adminLayout.header.size.width,
            height: adminLayout.header.size.height,
            backgroundColor: '#1976d2',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Typography variant="h6">관리자 대시보드</Typography>
        </Box>

        {/* Admin Sidebar */}
        <Box
          sx={{
            position: 'absolute',
            ...adminLayout.sidebar.position,
            width: adminLayout.sidebar.size.width,
            height: adminLayout.sidebar.size.height,
            backgroundColor: '#fff',
            borderRight: '1px solid #ddd',
            padding: 2,
          }}
        >
          <Typography variant="subtitle1" gutterBottom>관리 메뉴</Typography>
          {/* Menu items will be added here */}
        </Box>

        {/* Admin Content Area */}
        <Box
          sx={{
            position: 'absolute',
            ...adminLayout.content.position,
            width: adminLayout.content.size.width,
            height: adminLayout.content.size.height,
            backgroundColor: '#fff',
            padding: 2,
            overflowY: 'auto',
          }}
        >
          {/* Admin Input Form */}
          <Box sx={{ 
            width: '100%',
            backgroundColor: '#fff',
            marginBottom: 2,
          }}>
            <Typography variant="h6" gutterBottom>데이터 입력</Typography>
            {selectedTemplate?.adminInputs?.map((input) => (
              <FormControl key={input.field} fullWidth sx={{ mb: 2 }}>
                <InputLabel sx={{ position: 'static', mb: 1 }}>{input.label}</InputLabel>
                {input.type === 'rich-text' ? (
                  <TextField 
                    multiline 
                    rows={4}
                    variant="outlined"
                  />
                ) : input.type === 'image' ? (
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ height: '56px' }}
                  >
                    이미지 업로드
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                    />
                  </Button>
                ) : (
                  <TextField
                    type={input.type}
                    variant="outlined"
                  />
                )}
              </FormControl>
            ))}
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              저장
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminCanvas;