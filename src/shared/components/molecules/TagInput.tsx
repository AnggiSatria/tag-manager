import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface TagInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
  isLoading: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  onCreate,
  isLoading,
}) => {
  return (
    <div>
      <Input value={value} onChange={onChange} placeholder="Enter tag name" />
      <Button onClick={onCreate} disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Tag"}
      </Button>
    </div>
  );
};

export default TagInput;
