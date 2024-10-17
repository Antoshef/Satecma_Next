interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  isFieldsDisabled: boolean;
  value: string;
  values: string[];
  displayValues?: string[];
  className?: string;
}

export const SelectField = ({
  name,
  value,
  values,
  displayValues,
  className,
  isFieldsDisabled,
  onChange,
  ...props
}: SelectFieldProps) => (
  <>
    {isFieldsDisabled ? (
      <span className={className}>
        {displayValues ? displayValues[values.indexOf(value)] : value}
      </span>
    ) : (
      <select
        {...props}
        className={`border border-gray-300 rounded-md px-2 py-0.5 pr-6 ${className}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {values.map((v, i) => (
          <option key={v} value={v}>
            {displayValues ? displayValues[i] : v}
          </option>
        ))}
      </select>
    )}
  </>
);
