import { fetchApi, ApiError } from '@/lib';
import Cookies from 'js-cookie';

export async function login() {
  const res = await fetchApi(
    '/users/login/',
    { email: process.env.AUTH_LOGIN, password: process.env.AUTH_EMAIL },
    { method: 'POST' },
  );
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError('Error in api login', info, res.status);
  }
  const data: { access: string } = await res.json();
  const authToken = data.access;
  typeof window === 'undefined'
    ? await import('next/headers').then(({ cookies }) =>
        cookies().set('authToken', authToken),
      )
    : Cookies.set('authToken', authToken);
}

export async function fetchAdverts(type: string, Input: string) {
  const res = await fetchApi('/wb/adverts/', { type, Input });
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError('Error in api fetchAdverts', info, res.status);
  }
  return res.json();
}

export async function fetchCatalogs() {
  const res = await fetchApi('/wb/catalogs/');
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError('Error in api fetchCatalogs', info, res.status);
  }
  return res.json();
}

export async function fetchRegions() {
  const res = await fetchApi('/wb/regions/');
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError('Error in api fetchRegions', info, res.status);
  }
  return res.json();
}
