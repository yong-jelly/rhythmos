# Repository Guidelines

## Project Structure & Module Organization

- Source: `src/` using feature-sliced folders: `pages/`, `widgets/`, `features/`, `entities/`, `shared/`, `lib/`, `components/`, `assets/`.
- Public assets: `public/`. Build output: `dist/`. Storybook config: `.storybook/`. Docs: `doc/`.
- Path alias: use `@/` for `src` (example: `import Button from '@/shared/ui/button'`).

## Build, Test, and Development Commands

- `npm run dev`: Start Vite dev server (0.0.0.0). Variants: `dev:mock`, `dev:local` for different `.env` modes.
- `npm run build`: Type-check then Vite production build. `build:local` for development mode build.
- `npm run preview`: Serve built app from `dist/`.
- `npm run lint`: ESLint on TS/TSX.
- `npm run storybook`: Run Storybook at 6006. `npm run build-storybook`: Static Storybook.

## Coding Style & Naming Conventions

- Formatting: Prettier (2 spaces, width 120, single quotes, semicolons, trailing commas). Imports auto‑sorted.
- Linting: ESLint (TypeScript + React Hooks rules) with strict TypeScript plugin.
- Files: React components `PascalCase.tsx`; hooks `useX.ts`; utilities `kebab-case.ts`.
- Modules: Keep co-located styles and tests next to components.
- Aliases: Prefer `@/` over relative paths.

## Testing Guidelines

- Unit tests are not configured yet. Use Storybook stories for component verification and accessibility checks.
- If adding tests, co-locate as `*.test.ts` or `*.test.tsx` near the unit and ensure `npm run lint` passes. Discuss introducing Vitest in the PR.

## Commit & Pull Request Guidelines

- Commit style: conventional prefixes used in history: `feat`, `fix`, `refactor`, `chore`, optional scopes (e.g., `feat(ui): ...`).
- PRs: clear description, linked issue (e.g., `Closes #123`), screenshots/GIFs for UI changes, and notes on env/config impacts.
- Keep PRs focused and small; update docs when behavior changes.

## Form Validation Standards

- **Required Libraries**: zod, react-hook-form, @hookform/resolvers
- **Standard Pattern**: All form validation must use zod schema + react-hook-form combination
- **Schema Definition**: Define validation schemas using zod with appropriate Korean error messages
- **Form Hook**: Use `useForm` with `zodResolver(schema)` for automatic validation integration
- **Error Handling**: Display field errors using `formState.errors` with consistent UI patterns
- **Validation Timing**: Configure validation on blur/change as needed with `mode` option
- **Documentation**: See `/doc/form-validation.md` for comprehensive examples and patterns

## Security & Configuration Tips

- Environment: Node version from `.nvmrc` (example: `v22.19.0`). Use `.env*` files (`.env`, `.env.dev`, `.env.mock`, `.env.prod`); never commit secrets.
- i18n via `i18next`/`react-i18next`; prefer keys over literals and update translation resources consistently.
