import { ChangeEvent } from "react";
import { classNames } from "../header/header";

interface TextFieldProps {
  isFieldsDisabled: boolean;
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
  const classes = classNames([
    !!smallField ? "max-w-12" : "",
    "input-field",
    className || "",
  ]);

  return (
    <>
      {isFieldsDisabled ? (
        <span className={textClass}>
          {type === "number" ? Number(value).toFixed(2) : value}
        </span>
      ) : (
        <input
          {...props}
          className={classes}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
        />
      )}
    </>
  );
};
