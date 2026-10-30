# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Foundation & UI Primitives

## Current Goal

- Editor chrome (feature spec 02-editor-chrome)

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

- ghost-ai app is a Next.js 16 + TypeScript project, working inside the `ghost-ai/` subdirectory which is the actual app root (package.json lives there).
- Dark-only theme per context/ui-context.md — CSS tokens in globals.css, Tailwind utilities mapping to those tokens.
