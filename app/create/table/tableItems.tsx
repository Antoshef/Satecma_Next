import { Button } from '@/components/button';
import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import { Item } from '../invoice/types';
import Tooltip from '@/components/tooltip';

interface TableItemsProps {
  items: Item[];
  isFieldsDisabled: boolean;
  itemChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  removeItem: (code: string | number | null) => void;
}

export const TableItems = ({
  items,
  isFieldsDisabled,
  itemChangeHandler,
  removeItem
}: TableItemsProps) => {
  const isCustomItem = (code: string | number) =>
    Number(code) >= 8000 && Number(code) < 9000;
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
      <tr key={code} className="border-gray-800 border-b text-right">
        <td className="text-center py-1">
          <Tooltip text="Изтрий">
            <Button
              isFieldsDisabled={isFieldsDisabled}
              value={code}
              onClick={removeItem}
            />
          </Tooltip>
        </td>
        <td className="py-1">
          {isCustomItem(code) ? (
            <TextField
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
        <td className="py-1">
          <TextField
            type="number"
            name="quantity"
            className="max-w-20"
            value={quantity}
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            onChange={itemChangeHandler}
          />
        </td>
        <td className="py-1">
          <TextField
            smallField
            name="package"
            data-code={code}
            isFieldsDisabled={!isCustomItem(code) || isFieldsDisabled}
            value={packing}
            type="number"
            onChange={itemChangeHandler}
          />{' '}
          <SelectField
            name="unit"
            data-code={code}
            isFieldsDisabled={!isCustomItem(code) || isFieldsDisabled}
            value={unit}
            values={['бр.', 'кг.', 'л.']}
            onChange={itemChangeHandler}
          />
        </td>

        <td className="py-1">
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
        <td className="py-1">
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
        <td className="py-1">
          <SelectField
            name="vat"
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value="20"
            values={['20']}
            onChange={itemChangeHandler}
          />
          {' %'}
        </td>
        <td className={!Number(totalPrice) ? 'text-red-500' : ''}>
          {totalPrice} лв.
        </td>
      </tr>
    )
  );
};
