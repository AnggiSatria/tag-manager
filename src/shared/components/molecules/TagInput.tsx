import { Tag } from "@/types/types";
import { useState } from "react";

type TagInputProps = {
  suggestions: Tag[]; // Array of suggestions (tags)
  onAdd: (tag: Tag) => void; // Callback function to add a tag
};

const TagInput: React.FC<TagInputProps> = ({ suggestions, onAdd }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const existingTag = suggestions.find((tag) => tag.name === input);
    if (existingTag) onAdd(existingTag);
    setInput("");
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a tag"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TagInput;
