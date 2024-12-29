import React from "react";
import TagListItem from "../atoms/TagListItem";

interface TagListProps {
  tags: { id: string; name: string; color: string }[];
  onRemoveTag: (tagId: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onRemoveTag }) => {
  return (
    <ul>
      {tags?.map((tag) => (
        <TagListItem key={tag.id} tag={tag} onRemove={onRemoveTag} />
      ))}
    </ul>
  );
};

export default TagList;
