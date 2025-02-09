import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { featureScenarios } from '../../data/featureScenarios';
import { TechFeature } from '../../types/feature';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';

interface Feature {
  id: string;
  name: string;
  description: string;
  requirements: {
    requiresAdmin: boolean;
    requiresFirebase: boolean;
    requiresBackend: boolean;
    additionalSetup?: string[];
  };
}

const features: Feature[] = [
  {
    id: 'push-notification',
    name: '앱 푸시 알림',
    description: '사용자에게 푸시 알림을 보낼 수 있는 기능',
    requirements: {
      requiresAdmin: true,
      requiresFirebase: true,
      requiresBackend: false,
      additionalSetup: ['Firebase Cloud Messaging 설정']
    }
  },
  {
    id: 'deep-linking',
    name: '딥링크',
    description: '특정 콘텐츠로 직접 이동할 수 있는 링크 기능',
    requirements: {
      requiresAdmin: false,
      requiresFirebase: true,
      requiresBackend: false,
      additionalSetup: ['Firebase Dynamic Links 설정']
    }
  },
  {
    id: 'social-login',
    name: '소셜 로그인',
    description: '카카오, 네이버 등 소셜 계정으로 로그인',
    requirements: {
      requiresAdmin: false,
      requiresFirebase: true,
      requiresBackend: true,
      additionalSetup: ['소셜 플랫폼 개발자 계정 설정']
    }
  },
  {
    id: 'analytics',
    name: '사용자 분석',
    description: '사용자 행동 및 통계 분석 기능',
    requirements: {
      requiresAdmin: true,
      requiresFirebase: true,
      requiresBackend: false,
      additionalSetup: ['Google Analytics 설정']
    }
  },
  {
    id: 'payment',
    name: '결제 시스템',
    description: '신용카드, 계좌이체 등 결제 기능',
    requirements: {
      requiresAdmin: true,
      requiresFirebase: false,
      requiresBackend: true,
      additionalSetup: ['PG사 계약 필요', '결제 모듈 설정']
    }
  },
  {
    id: 'chat',
    name: '실시간 채팅',
    description: '사용자간 실시간 채팅 기능',
    requirements: {
      requiresAdmin: true,
      requiresFirebase: true,
      requiresBackend: true,
      additionalSetup: ['Firebase Realtime Database 설정']
    }
  }
];

export const FeatureSelector: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<TechFeature | null>(null);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Features</Typography>
      
      {/* Technical Features */}
      {featureScenarios.map(category => (
        <Box key={category.id} mb={3}>
          <Typography variant="subtitle1">{category.name}</Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {category.features.map(feature => (
              <Card
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                sx={{
                  width: 280,
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 3 }
                }}
              >
                <Box mb={2}>
                  <img 
                    src={feature.visualExample} 
                    alt={feature.name}
                    style={{ width: '100%', height: 160, objectFit: 'cover' }}
                  />
                </Box>
                <Typography variant="h6">{feature.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.scenario}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      {/* Implementation Requirements */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Implementation Requirements</Typography>
        {features.map((feature) => (
          <Paper key={feature.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">{feature.name}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {feature.description}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" display="block" color="primary">
                필요 조건:
              </Typography>
              <List dense>
                {feature.requirements.requiresAdmin && (
                  <ListItem>• 관리자 페이지 필요</ListItem>
                )}
                {feature.requirements.requiresFirebase && (
                  <ListItem>• Firebase 연동 필요</ListItem>
                )}
                {feature.requirements.requiresBackend && (
                  <ListItem>• 백엔드 서버 필요</ListItem>
                )}
                {feature.requirements.additionalSetup?.map((setup) => (
                  <ListItem key={setup}>• {setup}</ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        ))}
      </Box>

      <Dialog
        open={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        aria-labelledby="feature-dialog-title"
        aria-describedby="feature-dialog-description"
      >
        {selectedFeature && (
          <>
            <DialogTitle id="feature-dialog-title">
              {selectedFeature.name}
            </DialogTitle>
            <DialogContent>
              <Typography id="feature-dialog-description" variant="body1" gutterBottom>
                {selectedFeature.description}
              </Typography>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Technical name: {selectedFeature.technicalName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complexity: {selectedFeature.complexity}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};