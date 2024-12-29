import React from "react";

interface TagListItemProps {
  tag: { id: string; name: string; color: string };
  onRemove: (tagId: string) => void;
}

const TagListItem: React.FC<TagListItemProps> = ({ tag, onRemove }) => {
  return (
    <li style={{ backgroundColor: tag.color, padding: "5px" }}>
      {tag.name}
      <button onClick={() => onRemove(tag.id)}>Remove</button>
    </li>
  );
};

export default TagListItem;
