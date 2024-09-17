import { Button } from '@/components/button';
import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import { StoreUnits } from '@/store/utils/types';
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
      currentPackage,
      discount,
      quantity,
      price,
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
          {` ${StoreUnits.pcs}`}
        </td>
        <td>
          <SelectField
            name="currentPackage"
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value={currentPackage.toString()}
            values={packing.split(', ')}
            onChange={itemSelectHandler}
          />
          {` ${unit}`}
        </td>

        <td>{`${(price * currentPackage).toFixed(2)} лв.`}</td>
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
