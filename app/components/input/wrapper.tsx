import { GenericInput, GenericInputProps } from '../genericTable/genericInput';

interface InputWrapperProps extends GenericInputProps<{ name: string }> {
  data: { name: string }[];
  selectedItem: { name: string } | null;
  isFieldsDisabled: boolean;
  setSelectedItem: (item: { name: string }) => void;
  onSubmit: () => void;
}

export const InputWrapper = ({
  isFieldsDisabled,
  data,
  selectedItem,
  label,
  required,
  onSubmit,
  setSelectedItem
}: InputWrapperProps) => {
  return (
    !isFieldsDisabled && (
      <>
        <td></td>
        <td colSpan={1}>
          <GenericInput
            label={label}
            required={required}
            data={data}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            displayProperty="name"
          />
        </td>
        <td colSpan={1}>
          <button className="button" type="button" onClick={onSubmit}>
            Добави
          </button>
        </td>
      </>
    )
  );
};
