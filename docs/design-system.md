# 통합 디자인 시스템 가이드

Fluent 2, Carbon Design System, UXPin, Airbnb, Instagram의 스타일을 통합한 디자인 시스템입니다.

## 디자인 토큰

### 간격 시스템 (Carbon Design System 기반)

```typescript
import { spacing } from '@/shared/lib/design-tokens';

// Base unit: 4px
spacing[1]  // 4px
spacing[2]  // 8px
spacing[4]  // 16px
spacing[6]  // 24px
spacing[8]  // 32px
```

### 타이포그래피 스케일

#### Display (Airbnb 스타일)
- `display.2xl`: 72px, Bold
- `display.xl`: 60px, Bold
- `display.lg`: 48px, Bold

#### Heading (Carbon Design System)
- `heading.6xl`: 48px, Semibold
- `heading.5xl`: 36px, Semibold
- `heading.4xl`: 30px, Semibold
- `heading.3xl`: 24px, Semibold
- `heading.2xl`: 20px, Semibold
- `heading.xl`: 18px, Semibold
- `heading.lg`: 16px, Semibold

#### Body (Fluent2 스타일)
- `body.xl`: 18px, Regular
- `body.lg`: 16px, Regular
- `body.md`: 15px, Regular
- `body.sm`: 14px, Regular
- `body.xs`: 12px, Regular

#### Label (Carbon Design System)
- `label.lg`: 14px, Semibold, Uppercase
- `label.md`: 12px, Semibold, Uppercase
- `label.sm`: 11px, Semibold, Uppercase

### 그림자 시스템

#### Fluent2 스타일
- `sm`, `md`, `lg`, `xl`, `2xl`: 표준 그림자 스케일
- `elevation-1`, `elevation-2`, `elevation-4`, `elevation-8`, `elevation-16`: Elevation 레벨

#### Airbnb 스타일
- `card`: 카드 기본 그림자
- `card-hover`: 카드 호버 그림자

#### Instagram 스타일
- `soft`: 부드러운 그림자
- `soft-lg`: 큰 부드러운 그림자

### 애니메이션 토큰

#### Duration (Fluent2)
- `ultraFast`: 0.1s
- `faster`: 0.15s
- `fast`: 0.2s
- `normal`: 0.3s
- `slow`: 0.5s
- `slower`: 0.8s
- `ultraSlow`: 1.2s

#### Easing
- Fluent2: `accelerate-max`, `accelerate-mid`, `standard`, `decelerate-max` 등
- Instagram: `spring`, `spring-gentle`
- Airbnb: `ease-out`, `ease-in-out`

#### Keyframes
- `fadeIn`, `fadeOut`
- `slideUp`, `slideDown`, `slideLeft`, `slideRight`
- `scaleIn`, `scaleOut`
- `zoomIn` (Instagram 스타일)
- `pulse` (Fluent2 스타일)

### Border Radius

- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `2xl`: 24px
- `3xl`: 32px
- `full`: 완전한 원형
- `card`: 12px (Airbnb 스타일)
- `button`: 8px (Airbnb 스타일)

## 사용 예시

### 컴포넌트에서 사용

```tsx
import { designSystem } from '@/shared/lib/design-system';

// 그림자 적용
<div className={designSystem.shadow.card}>
  카드 내용
</div>

// 트랜지션 적용
<button className={designSystem.transition.spring}>
  버튼
</button>

// 애니메이션 적용
<div className={designSystem.animation.fadeIn}>
  페이드인 효과
</div>
```

### Tailwind CSS 클래스로 직접 사용

```tsx
// 그림자
<div className="shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04)]">
  Airbnb 스타일 카드
</div>

// 트랜지션
<div className="transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
  Fluent2 스타일 트랜지션
</div>

// 애니메이션
<div className="animate-fade-in">
  페이드인 애니메이션
</div>
```

## 디자인 시스템별 특징

### Fluent 2 (Microsoft)
- **접근성 중심**: 명확한 포커스 상태, 충분한 대비
- **부드러운 애니메이션**: cubic-bezier 이징 함수 사용
- **Elevation 시스템**: 계층적 그림자 시스템

### Carbon Design System (IBM)
- **데이터 중심**: 명확한 정보 계층 구조
- **간격 시스템**: 4px 기반 일관된 간격
- **타이포그래피**: 명확한 텍스트 스케일

### UXPin
- **프로토타이핑 친화적**: 빠른 반복과 테스트
- **컴포넌트 기반**: 재사용 가능한 패턴

### Airbnb
- **미니멀 디자인**: 깔끔하고 공간감 있는 레이아웃
- **카드 기반**: 부드러운 그림자와 호버 효과
- **친근한 느낌**: 따뜻한 색상과 둥근 모서리

### Instagram
- **이미지 중심**: 카드 기반 레이아웃
- **부드러운 인터랙션**: 스프링 애니메이션
- **미니멀한 UI**: 불필요한 요소 제거

## 컴포넌트 스타일 가이드

### Card 컴포넌트
- Airbnb 스타일 그림자 적용
- Instagram 스타일 호버 효과
- Fluent2 트랜지션

### Button 컴포넌트
- Fluent2 스타일 기본 버튼 (부드러운 그림자)
- Carbon Design System 스타일 outline 버튼
- Instagram 스타일 ghost 버튼

### Header 컴포넌트
- Airbnb 스타일 미니멀 디자인
- 중앙 정렬 레이아웃
- 부드러운 블러 효과

### Bottom Navigation
- iOS 스타일 + Fluent2 애니메이션
- Instagram 스타일 부드러운 인터랙션

