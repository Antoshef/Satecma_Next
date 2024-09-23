import { Button } from '@/components/button';
import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import { Item } from '../invoice/types';
import Tooltip from '@/components/tooltip';

interface TableItemsProps {
  items: Item[];
  isFieldsDisabled: boolean;
  itemChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  itemSelectHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  removeItem: (code: string | number | null) => void;
}

export const TableItems = ({
  items,
  isFieldsDisabled,
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
      <>
        <td>
          <Tooltip text="Изтрий">
            <Button
              isFieldsDisabled={isFieldsDisabled}
              value={code}
              onClick={removeItem}
            />
          </Tooltip>
        </td>
        <td>
          {Number(code) >= 8000 && Number(code) < 9000 ? (
            <TextField
              smallField
              name="name"
              type="text"
              value={name}
              data-code={code}
              isFieldsDisabled={isFieldsDisabled}
              onChange={itemChangeHandler}
            />
          ) : (
            name
          )}
        </td>
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
        </td>
        <td>
          <TextField
            smallField
            name="package"
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value={packing}
            type="number"
            onChange={itemChangeHandler}
          />
          <SelectField
            name="unit"
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value={unit}
            values={['бр.', 'кг.', 'л.']}
            onChange={itemSelectHandler}
          />
        </td>

        <td>
          <TextField
            smallField
            type="number"
            name="sellPrice"
            value={sellPrice}
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            onChange={itemChangeHandler}
          />
          {` лв.`}
        </td>
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
            name="vat"
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value="20"
            values={['20']}
            onChange={itemSelectHandler}
          />
          {' %'}
        </td>
        <td className={!Number(totalPrice) ? 'text-red-500' : ''}>
          {totalPrice} лв.
        </td>
      </>
    )
  );
};
