/**
 * 통합 디자인 시스템 유틸리티
 * Fluent 2, Carbon Design System, UXPin, Airbnb, Instagram 스타일 통합
 */

import { shadows, animations, transitions, borderRadius, spacing } from './design-tokens';

/**
 * 그림자 유틸리티 함수
 */
export const getShadow = (level: keyof typeof shadows) => {
  return shadows[level];
};

/**
 * 애니메이션 유틸리티 함수
 */
export const getAnimation = {
  duration: (speed: keyof typeof animations.duration) => animations.duration[speed],
  easing: (type: keyof typeof animations.easing) => animations.easing[type],
  transition: (preset: keyof typeof transitions) => transitions[preset],
};

/**
 * Border Radius 유틸리티 함수
 */
export const getRadius = (size: keyof typeof borderRadius) => {
  return borderRadius[size];
};

/**
 * Spacing 유틸리티 함수
 */
export const getSpacing = (size: keyof typeof spacing) => {
  return spacing[size];
};

/**
 * Tailwind CSS 클래스 생성 헬퍼
 */
export const designSystem = {
  shadow: {
    sm: 'shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]',
    md: 'shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]',
    lg: 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]',
    card: 'shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04)]',
    'card-hover': 'shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_16px_rgba(0,0,0,0.06)]',
    soft: 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
    elevation1: 'shadow-[0_1px_2px_rgba(0,0,0,0.14),0_0_2px_rgba(0,0,0,0.12)]',
    elevation2: 'shadow-[0_2px_4px_rgba(0,0,0,0.14),0_0_2px_rgba(0,0,0,0.12)]',
  },
  transition: {
    fast: 'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
    normal: 'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
    slow: 'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
    spring: 'transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
  },
  animation: {
    fadeIn: 'animate-fade-in',
    scaleIn: 'animate-scale-in',
    zoomIn: 'animate-zoom-in',
    slideUp: 'animate-slide-up',
  },
} as const;

