import { fetchApi, ApiError } from '@/lib';
import type { Advert, SubjectPriority, Catalog, Region } from './types';

export const ADVERT_TYPE_ID = 6;

export async function login() {
  const res = await fetchApi('/users/login/', undefined, {
    method: 'POST',
    body: JSON.stringify({
      email: process.env.AUTH_LOGIN,
      password: process.env.AUTH_PASSWORD,
    }),
  });
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError('Error in api login', info, res.status);
  }
  const data: { access: string } = await res.json();
  return data.access;
}

export async function fetchAdverts(
  input = '',
  region_id: number | string | undefined,
) {
  const res = await fetchApi('/wb/adverts/', {
    type: ADVERT_TYPE_ID,
    input,
    region_id,
  });
  if (!res.ok) {
    if (res.status === 400) return null;
    const info = await res.json();
    throw new ApiError('Error in api fetchAdverts', info, res.status);
  }
  return res.json() as Promise<{
    bets: Advert[];
    subject_priorities: SubjectPriority[];
  }>;
}

export async function fetchRegions() {
  const res = await fetchApi('/wb/regions/');
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError('Error in api fetchRegions', info, res.status);
  }
  return res.json() as Promise<Region[]>;
}

export async function fetchCatalogs(search: string) {
  const res = await fetchApi('/wb/catalogs/', { search });
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError('Error in api fetchCatalogs', info, res.status);
  }
  return res.json() as Promise<Catalog[]>;
}

export * from './types';
