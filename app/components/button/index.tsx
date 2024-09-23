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
  onClick
}: ButtonProps) => {
  return (
    <>
      {isFieldsDisabled ? (
        value
      ) : (
        <button
          className={`${className} px-2 bg-gray-800 bg-opacity-90 text-gray-200 border-none rounded cursor-pointer text-base hover:bg-opacity-80`}
          type="button"
          onClick={() => onClick(value)}
        >
          {value}
        </button>
      )}
    </>
  );
};
