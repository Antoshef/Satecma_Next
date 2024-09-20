export interface GenericFormField<T> {
  label: string;
  defaultValue: string | number;
  key: keyof T;
  error: string;
  type: 'text' | 'number' | 'select';
  options?: string[]; // Only for select fields
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
        <div key={String(field.key)}>
          <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              value={field.defaultValue}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
            >
              {field.options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={field.defaultValue}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
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
