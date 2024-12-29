// app/page.tsx
import TagManagerTemplate from "@/shared/components/templates/TagManagerTemplate";
import React from "react";

const fetchTags = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tags`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};

const HomePage = async () => {
  const tags = await fetchTags();

  return (
    <div>
      <TagManagerTemplate />
    </div>
  );
};

export default HomePage;
