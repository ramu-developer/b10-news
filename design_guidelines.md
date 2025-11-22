# Design Guidelines: Video Intro Screen App

## Architecture Decisions

### Authentication
**No Authentication Required**
- This is a single-screen utility app displaying video content
- No user accounts, data persistence, or backend integration needed

### Navigation
**Single Screen - No Navigation**
- App consists of one standalone screen
- No navigation stack, tabs, or drawer needed
- Screen displays full-screen without navigation header

## Screen Specifications

### Main Video Screen

**Purpose**: Display the intro video on a branded blue background

**Layout**:
- **Header**: None - full-screen immersive experience
- **Background**: Solid color #2196F3 (Material Blue 500)
- **Main Content**: 
  - Centered video player
  - Video scales to fit screen while maintaining aspect ratio
  - Content should be vertically and horizontally centered
- **Safe Area Insets**: 
  - Apply standard safe area insets to prevent video from being cut off by device notches
  - Video container should respect: top: insets.top, bottom: insets.bottom, left/right: minimal padding

**Video Player Specifications**:
- **Autoplay**: Video starts playing automatically when screen loads
- **Duration**: 3 seconds
- **Source**: b10news_intro_cc.mp4 (local asset)
- **Controls**: Optional basic controls (play/pause) - keep minimal for intro experience
- **Resize Mode**: Contain (maintains aspect ratio, fits within screen bounds)
- **Loading State**: Show simple loading indicator while video loads
- **Replay**: Video should loop or provide a subtle replay button when ended

**Interaction Design**:
- Video can be tapped to pause/play
- No additional interactive elements needed
- Smooth transitions between loading and playing states

## Design System

### Color Palette
- **Primary Background**: #2196F3 (Material Blue)
- **Loading Indicator**: White or light color for visibility against blue
- **Controls** (if shown): White with subtle opacity (0.8)

### Typography
Not applicable for this screen (no text elements required)

### Visual Design
- **Minimalist Approach**: Clean, distraction-free video presentation
- **Focus**: Video content is the sole focus
- **Shadows**: None needed for this simple layout
- **Icons**: Only standard video control icons (play/pause) if controls are displayed

### Assets
**Critical Assets**:
1. **b10news_intro_cc.mp4** - 3-second intro video (provided by user)

**No additional assets needed** - this is a minimal single-purpose screen

## Accessibility
- Ensure video is captioned (file name includes "_cc" suggesting closed captions)
- Provide screen reader support for video controls if displayed
- Adequate color contrast for any control elements against the blue background