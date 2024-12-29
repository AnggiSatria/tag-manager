// app/page.tsx
import React from "react";
import TagManager from "@/shared/components/organism/TagManager";

const fetchTags = async (): Promise<any[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tags`,
      {
        method: "GET",
      }
    );

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
      <h1>Tag Manager App</h1>
      {/* Pass data to the client component */}
      <TagManager tags={tags} />
    </div>
  );
};

export default HomePage;
