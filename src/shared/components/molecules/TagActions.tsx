import React from "react";
import TagInput from "../atoms/TagInput";

interface TagActionsProps {
  newTagName: string;
  setNewTagName: (name: string) => void;
  onAddTag: () => void;
}

const TagActions: React.FC<TagActionsProps> = ({
  newTagName,
  setNewTagName,
  onAddTag,
}) => {
  return (
    <div>
      <TagInput
        newTagName={newTagName}
        setNewTagName={setNewTagName}
        onAddTag={onAddTag}
      />
    </div>
  );
};

export default TagActions;
