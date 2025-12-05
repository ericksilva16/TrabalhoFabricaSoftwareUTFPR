// Minimal auth helpers: read token from localStorage and decode payload
export function getToken() {
  try {
    return localStorage.getItem('token') || null;
  } catch (e) {
    return null;
  }
}

// Decode JWT without verification (client-side only) to read payload
export function decodeJwt(token) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    // Add padding if missing
    const padded = payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, '=');
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

export function getUserRole() {
  const token = getToken();
  const payload = decodeJwt(token);
  if (!payload) return null;
  // Common key used by backend is 'role'
  return payload.role || payload.Role || payload.roleName || null;
}

export function isAdmin() {
  const role = getUserRole();
  if (!role) return false;
  return String(role).toUpperCase() === 'ADMIN';
}

export function isAluno() {
  const role = getUserRole();
  if (!role) return false;
  const r = String(role).toUpperCase();
  return r === 'ALUNO' || r === 'ESTUDANTE';
}
