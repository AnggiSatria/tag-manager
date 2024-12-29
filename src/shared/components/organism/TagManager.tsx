import React, { useState, useEffect } from "react";
import axios from "axios";
import TagSelect from "../molecules/TagSelect";
import TagInput from "../molecules/TagInput";

interface TagManagerProps {
  entityId: string;
}

const TagManager: React.FC<TagManagerProps> = ({ entityId }) => {
  const [tags, setTags] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"suggestions" | "entities">(
    "suggestions"
  );

  // Fetch existing tags
  const fetchTags = async () => {
    try {
      const response = await axios.get(`/api/tags?status=${status}`);
      const fetchedTags = response.data.map(
        (tag: { id: string; name: string }) => ({
          label: tag.name,
          value: tag.id,
        })
      );

      setTags(fetchedTags);
      // Set the default selected tags based on fetched data
      setSelectedTags(fetchedTags);
    } catch (error) {
      console.error("Error fetching tags", error);
    }
  };

  const handleTagChange = (newValue: any) => {
    setSelectedTags(newValue);
  };

  const handleCreateTag = async () => {
    if (!newTagName) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/tags", {
        name: newTagName,
        status,
      });
      const newTag = {
        label: response.data.name,
        value: response.data.id,
      };
      setTags((prevTags) => [...prevTags, newTag]);
      setSelectedTags((prevTags) => [...prevTags, newTag]); // Add new tag to selected tags
      setNewTagName("");
    } catch (error) {
      console.error("Error creating tag", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [status]);

  return (
    <div>
      <h2>Tag Manager for Entity: {entityId}</h2>

      <TagSelect
        status={status}
        onChange={handleTagChange}
        value={selectedTags}
        defaultOptions={tags} // Pass fetched tags as default options
      />

      <TagInput
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
        onCreate={handleCreateTag}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TagManager;
