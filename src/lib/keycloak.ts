import Keycloak from 'keycloak-js';

// Singleton: una sola instancia por sesión de navegador
let _keycloak: Keycloak | null = null;

// Detecta si Keycloak está configurado (variables de entorno presentes)
export const isKeycloakConfigured = (): boolean =>
  Boolean(process.env.NEXT_PUBLIC_KEYCLOAK_URL);

export function getKeycloak(): Keycloak {
  if (!_keycloak) {
    _keycloak = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL!,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
    });
  }
  return _keycloak;
}

// Limpia la instancia (útil en tests)
export function resetKeycloak(): void {
  _keycloak = null;
}
