"use client";

import React from "react";

interface TagInputProps {
  newTagName: string;
  setNewTagName: (name: string) => void;
  onAddTag: () => void;
}

const TagInput: React.FC<TagInputProps> = ({
  newTagName,
  setNewTagName,
  onAddTag,
}) => {
  return (
    <div>
      <input
        type="text"
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
        placeholder="Add a tag"
      />
      <button onClick={onAddTag}>Add Tag</button>
    </div>
  );
};

export default TagInput;
