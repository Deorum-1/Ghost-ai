# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Editor Chrome

## Current Goal

- Implement the editor chrome components and layout as per the next feature spec (editor-chrome). This includes:
  - Sidebar for project navigation, node management, and tooling.
  - Top bar for actions, notifications, and user controls.
  - Integration with the existing design system components.

## Completed

- Design system: shadcn/ui install + component set + dark theme alignment (feature spec 01-design-system)

## In Progress

- Editor chrome (feature spec 02-editor-chrome)

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- ghost-ai app is a Next.js 16 + TypeScript project, working inside the `ghost-ai/` subdirectory.
- Dark-only theme per context/ui-context.md — CSS tokens in globals.css, Tailwind utilities mapping to those tokens.
- Editor chrome will use the existing design system components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea).
- The editor chrome will include a sidebar for node management, a top bar for actions, and possibly a floating toolbar.
