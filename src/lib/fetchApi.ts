import qs from 'qs';
import clientCookies from 'js-cookie';

export async function fetchApi(
  path: string,
  queryParamsObject = {},
  options: RequestInit = {},
) {
  let authToken: string | undefined;

  try {
    if (typeof window === 'undefined') {
      authToken = clientCookies.get('authToken');
    } else {
      const { cookies: serverCookies } = await import('next/headers');
      authToken = serverCookies().get('authToken')?.value;
    }

    // Merge default and user options
    const mergedOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(queryParamsObject);
    const requestUrl = `${process.env.API_URL}${path}${
      queryString ? `?${queryString}` : ''
    }`;

    // Trigger API call
    return fetch(requestUrl, mergedOptions);
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
}
