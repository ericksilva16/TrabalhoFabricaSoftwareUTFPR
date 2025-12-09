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

// Stable per-user identifier to key client-side data like favorites
export function getUserId() {
  const token = getToken();
  const payload = decodeJwt(token);
  if (payload) {
    return payload.sub || payload.userId || payload.id || payload.uid || null;
  }
  try {
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;
    if (!user) return null;
    return user.id || user.userId || user.uid || user.email || null;
  } catch (_) {
    return null;
  }
}

// Migrate generic favorites keys to per-user keys after login
export function migrateFavoritesForUser(userId) {
  if (!userId) return;
  try {
    const legacyEst = localStorage.getItem('favEstagios');
    if (legacyEst) {
      const arr = JSON.parse(legacyEst);
      const key = `favEstagios_${userId}`;
      const existing = localStorage.getItem(key);
      const merged = Array.from(new Set([...
        (Array.isArray(arr) ? arr.map(String) : []),
        ...(existing ? JSON.parse(existing).map(String) : [])
      ]));
      localStorage.setItem(key, JSON.stringify(merged));
      localStorage.removeItem('favEstagios');
    }
  } catch (_) {}
  try {
    const legacyOpp = localStorage.getItem('favOportunidades');
    if (legacyOpp) {
      const arr = JSON.parse(legacyOpp);
      const key = `favOportunidades_${userId}`;
      const existing = localStorage.getItem(key);
      const merged = Array.from(new Set([...
        (Array.isArray(arr) ? arr.map(String) : []),
        ...(existing ? JSON.parse(existing).map(String) : [])
      ]));
      localStorage.setItem(key, JSON.stringify(merged));
      localStorage.removeItem('favOportunidades');
    }
  } catch (_) {}
}
