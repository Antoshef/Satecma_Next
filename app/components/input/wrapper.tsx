import { GenericInput, GenericInputProps } from '../genericTable/genericInput';
import Tooltip from '../tooltip';

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
        <td colSpan={1} className="py-4 text-center">
          <Tooltip text="Добави Ред">
            <button
              className="py-1 px-3 bg-gray-800 bg-opacity-90 text-gray-200 border-none rounded cursor-pointer text-base hover:bg-opacity-80"
              type="button"
              onClick={onSubmit}
            >
              +
            </button>
          </Tooltip>
        </td>
        <td colSpan={1} className="py-4 text-right">
          <GenericInput
            label={label}
            required={required}
            data={data}
            variant="simple"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            displayProperty="name"
          />
        </td>
        <td colSpan={1} className="py-4 text-right">
          <Tooltip text="Добави Продукт">
            <button
              className="py-1 px-3 bg-gray-800 bg-opacity-90 text-gray-200 border-none rounded cursor-pointer text-base hover:bg-opacity-80"
              type="button"
              disabled={!selectedItem}
              onClick={onSubmit}
            >
              Добави
            </button>
          </Tooltip>
        </td>
      </>
    )
  );
};
