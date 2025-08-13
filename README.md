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
    - [ ] Homogenize UI look and feel between auth and app pages
    - [ ] Improve auth pages light theme
- Behavior
    - [ ] Add view transitions
    - [ ] Add localization (IT, EN)
- Features
    - [x] Add account settings
    - [ ] Add `new expense` page
    - [x] Add `not found` page
    - Add `history` page
        - [ ] Progressively load more entries
        - [ ] Add filters
        - [ ] Add edit feature to entries
    - [ ] Add `stats` page
- Auth
    - [x] Implement app auth with `auth.js`
    - [ ] Deploy & configure Keycloak
- Backend
    - [ ] Design server actions
    - [x] Implement DB connectivity
    - [ ] Implement pagination
- Database
    - [x] Design expenses representation
- CI
    - [x] Add CI Docker build
    - [x] Inject app version into `package.json` in `release` pipelines
    - [ ] Add [labels to container image](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#labelling-container-images)
- Deploy
    - [ ] Add Kubernetes deployment to `release` action
    - [ ] Create Kubernetes `speezy-services` repo
        - [ ] Setup secrets & env vars
    - [ ] Create local cluster with Postgres, Keycloak and Speezy
- Chore
    - [x] Make repo public
- Bugs
    - [x] Fix layout shift on mobile for navbar (on scroll & on account modal open)
    - [ ] Decide whether to fix navbar showing on top of keyboard when scrolling all the way down from an input text (is it really a bug?)

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

## Running on a mobile device

> **NOTE**: This guide has been tested for Windows using WSL (on Ubuntu 24.04 LTS) for development, with Next.js running the `dev` command on the default port (`3000`).

1. _(Optional)_ Configure [scrcpy](https://github.com/Genymobile/scrcpy).

2. Allow port `3000` on the Windows Firewall:
    ```sh
    # PowerShell (administrator)
    > netsh advfirewall firewall add rule name="WSL Next.js Dev" dir=in action=allow protocol=TCP localport=3000
    ```
3. Ensure Windows auto-forwards network traffic to WSL:
    - Get your Windows private IP address:

        ```sh
        # Powershell
        > ipconfig
        ```

        Look for `Wireless LAN adapter Wi-Fi:` if you are connected via Wi-Fi, or `Ethernet adapter Ethernet:` if you are connected via LAN, then `IPv4 Address`. It will be referred to as `<WIN-IP-ADDRESS>` from now on.

    - Get your WSL Private IP address

        ```sh
        # WSL bash
        $ ip addr show eth0 | grep 'inet '
        inet 172.xxx.yyy.zzz ...
        ```

        The address after `inet` will be your WSL IP address. It will be referred to as `<WSL-IP-ADDRESS>` from now on.

    - Enable auto-forwarding:

        ```sh
        # Powershell (administrator)
        > netsh interface portproxy add v4tov4 listenport=3000 listenaddress=<WIN-IP-ADDRESS> connectport=3000 connectaddress=<WSL-IP-ADDRESS>
        ```

        > **NOTE**: if you need to cleanup this rule, run:
        >
        > ```sh
        > # Powershell (administrator)
        > > netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=<WIN-IP-ADDRESS>
        > ```

4. Update `<WIN-IP-ADDRESS>` in the project:
    - Update the `AUTH_URL` env variable in `package.json` > `scripts` > `emu` to point to your `<WIN-IP-ADDRESS>`.
    - Update the dev origins at `next.config.js` > `nextConfig` > `allowedDevOrigins` to include your `<WIN-IP-ADDRESS>` (see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins).

5. Run the `emu` command:

    ```sh
    # WSL (inside this repo)
    $ npm run emu
    ```

6. Ensure your mobile device is connected to the same network as your PC.

7. Open your device browser and navigate to `http://<WIN-IP-ADDRESS>:3000`
    > **NOTE**: You can also reach this URL from the emulated device using `scrcpy`.
