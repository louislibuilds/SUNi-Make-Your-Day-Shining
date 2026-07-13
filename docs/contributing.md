# Contributing

Thanks for helping with SUNi. Read [development.md](./development.md) first to run the project locally.

## Workflow

1. Fork or branch from `main`
2. Make focused changes (one concern per PR)
3. Ensure CI passes: server tests + client build
4. Open a PR with a clear description

## Branches

```
feature/short-description
fix/short-description
```

## Commits

```
type(scope): description

feat(client): connect product list to API
fix(server): validate pagination limit
docs: update deployment guide
ci: fix client build
```

Types: `feat`, `fix`, `docs`, `chore`, `ci`, `refactor`, `test`.

## Code style

- **TypeScript** strict mode in `client/` and `server/`
- Use `import type { X }` for type-only imports (`verbatimModuleSyntax`)
- React: functional components; pages in `client/src/pages/`
- API: validate at middleware; errors as `{ success: false, message, errors? }`

## Do not commit

- `.env`, API keys, secrets
- `node_modules/`, `build/`, `dist/`

## Questions

Open a GitHub issue on [SUNi-Make-Your-Day-Shining](https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining/issues).
