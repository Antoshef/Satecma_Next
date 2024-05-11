import { Input } from ".";

interface InputWrapperProps {
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
  onSubmit,
  setSelectedItem,
}: InputWrapperProps) => {
  return (
    !isFieldsDisabled && (
      <tr>
        <td></td>
        <td colSpan={1}>
          <Input
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
