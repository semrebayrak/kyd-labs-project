import ReactSelect, { OptionsOrGroups } from "react-select";

interface SelectProps {
  options: OptionsOrGroups<
    { value: string; label: string },
    { label: string; options: { value: string; label: string }[] }
  >;
  value: string | null;
  onChange: (value: string) => void;
  placeholder: string;
}

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  return (
    <ReactSelect
      options={options}
      value={value ? { value, label: value } : undefined}
      onChange={(selected) => onChange(selected?.value || "")}
      placeholder={placeholder}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: "#E5E7EB",
          borderRadius: "0.5rem",
          minHeight: "2.75rem",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#A5B4FC",
          },
        }),
        option: (baseStyles, { isSelected, isFocused }) => ({
          ...baseStyles,
          color: isSelected ? "white" : "black",
          backgroundColor: isSelected
            ? "black"
            : isFocused
              ? "#EEF2FF"
              : "white",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "#1F2937",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "#9CA3AF",
        }),
      }}
    />
  );
};

export default Select;
