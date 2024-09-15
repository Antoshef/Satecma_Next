import { Input, InputProps } from '.';

interface InputWrapperProps extends InputProps {
  data: { name: string }[];
  selectedItem: { name: string } | null;
  isFieldsDisabled: boolean;
  setSelectedItem: (name: string) => void;
  onSubmit: () => void;
}

export const InputWrapper = ({
  isFieldsDisabled,
  data,
  selectedItem,
  size,
  label,
  required,
  onSubmit,
  setSelectedItem
}: InputWrapperProps) => {
  return (
    !isFieldsDisabled && (
      <tr>
        <td></td>
        <td colSpan={1}>
          <Input
            size={size}
            label={label}
            required={required}
            data={data}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </td>
        <td colSpan={1}>
          <button className="button" type="button" onClick={onSubmit}>
            Добави
          </button>
        </td>
      </tr>
    )
  );
};
