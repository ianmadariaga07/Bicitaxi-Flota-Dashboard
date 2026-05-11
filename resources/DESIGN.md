---
name: Urban Logistics Pro
colors:
  surface: '#f8f9ff'
  surface-dim: '#cddbf0'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9fe'
  surface-container-highest: '#d6e4f9'
  on-surface: '#0f1c2b'
  on-surface-variant: '#40493d'
  inverse-surface: '#243141'
  inverse-on-surface: '#eaf1ff'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#4f6073'
  on-secondary: '#ffffff'
  secondary-container: '#d2e4fb'
  on-secondary-container: '#556679'
  tertiary: '#844600'
  on-tertiary: '#ffffff'
  tertiary-container: '#a75a00'
  on-tertiary-container: '#ffeee4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#d2e4fb'
  secondary-fixed-dim: '#b7c8de'
  on-secondary-fixed: '#0b1d2d'
  on-secondary-fixed-variant: '#38485a'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0f1c2b'
  surface-variant: '#d6e4f9'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max-width: 1440px
  sidebar-width: 260px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The brand identity for this design system is rooted in the concepts of movement, efficiency, and community reliability. It targets logistics managers and local administrators who require a high-utility environment that remains calm under pressure. 

The visual style is **Corporate / Modern** with a lean toward **Minimalism**. It emphasizes structural integrity through a disciplined grid and clear information hierarchy. By utilizing a "logistics-first" mindset, the UI minimizes decorative elements in favor of high-readability data visualizations and functional components. The emotional response is intended to be professional and trustworthy, reflecting the critical nature of urban transportation management.

## Colors

The palette is designed to balance the ecological aspect of bicycle transport with the seriousness of logistical operations. 

- **Primary (Urban Green):** Used for actionable items, success states, and key brand highlights. It represents growth and sustainable movement.
- **Secondary (Dark Navy):** Primarily used for structural elements like the sidebar and headers to provide a grounded, authoritative frame.
- **Tertiary (Warning Orange):** Reserved for alerts, critical maintenance statuses, and high-priority notifications.
- **Neutral (Charcoal):** Applied to typography and icons to ensure maximum contrast against the light gray background.

The color system uses a light mode default to maintain a "clean paper" feel that reduces eye strain during long shifts of fleet monitoring.

## Typography

This design system utilizes **Inter** exclusively to leverage its exceptional legibility in data-heavy interfaces. 

The type hierarchy is structured to create a clear "scan-path" for the user. Headlines use tighter letter spacing and heavier weights to anchor sections, while body text maintains standard spacing for readability. Small labels are often transformed to uppercase with increased letter spacing to differentiate them from interactive data points. On mobile devices, headline sizes are aggressively scaled down to preserve screen real estate while maintaining the bold weight character.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a fixed-width sidebar on the left. The main content area utilizes a 12-column grid system that adapts to the viewport.

- **Desktop:** 12 columns with 24px gutters. The sidebar is persistent.
- **Tablet:** 8 columns with 16px gutters. The sidebar may collapse into an icon-only rail or a drawer.
- **Mobile:** 4 columns with 16px gutters. Margins are reduced to 16px to maximize the data table view.

Spacing is governed by an 8px base unit, ensuring that all component margins and paddings are multiples of 8, creating a consistent vertical rhythm across the dashboard.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-contrast Outlines**. 

Instead of heavy shadows, this design system uses subtle 1px borders in a light gray shade (`#E0E5E4`) to define container boundaries. Elevation is signaled by background color shifts: the main canvas is `#F4F7F6`, while primary cards and interactive surfaces are pure white (`#FFFFFF`). 

When a modal or dropdown is required, a single level of "Ambient Shadow" is used—a very soft, diffused shadow with 10% opacity and a 16px blur—to lift the element without breaking the clean, flat aesthetic.

## Shapes

The shape language is **Soft**, utilizing a consistent 0.25rem (4px) corner radius for most UI elements. This subtle rounding maintains the professional "industrial" feel of logistics software while appearing more modern and accessible than sharp 90-degree corners. 

- **Standard Elements (Buttons, Inputs):** 4px radius.
- **Large Containers (Cards, Data Tables):** 8px (rounded-lg) to provide a softer frame for dense information.
- **Status Badges:** Fully pill-shaped to distinguish them from interactive buttons.

## Components

- **Sidebar Navigation:** A dark navy surface (`#1A2B3C`) with high-contrast white text and icons. The active state should feature a primary green indicator or a subtle background tint.
- **Top Header:** A clean, white surface with a thin bottom border. It contains the breadcrumbs, search bar, and user profile.
- **KPI Metric Cards:** White containers featuring a large headline for the metric value, a small label for the title, and a sparkline or percentage indicator for trend data.
- **Data Tables:** High-density rows with 1px dividers. Header rows should be slightly darker or use bold labels. Use status chips (pill-shaped) for "Active," "Maintenance," or "Idle" states.
- **Buttons:** 
  - *Primary:* Solid Urban Green with white text.
  - *Secondary:* Outlined navy or gray for less prominent actions.
  - *Icon Buttons:* Used in tables for "Edit" or "Delete" actions to keep the interface uncluttered.
- **Inputs:** Clean, outlined boxes with focus states using a 2px primary green border.
- **Icons:** Use Google Material Symbols in "Rounded" or "Sharp" style, focusing on `pedal_bike`, `tire_repair`, `map`, and `group`.