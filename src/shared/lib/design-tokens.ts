/**
 * 통합 디자인 토큰 시스템
 * Fluent 2, Carbon Design System, UXPin, Airbnb, Instagram 스타일 통합
 */

// ============================================
// 간격 시스템 (Carbon Design System 기반)
// ============================================
export const spacing = {
  // Base unit: 4px
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// ============================================
// 타이포그래피 스케일 (Fluent2 + Carbon)
// ============================================
export const typography = {
  // Display (Airbnb 스타일)
  display: {
    '2xl': {
      fontSize: '4.5rem',      // 72px
      lineHeight: '1.1',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    xl: {
      fontSize: '3.75rem',     // 60px
      lineHeight: '1.1',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    lg: {
      fontSize: '3rem',        // 48px
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
  },
  // Heading (Carbon Design System)
  heading: {
    '6xl': {
      fontSize: '3rem',        // 48px
      lineHeight: '1.2',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    '5xl': {
      fontSize: '2.25rem',      // 36px
      lineHeight: '1.25',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    '4xl': {
      fontSize: '1.875rem',     // 30px
      lineHeight: '1.3',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    '3xl': {
      fontSize: '1.5rem',       // 24px
      lineHeight: '1.35',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    '2xl': {
      fontSize: '1.25rem',      // 20px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '-0.005em',
    },
    xl: {
      fontSize: '1.125rem',     // 18px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '-0.005em',
    },
    lg: {
      fontSize: '1rem',         // 16px
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0',
    },
  },
  // Body (Fluent2 스타일)
  body: {
    xl: {
      fontSize: '1.125rem',     // 18px
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0',
    },
    lg: {
      fontSize: '1rem',         // 16px
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0',
    },
    md: {
      fontSize: '0.9375rem',    // 15px
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0',
    },
    sm: {
      fontSize: '0.875rem',     // 14px
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0',
    },
    xs: {
      fontSize: '0.75rem',      // 12px
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
  },
  // Label (Carbon Design System)
  label: {
    lg: {
      fontSize: '0.875rem',     // 14px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '0.01em',
      textTransform: 'uppercase' as const,
    },
    md: {
      fontSize: '0.75rem',      // 12px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '0.02em',
      textTransform: 'uppercase' as const,
    },
    sm: {
      fontSize: '0.6875rem',    // 11px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '0.03em',
      textTransform: 'uppercase' as const,
    },
  },
} as const;

// ============================================
// 그림자 시스템 (Fluent2 + Airbnb)
// ============================================
export const shadows = {
  // Fluent2 스타일 - 부드러운 그림자
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md': '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  'lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  '2xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  
  // Airbnb 스타일 - 카드 그림자
  'card': '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04)',
  'card-hover': '0 2px 4px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.06)',
  
  // Instagram 스타일 - 부드러운 그림자
  'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
  'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
  
  // Fluent2 - Elevation
  'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)',
  'elevation-2': '0 2px 4px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)',
  'elevation-4': '0 4px 8px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)',
  'elevation-8': '0 8px 16px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)',
  'elevation-16': '0 16px 32px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)',
  
  // 내부 그림자 (Fluent2)
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ============================================
// 애니메이션 토큰 (Fluent2 + Instagram)
// ============================================
export const animations = {
  // Duration (Fluent2)
  duration: {
    ultraFast: '0.1s',
    faster: '0.15s',
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slower: '0.8s',
    ultraSlow: '1.2s',
  },
  
  // Easing (Fluent2 + Instagram)
  easing: {
    // Fluent2
    'accelerate-max': 'cubic-bezier(1, 0, 1, 1)',
    'accelerate-mid': 'cubic-bezier(0.7, 0, 1, 1)',
    'accelerate-min': 'cubic-bezier(0.5, 0, 1, 1)',
    'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'decelerate-max': 'cubic-bezier(0, 0, 0, 1)',
    'decelerate-mid': 'cubic-bezier(0.1, 0.9, 0.2, 1)',
    'decelerate-min': 'cubic-bezier(0.33, 0, 0.1, 1)',
    
    // Instagram 스타일 - 부드러운 스프링
    'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'spring-gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Airbnb 스타일
    'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Keyframes (Instagram + Fluent2)
  keyframes: {
    fadeIn: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    fadeOut: {
      from: { opacity: '1' },
      to: { opacity: '0' },
    },
    slideUp: {
      from: { transform: 'translateY(10px)', opacity: '0' },
      to: { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      from: { transform: 'translateY(-10px)', opacity: '0' },
      to: { transform: 'translateY(0)', opacity: '1' },
    },
    slideLeft: {
      from: { transform: 'translateX(10px)', opacity: '0' },
      to: { transform: 'translateX(0)', opacity: '1' },
    },
    slideRight: {
      from: { transform: 'translateX(-10px)', opacity: '0' },
      to: { transform: 'translateX(0)', opacity: '1' },
    },
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: '0' },
      to: { transform: 'scale(1)', opacity: '1' },
    },
    scaleOut: {
      from: { transform: 'scale(1)', opacity: '1' },
      to: { transform: 'scale(0.95)', opacity: '0' },
    },
    // Instagram 스타일 - 부드러운 확대
    zoomIn: {
      from: { transform: 'scale(0.9)', opacity: '0' },
      to: { transform: 'scale(1)', opacity: '1' },
    },
    // Fluent2 스타일 - 펄스
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
  },
} as const;

// ============================================
// Border Radius (Carbon + Airbnb)
// ============================================
export const borderRadius = {
  none: '0',
  sm: '0.25rem',      // 4px
  md: '0.5rem',       // 8px
  lg: '0.75rem',      // 12px
  xl: '1rem',         // 16px
  '2xl': '1.5rem',    // 24px
  '3xl': '2rem',      // 32px
  full: '9999px',
  
  // Airbnb 스타일
  card: '0.75rem',    // 12px
  button: '0.5rem',   // 8px
  
  // Carbon Design System
  'carbon-sm': '0.125rem',  // 2px
  'carbon-md': '0.25rem',   // 4px
  'carbon-lg': '0.5rem',    // 8px
} as const;

// ============================================
// Z-Index 계층 (Carbon Design System)
// ============================================
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
} as const;

// ============================================
// Opacity (Fluent2)
// ============================================
export const opacity = {
  disabled: 0.4,
  hover: 0.8,
  pressed: 0.6,
  selected: 0.1,
  focus: 0.2,
} as const;

// ============================================
// Breakpoints (Carbon Design System)
// ============================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// Transition Presets (통합)
// ============================================
export const transitions = {
  // Fluent2 스타일
  fast: `${animations.duration.fast} ${animations.easing.standard}`,
  normal: `${animations.duration.normal} ${animations.easing.standard}`,
  slow: `${animations.duration.slow} ${animations.easing.standard}`,
  
  // Instagram 스타일
  spring: `${animations.duration.normal} ${animations.easing.spring}`,
  springGentle: `${animations.duration.normal} ${animations.easing['spring-gentle']}`,
  
  // Airbnb 스타일
  easeOut: `${animations.duration.normal} ${animations.easing['ease-out']}`,
  
  // Common
  all: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

