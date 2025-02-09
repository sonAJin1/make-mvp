import React, { useState } from 'react';
import { UserFlow } from '../../types/flow';
import FlowViewer from './FlowViewer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

// Single Template interface definition
interface Template {
  id: string;
  type: string;
  label: string;
  description: string;
  requiresAdmin: boolean;
  userFlow?: UserFlow;
  adminInputs?: Array<{
    field: string;
    type: 'text' | 'image' | 'number' | 'rich-text' | 'list';
    label: string;
  }>;
  components: Array<{
    type: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
}

// Single TemplatePaletteProps definition
interface TemplatePaletteProps {
  onTemplateSelect: (template: Template) => void;
}

const businessTemplates: Template[] = [
  {
    id: 'landing-template',
    type: 'LANDING',
    label: '서비스 소개 페이지',
    description: '웹사이트의 첫 화면으로, 서비스 핵심 가치와 주요 기능을 소개합니다.',
    requiresAdmin: false,
    components: [
      { type: 'HERO', position: { x: 0, y: 0 }, size: { width: 900, height: 400 } },
      { type: 'FEATURES', position: { x: 0, y: 420 }, size: { width: 900, height: 300 } }
    ]
  },
  {
    id: 'login-template',
    type: 'LOGIN',
    label: '로그인 페이지',
    description: '기존 회원이 서비스를 이용하기 위한 로그인 화면입니다.',
    requiresAdmin: false,
    components: [
      { type: 'LOGIN_FORM', position: { x: 250, y: 100 }, size: { width: 400, height: 300 } }
    ]
  },
  {
    id: 'cart-template',
    type: 'CART',
    label: '장바구니 페이지',
    description: '선택한 상품들을 확인하고 주문할 수 있는 페이지입니다.',
    requiresAdmin: true,
    adminInputs: [
      { field: 'paymentMethods', type: 'list', label: '결제 수단' },
      { field: 'shippingOptions', type: 'list', label: '배송 옵션' }
    ],
    components: [
      { type: 'CART_LIST', position: { x: 0, y: 0 }, size: { width: 600, height: 400 } },
      { type: 'PAYMENT_SUMMARY', position: { x: 620, y: 0 }, size: { width: 280, height: 300 } }
    ]
  },
  {
    id: 'product-list-template',
    type: 'PRODUCT_LIST',
    label: '상품 목록 페이지',
    description: '판매 중인 모든 상품을 한눈에 볼 수 있는 페이지입니다.',
    requiresAdmin: true,
    adminInputs: [
      { field: 'productName', type: 'text', label: '상품명' },
      { field: 'productImage', type: 'image', label: '상품 이미지' },
      { field: 'price', type: 'number', label: '가격' },
      { field: 'description', type: 'rich-text', label: '상품 설명' },
      { field: 'options', type: 'list', label: '상품 옵션' }
    ],
    components: [
      { type: 'NAVIGATION', position: { x: 0, y: 0 }, size: { width: 900, height: 60 } },
      { type: 'PRODUCT_LIST', position: { x: 50, y: 80 }, size: { width: 800, height: 400 } }
    ]
  },
  {
    id: 'signup-template',
    type: 'SIGNUP',
    label: '회원가입 페이지',
    description: '새로운 사용자가 서비스에 가입할 수 있는 페이지입니다.',
    requiresAdmin: true,
    adminInputs: [
      { field: 'requiredFields', type: 'list', label: '필수 입력 항목' },
      { field: 'termsAndConditions', type: 'rich-text', label: '이용약관' },
      { field: 'privacyPolicy', type: 'rich-text', label: '개인정보처리방침' },
      { field: 'signupMethods', type: 'list', label: '가입 방식' }
    ],
    components: [
      { type: 'FORM', position: { x: 0, y: 0 }, size: { width: 400, height: 500 } }
    ]
  },
  // ... other templates with adminInputs where requiresAdmin is true
];

// Update TemplatePalette component to show admin requirement
const TemplatePalette: React.FC<TemplatePaletteProps> = ({ onTemplateSelect }) => {
  const [showFlow, setShowFlow] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<UserFlow | null>(null);
  const [flowTitle, setFlowTitle] = useState('');

  const handleFlowClick = (template: Template) => {
    if (template.userFlow) {
      setSelectedFlow(template.userFlow);
      setFlowTitle(template.label);
      setShowFlow(true);
    }
  };

  return (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Business Templates
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {businessTemplates.map((template) => (
          <Paper
            key={template.id}
            sx={{
              p: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <Box onClick={() => onTemplateSelect(template)}>
              <Typography variant="subtitle1" gutterBottom>
                {template.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {template.description}
              </Typography>
            </Box>
            {template.userFlow && (
              <Button
                startIcon={<AccountTreeIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlowClick(template);
                }}
                sx={{ mt: 1 }}
                size="small"
              >
                Flow 보기
              </Button>
            )}
          </Paper>
        ))}
      </Box>

      {selectedFlow && (
        <FlowViewer
          open={showFlow}
          onClose={() => setShowFlow(false)}
          flow={selectedFlow}
          title={flowTitle}
        />
      )}
    </Box>
  );
};

export default TemplatePalette;