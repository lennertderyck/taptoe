export const manageModules = [
    { name: 'Gebruikers', path: 'users', icon: 'group' },
    { name: 'Rollen', path: 'users/roles', icon: 'shield', notify: true },
    { name: 'Toestemmingen', path: 'users/auth-scopes', icon: 'shield-check', disabled: false },
    { name: 'Tribes', path: 'tribes', icon: 'community', disabled: false },
    { name: 'Tribe verzoeken', path: 'requests/tribes', icon: 'community', disabled: true },
    { name: 'Locaties', path: 'locations', icon: 'home-5', disabled: true },
    { name: 'Verificatie verzoeken', path: 'requests/verification', icon: 'check-double', disabled: true },
    { name: 'Rapporteringen', path: 'reports', icon: 'flag', disabled: true },
]

export const authScopeTypes = [
    { name: 'read', label: 'Lezen' },
    { name: 'write', label: 'Schrijven' },
    { name: 'delete', label: 'Verwijderen' },
]

export const devBarLinks = [
    { label: 'GraphQL api', url: 'http://localhost:4000', external: true },
    { label: 'Mapbox', url: 'https://account.mapbox.com/', external: true },
    { label: 'Icons', url: '/manage/dev/icons' },
]