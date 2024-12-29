import { Tag } from '@/types/types';

const API_URL = 'https://your-fake-api-url.com';

export const fetchTagsForEntity = async (entityId: string): Promise<Tag[]> => {
  const response = await fetch(`${API_URL}/entities/${entityId}/tags`);
  return response.json();
};

export const fetchTagSuggestions = async (): Promise<Tag[]> => {
  const response = await fetch(`${API_URL}/tags/suggestions`);
  return response.json();
};

export const createTag = async (entityId: string, tag: Tag): Promise<Tag[]> => {
  const response = await fetch(`${API_URL}/entities/${entityId}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tag),
  });
  return response.json();
};
