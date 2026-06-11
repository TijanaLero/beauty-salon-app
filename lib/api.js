import { auth, DB_URL } from './firebase';

async function getToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('Korisnik nije ulogovan.');
  return user.getIdToken();
}

async function dbRequest(path, options = {}) {
  const token = await getToken();
  const url = `${DB_URL}${path}.json?auth=${token}`;

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) throw new Error(`Greška pri komunikaciji sa bazom: ${res.status}`);

  return res.json();
}

export const api = {
  get: (path) => dbRequest(path),

  put: (path, data) => dbRequest(path, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  post: (path, data) => dbRequest(path, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  patch: (path, data) => dbRequest(path, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),

  delete: (path) => dbRequest(path, { method: 'DELETE' }),
};