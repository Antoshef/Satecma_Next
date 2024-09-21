import { Button } from '@/components/button';
import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import { Item } from '../invoice/types';

interface TableItemsProps {
  items: Item[];
  isFieldsDisabled: boolean;
  className?: string;
  itemChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  itemSelectHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  removeItem: (code: string | number | null) => void;
}

export const TableItems = ({
  items,
  isFieldsDisabled,
  className,
  itemChangeHandler,
  itemSelectHandler,
  removeItem
}: TableItemsProps) => {
  return items.map(
    ({
      code,
      name,
      packing,
      discount,
      quantity,
      sellPrice,
      totalPrice,
      unit
    }) => (
      <tr className={className} key={`${code}_${name}`}>
        <td>
          <Button
            isFieldsDisabled={isFieldsDisabled}
            value={code}
            onClick={removeItem}
          />
        </td>
        <td>{name}</td>
        <td>
          <TextField
            smallField
            type="number"
            name="quantity"
            value={quantity}
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            onChange={itemChangeHandler}
          />
          {unit}
        </td>
        <td>
          {/* <SelectField
            name="package"
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value={pkg}
            values={packing.split(', ')}
            onChange={itemSelectHandler}
          />
          {` ${unit}`} */}
        </td>

        <td>{`${sellPrice.toFixed(2)} лв.`}</td>
        <td>
          <TextField
            smallField
            type="number"
            name="discount"
            value={discount}
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            onChange={itemChangeHandler}
          />
          {'  %'}
        </td>
        <td>
          <SelectField
            name="VAT"
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value="20"
            values={['20']}
            onChange={itemSelectHandler}
          />
          {' %'}
        </td>
        <td className={!Number(totalPrice) ? 'invoiceBox__zero-amount' : ''}>
          {totalPrice} лв.
        </td>
      </tr>
    )
  );
};
