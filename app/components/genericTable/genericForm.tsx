import { classNames } from '@/utils/classNames';
import HintIcon from './hintIcon';

export interface GenericFormField<T> {
  label: string;
  defaultValue: string | number;
  name: keyof T;
  error: string;
  type: 'text' | 'number' | 'select';
  options?: string[]; // Only for select fields
  hint?: string;
  required: boolean;
  disabled?: boolean;
  render?: () => JSX.Element;
}

interface GenericFormProps<T> {
  fields: GenericFormField<T>[];
  handleChange: (key: keyof T, value: string | number) => void;
  ProductActions: JSX.Element;
}

export const GenericForm = <T,>({
  fields,
  handleChange,
  ProductActions
}: GenericFormProps<T>) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-theme-light-background dark:bg-theme-dark-background">
      {fields.map((field) => (
        <div key={String(field.name)} className="relative">
          <div className="text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary flex items-center">
            <label>{field.label}</label>
            {field.hint && (
              <HintIcon hint={field.hint} fieldName={String(field.name)} />
            )}
          </div>
          {field.render?.()}
          {!field.render && field.type === 'select' && (
            <select
              value={field.defaultValue}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {!field.render && field.type !== 'select' && (
            <input
              type={field.type}
              value={field.defaultValue}
              disabled={field.disabled}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={classNames([
                'mt-1 block w-full p-2 border rounded-md shadow-sm sm:text-sm',
                !field.disabled
                  ? 'border-theme-light-secondary dark:border-theme-dark-secondary'
                  : 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
              ])}
            />
          )}
          {field.error && (
            <p className="text-red-500 text-xs mt-1">{field.error}</p>
          )}
        </div>
      ))}
      {ProductActions}
    </div>
  );
};
