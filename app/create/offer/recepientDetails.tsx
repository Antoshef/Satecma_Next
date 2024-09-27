import React from 'react';
import { TextField } from '@/components/textField/TextField';

interface RecipientDetailsProps {
  recipient: {
    name: string;
    phone: string;
    email: string;
  };
  setRecipient: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
      email: string;
    }>
  >;
  isFieldsDisabled: boolean;
}

const RecipientDetails: React.FC<RecipientDetailsProps> = ({
  recipient,
  setRecipient,
  isFieldsDisabled
}) => {
  return (
    <td colSpan={6} className="py-4 align-top text-right">
      <div className="mb-1">
        <span className="text-right">Получател:</span>
        <TextField
          type="text"
          name="name"
          value={recipient.name}
          isFieldsDisabled={isFieldsDisabled}
          onChange={(e) =>
            setRecipient({
              ...recipient,
              name: e.target.value
            })
          }
        />
      </div>
      <div className="mb-1">
        <span className="text-right">Телефон:</span>
        <TextField
          type="text"
          name="phone"
          value={recipient.phone}
          isFieldsDisabled={isFieldsDisabled}
          onChange={(e) =>
            setRecipient({
              ...recipient,
              phone: e.target.value
            })
          }
        />
      </div>
      <div>
        <span className="text-right">Е-Поща:</span>
        <TextField
          type="text"
          name="email"
          value={recipient.email}
          isFieldsDisabled={isFieldsDisabled}
          onChange={(e) => {
            setRecipient({
              ...recipient,
              email: e.target.value
            });
          }}
        />
      </div>
    </td>
  );
};

export default RecipientDetails;
