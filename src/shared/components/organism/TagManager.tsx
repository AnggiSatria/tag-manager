"use client";

import React, { useState, useEffect } from "react";
import {
  fetchTags,
  fetchTagSuggestions,
  createTag,
  deleteTag,
} from "../../utils/api";
import TagActions from "../molecules/TagActions";
import TagList from "../molecules/TagList";

interface TagManagerProps {
  entityId: string;
}

const TagManager: React.FC<TagManagerProps> = () => {
  const [tags, setTags] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    const loadTags = async () => {
      const entityTags = await fetchTags();
      setTags(entityTags);
      const tagSuggestions = await fetchTagSuggestions();
      setSuggestions(tagSuggestions);
    };

    loadTags();
  }, []);

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    const newTag = await createTag(newTagName);
    setTags([...tags, newTag]);
    setNewTagName("");
  };

  const handleRemoveTag = async (entityId: any, tagId: any) => {
    await deleteTag(entityId, tagId);
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div>
      <h3>Tag Manager</h3>
      <TagActions
        newTagName={newTagName}
        setNewTagName={setNewTagName}
        onAddTag={handleAddTag}
      />
      <TagList tags={tags} onRemoveTag={handleRemoveTag} />
      <h4>Suggestions</h4>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagManager;
