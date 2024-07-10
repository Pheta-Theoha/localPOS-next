import { User } from './types';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('http://localhost:8000/api/users/', {
    credentials: 'include', // Include cookies if needed for authentication
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
