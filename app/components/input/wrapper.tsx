import { Item, ProductData } from "@/create/invoice/types";
import { Input } from ".";

interface InputWrapperProps {
  products: ProductData[];
  selectedProduct: ProductData | null;
  isFieldsDisabled: boolean;
  setSelectedProduct: (product: ProductData | null) => void;
  onSubmit: () => void;
}

export const InputWrapper = ({
  isFieldsDisabled,
  products,
  selectedProduct,
  onSubmit,
  setSelectedProduct,
}: InputWrapperProps) => {
  return (
    !isFieldsDisabled && (
      <tr>
        <td></td>
        <td colSpan={1}>
          <Input
            products={products}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
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
