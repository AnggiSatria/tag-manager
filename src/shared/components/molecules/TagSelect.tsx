import React from "react";
import Select from "react-select/async-creatable";
import axios from "axios";

interface TagSelectProps {
  onChange: (selected: any[]) => void;
  value: any[];
  status: "suggestions" | "entities";
  defaultOptions: any[]; // Added this prop for default options
}

const fetchTags = async (
  inputValue: string,
  status: "suggestions" | "entities"
) => {
  const response = await axios.get(
    `/api/tags?status=${status}&search=${inputValue}`
  );
  return response.data.map((tag: { id: string; name: string }) => ({
    label: tag.name,
    value: tag.id,
  }));
};

const createTag = async (
  inputValue: string,
  status: "suggestions" | "entities"
) => {
  const response = await axios.post("/api/tags", { name: inputValue, status });
  return {
    label: response.data.name,
    value: response.data.id,
  };
};

const TagSelect: React.FC<TagSelectProps> = ({
  onChange,
  value,
  status,
  defaultOptions,
}) => {
  return (
    <Select
      isMulti
      value={value}
      onChange={onChange}
      cacheOptions
      loadOptions={(inputValue) => fetchTags(inputValue, status)}
      defaultOptions={defaultOptions} // Pass the defaultOptions here
      createOptionPosition="first"
      onCreateOption={(inputValue) => createTag(inputValue, status)}
    />
  );
};

export default TagSelect;
