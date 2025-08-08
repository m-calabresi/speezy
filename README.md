# Speezy

## TODO:

- Documentation:
    - [x] Add LICENSE.md
    - [ ] Make README look nice
- Style
    - [x] Add font
    - [x] Add logo, favicon and description
    - [x] Add Shadcn base style
    - [x] Add custom colors
    - [ ] Style Keycloak pages with [Keycloakify](https://www.keycloakify.dev/)
- Behavior
    - [ ] Add view transitions
    - [ ] Add localization (IT, EN)
- Features
    - [x] Add account settings
    - [ ] Add `new expense` page
    - [ ] Add `not found` page
    - Add `history` page
        - [ ] Progressively load more entries
        - [ ] Add filters
        - [ ] Add edit feature to entries
    - [ ] Add `stats` page
- Auth
    - [ ] Implement app auth with `auth.js`
    - [ ] Deploy & configure Keycloak
- Backend
    - [ ] Design server actions
    - [x] Implement DB connectivity
    - [ ] Implement pagination
- Database
    - [x] Design expenses representation
- CI
    - [x] Add CI Docker build
    - [ ] Inject app version into `package.json` in `preview` and `release` pipelines
    - [ ] Add [labels to container image](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#labelling-container-images)
- Deploy
    - [ ] Add Kubernetes deployment to `release` action
    - [ ] Create Kubernetes `speezy-services` repo
        - [ ] Setup secrets & env vars
    - [ ] Create local cluster with Postgres, Keycloak and Speezy
- Chore
    - [x] Make repo public
- Bugs
    - [ ] Fix layout shift on mobile for navbar (on scroll & on account modal open)

## Commit SemVer

### References:

- [ConventionalCommits](https://www.conventionalcommits.org/en/v1.0.0/)
- [conventional-commits-cheatsheet.md](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

### Keys

- Changes relevant to the API or UI:
    - `fix:` a commit of type `fix` patches a bug in your codebase
    - `feat:` a commit of type `feat` introduces a new feature to the codebase
- `refactor:` a commit of type `refactor` rewrites or restructures code without altering API or UI behavior
    - `perf:` a commit of type `perf` is a special type of `refactor` commit that specifically improves performance
- `build:` a commit of type `build` affects build-related components such as build tools, dependencies and project version
- `ci:` a commit of type `ci` affects CI/CD pipelines
- `docs:` a commit of type `docs` exclusively affects documentation
- `style:` a commit of type `style` addresses code style (e.g., white-space, formatting, missing semi-colons) and does not affect application behavior
- `test:` a commit of type `test` adds missing tests or corrects existing ones
- `chore:` a commit of type `chore` is a miscellaneous commit (e.g. modifying `.gitignore`, ...)

### Rules

- `key: some message` is a regular commit
- `key(scope): some message` is a scoped commit
- `key!: some message` or `key(scope)!: some message` is a breaking change commit
