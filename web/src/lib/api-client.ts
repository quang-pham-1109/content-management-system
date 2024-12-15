import { FetchError } from './class/fetch-error';

interface FetchDataProps {
  method: string;
  path: string;
  name: string;
  body?: Record<string, unknown>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * This is a wrapper function for fetchingData from the API.
 * It takes in the method, path, name, and body of the request.
 * It returns the data or throw a FetchError if the request fails.
 * This error can be caught and handled in the `state` layer by React Query.
 * @param {FetchDataProps} { method, path, name, body }
 * @returns {Promise<T | FetchError>}
 */
export const fetchData = async <T>({
  method = 'GET',
  path,
  name,
  body,
}: FetchDataProps): Promise<T> => {
  try {
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const formattedBody = body ? JSON.stringify(body) : undefined;

    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: headers,
      body: formattedBody,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new FetchError(name, error.error, response.status);
    }

    const data: T = await response.json();
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      throw err;
    }

    throw new FetchError('Unknown Error', 'An unknown error occurred', 500);
  }
};
