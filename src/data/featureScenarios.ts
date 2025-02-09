import { FeatureCategory } from '../types/feature';

export const featureScenarios: FeatureCategory[] = [
  {
    id: 'user-interaction',
    name: '사용자 상호작용',
    features: [
      {
        id: 'push-notification',
        name: '앱이 닫혀있을 때도 알림 보내기',
        description: '사용자가 앱을 사용하지 않을 때도 메시지를 보낼 수 있습니다',
        scenario: '사용자가 앱을 사용하지 않을 때도 새로운 이벤트나 업데이트를 알리고 싶습니다',
        technicalName: '푸시 알림',
        complexity: 'Medium',
        requirements: ['모바일 디바이스 토큰', '푸시 인증서'],
        visualExample: '/assets/examples/push-notification.gif'
      },
      {
        id: 'social-login',
        name: '소셜 로그인',
        description: '카카오, 네이버 등 소셜 계정으로 로그인할 수 있습니다',
        scenario: '사용자가 별도의 회원가입 없이 소셜 계정으로 로그인하고 싶습니다',
        technicalName: 'Social Login',
        complexity: 'Medium',
        requirements: ['소셜 플랫폼 개발자 계정', '인증 서버'],
        visualExample: '/assets/examples/social-login.gif'
      },
      {
        id: 'chat',
        name: '실시간 채팅',
        description: '사용자간 실시간 대화가 가능합니다',
        scenario: '사용자들이 서로 실시간으로 대화를 나누고 싶습니다',
        technicalName: 'Real-time Chat',
        complexity: 'High',
        requirements: ['실시간 데이터베이스', '웹소켓 서버'],
        visualExample: '/assets/examples/chat.gif'
      }
    ]
  },
  {
    id: 'technical',
    name: '기술 기능',
    features: [
      {
        id: 'deep-linking',
        name: '딥링크',
        scenario: '앱의 특정 페이지로 바로 이동하게 하고 싶어요',
        description: '특정 콘텐츠로 직접 연결되는 링크 제공',
        technicalName: 'Deep Linking',
        complexity: 'Medium',
        visualExample: '/images/features/deep-link.png'
      },
      {
        id: 'offline-mode',
        name: '오프라인 모드',
        scenario: '인터넷이 없을 때도 기본 기능을 사용하게 하고 싶어요',
        description: '오프라인 상태에서도 기본 기능 사용 가능',
        technicalName: 'Offline Support',
        complexity: 'High',
        visualExample: '/images/features/offline.png'
      },
      {
        id: 'analytics',
        name: '사용자 분석',
        description: '사용자 행동 및 통계를 분석할 수 있습니다',
        scenario: '사용자들의 행동 패턴을 분석하고 싶습니다',
        technicalName: 'User Analytics',
        complexity: 'Medium',
        requirements: ['분석 도구 설정', '이벤트 트래킹'],
        visualExample: '/assets/examples/analytics.gif'
      }
    ]
  },
  {
    id: 'monetization',
    name: '수익화',
    features: [
      {
        id: 'payment',
        name: '결제 시스템',
        description: '안전한 온라인 결제를 처리할 수 있습니다',
        scenario: '사용자가 상품이나 서비스를 결제할 수 있게 하고 싶습니다',
        technicalName: 'Payment Gateway',
        complexity: 'High',
        requirements: ['PG사 연동', '보안 인증'],
        visualExample: '/assets/examples/payment.gif'
      }
    ]
  },
  {
    id: 'sharing',
    name: '공유',
    features: [
      {
        id: 'social-share',
        name: '소셜 미디어 공유 기능',
        description: '콘텐츠를 다양한 소셜 미디어에 공유할 수 있습니다',
        scenario: '사용자가 콘텐츠를 SNS에 쉽게 공유하고 싶습니다',
        technicalName: 'Social Sharing',
        complexity: 'Low',
        requirements: ['소셜 미디어 API'],
        visualExample: '/assets/examples/social-share.gif'
      }
    ]
  }
];