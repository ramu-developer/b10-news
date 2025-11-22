# B10 News - React Native Video Intro App

## Overview

B10 News is a single-screen React Native mobile application built with Expo that displays a 3-second intro video on a branded blue background. The app is designed as a simple, immersive video viewing experience with no navigation, authentication, or backend integration required. It supports iOS, Android, and web platforms using React Native's cross-platform capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**
- **React Native (0.81.5)**: Core mobile framework for cross-platform development
- **Expo (v54)**: Development platform and tooling ecosystem
- **React 19.1.0**: Latest React version with React Compiler enabled for performance optimization
- **TypeScript**: Type-safe development with strict mode enabled

**Navigation**
- **React Navigation v7**: Navigation library using native stack navigator
- Single-screen architecture with no complex routing
- Native stack navigator configured with `headerShown: false` for full-screen experience
- Root navigator manages a single route: `VideoIntro`

**UI Components & Styling**
- Custom theming system with light/dark mode support via `useTheme` hook
- Design system based on Material Blue (#2196F3) as primary color
- Reusable component library including:
  - `ThemedView` and `ThemedText` for consistent theming
  - Animated `Button` and `Card` components using Reanimated
  - Screen-level layout components (`ScreenScrollView`, `ScreenFlatList`, etc.)
- Spacing, typography, and border radius constants defined in centralized theme file
- Safe area handling with `react-native-safe-area-context`

**Animation & Gestures**
- **React Native Reanimated (v4.1.1)**: High-performance animations using worklets
- **React Native Gesture Handler (v2.28.0)**: Native gesture handling
- Spring animations with custom configuration for micro-interactions
- Shared values and animated styles for smooth UI transitions

**Video Playback**
- **expo-video (v3.0.14)**: Native video player component
- Autoplay functionality on screen load
- Status change listeners for loading states and playback events
- Non-looping configuration with replay capability
- Tap-to-play/pause interaction

**State Management**
- Local component state using React hooks (`useState`, `useRef`)
- No global state management library (Redux, MobX, etc.) - not needed for single-screen app
- Video player state managed through expo-video's `useVideoPlayer` hook

**Error Handling**
- Custom `ErrorBoundary` class component wrapping the entire app
- `ErrorFallback` component with developer-friendly error display
- Error details modal in development mode
- App restart capability using `expo.reloadAppAsync()`

### Platform-Specific Adaptations

**iOS**
- Bundle identifier: `com.b10news.app`
- Tablet support enabled
- Standard iOS safe area handling

**Android**
- Package name: `com.b10news.app`
- Edge-to-edge display enabled
- Predictive back gesture disabled

**Web**
- Single-page application output
- Fallback logic for `KeyboardAwareScrollView` (uses `ScreenScrollView` on web)
- Client-side color scheme hydration for static rendering support

### Build & Development

**Development Environment**
- Babel configuration with module resolver for `@/` path alias
- ESLint with Expo config and Prettier integration
- TypeScript with strict mode and path mapping
- Expo New Architecture enabled (`newArchEnabled: true`)
- React Compiler experimental feature enabled

**Build Scripts**
- Custom Replit deployment script (`scripts/build.js`)
- Environment-aware Metro bundler configuration
- Support for `REPLIT_DEV_DOMAIN` and `REPLIT_INTERNAL_APP_DOMAIN`

**Asset Management**
- Local video asset stored in `attached_assets/` directory
- Splash screen configuration with Material Blue background
- App icons and favicons configured through `app.json`

### Performance Optimizations

- React Compiler for automatic performance optimization
- Reanimated worklets for 60fps animations running on UI thread
- Lazy loading patterns where applicable
- Optimized spring configurations to prevent jank

## External Dependencies

### Core Expo Modules
- **expo-splash-screen**: Custom branded splash screen with Material Blue background
- **expo-status-bar**: Status bar styling (light mode)
- **expo-video**: Native video playback functionality
- **expo-web-browser**: Web browser integration capabilities
- **expo-linking**: Deep linking support (scheme: `b10news`)
- **expo-font**: Custom font loading
- **expo-constants**: Access to app manifest constants
- **expo-image**: Optimized image component
- **expo-haptics**: Haptic feedback support
- **expo-blur**: Blur effects
- **expo-glass-effect**: Glass morphism effects
- **expo-symbols**: SF Symbols (iOS) integration
- **expo-system-ui**: System UI configuration

### Navigation & UI Libraries
- **@react-navigation/native**: Core navigation library
- **@react-navigation/native-stack**: Native stack navigator implementation
- **@react-navigation/bottom-tabs**: Tab navigation (available but not currently used)
- **@react-navigation/elements**: Shared navigation UI components
- **react-native-safe-area-context**: Safe area inset handling
- **react-native-screens**: Native screen optimization

### Animation & Interaction
- **react-native-reanimated**: Worklet-based animations
- **react-native-gesture-handler**: Native gesture recognition
- **react-native-keyboard-controller**: Keyboard behavior management
- **react-native-worklets**: Worklets runtime for animations

### Icons & UI
- **@expo/vector-icons**: Icon library (Feather icons used for UI)

### Development Tools
- **babel-plugin-module-resolver**: Path alias resolution
- **eslint** with **eslint-config-expo**: Code linting
- **prettier**: Code formatting
- **TypeScript**: Static type checking

### Runtime Considerations
- No database integration (purely client-side app)
- No authentication service
- No backend API calls
- Local video asset requires bundling with the app
- Replit-specific environment variable handling for deployment URLs