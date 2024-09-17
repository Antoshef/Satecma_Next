import { classNames } from '@/utils/classNames';

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
  const classes = classNames([className ? className : '', 'button']);
  return (
    <>
      {isFieldsDisabled ? (
        value
      ) : (
        <button
          className={classes}
          type="button"
          onClick={() => onClick(value)}
        >
          {value}
        </button>
      )}
    </>
  );
};
