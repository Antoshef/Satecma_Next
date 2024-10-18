import React from 'react';
import { ChangeEvent } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isFieldsDisabled?: boolean;
  type: string;
  placeholder?: string;
  value: string | number;
  name: string;
  smallField?: boolean;
  maxLength?: number;
  className?: string;
  textClass?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  value,
  name,
  type,
  placeholder,
  isFieldsDisabled,
  smallField,
  maxLength,
  className,
  textClass,
  onChange,
  ...props
}: TextFieldProps) => {
  const classes = `
    ${smallField && 'max-w-12'} 
    'border border-gray-300 rounded-md px-1 py-0.5 focus:outline-none'
    ${className}`;

  return (
    <>
      {isFieldsDisabled ? (
        <span className={textClass}>
          {type === 'number' ? Number(value).toFixed(2) : value}
        </span>
      ) : (
        <input
          {...props}
          className={classes}
          type={type}
          name={name}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
        />
      )}
    </>
  );
};
