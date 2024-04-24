interface ButtonProps {
  isFieldsDisabled: boolean;
  value: string | number;
  className?: string;
  onClick: (value: string | number) => void;
}

export const Button = ({
  isFieldsDisabled,
  value,
  className,
  onClick,
}: ButtonProps) => (
  <>
    {isFieldsDisabled ? (
      value
    ) : (
      <button
        className={className}
        type="button"
        onClick={() => onClick(value)}
      >
        {value}
      </button>
    )}
  </>
);
