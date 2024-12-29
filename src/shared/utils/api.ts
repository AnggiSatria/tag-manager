const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "/api";

export const fetchTags = async (entityId?: number) => {
  const url = entityId ? `/api/tags?entity_id=${entityId}` : `/api/entities`; // Default fetch entities
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch tags or entities");
  }
  return response.json();
};


export const fetchTagSuggestions = async () => {
  const response = await fetch(`${BASE_URL}/api/tag-suggestions`);
  if (!response.ok) {
    throw new Error("Failed to fetch tag suggestions");
  }
  return response.json();
};

export const createTag = async (name?: string) => {
  const response = await fetch(`${BASE_URL}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  console.log(`Ini Test`, response);
  

  if (!response.ok) {
    throw new Error("Failed to create tag");
  }
  return response.json();
};

export const deleteTag = async (tagId: number, entityId: number) => {
  const response = await fetch(`${BASE_URL}/api/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tagId, entityId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete tag");
  }
  return response.json();
};
