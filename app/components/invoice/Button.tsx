import "./invoiceBox.css";

interface ButtonProps {
  isFieldsDisabled: boolean;
  value: string | number;
  onClick: (value: string | number) => void;
}

export const Button = ({ isFieldsDisabled, value, onClick }: ButtonProps) => (
  <>
    {isFieldsDisabled ? (
      value
    ) : (
      <button
        className="invoiceBox__button"
        type="button"
        onClick={() => onClick(value)}
      >
        {value}
      </button>
    )}
  </>
);
