// Simulasi API untuk membuat dan mengambil tag
let tags: { id: string; label: string; color: string }[] = [
  { id: "1", label: "Technology", color: "#FF5733" },
  { id: "2", label: "Health", color: "#33FF57" },
  { id: "3", label: "Finance", color: "#3357FF" },
];

export const createTag = async (label: string) => {
  const newTag = {
    id: Date.now().toString(), // ID berdasarkan timestamp
    label,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Warna acak
  };
  tags.push(newTag);
  return newTag;
};

export const getTags = async () => {
  return tags;
};
