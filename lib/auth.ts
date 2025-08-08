import { jwtDecode, type JwtPayload } from "jwt-decode";

const EXCLUDED_ROLES = ["offline_access", "uma_authorization", `default-roles-${process.env.AUTH_KEYCLOAK_REALM!}`];

export function getRoles(accessToken: string) {
    const decodedAccessToken: JwtPayload & { realm_access: { roles: string[] | undefined } } = jwtDecode(accessToken);
    const roles = decodedAccessToken?.realm_access?.roles ?? [];

    return roles.filter((role) => !EXCLUDED_ROLES.includes(role));
}
