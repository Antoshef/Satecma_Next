import React from 'react';
import { TextField } from '@/components/textField/TextField';

interface ApplicationDetailsProps {
  showApplication: boolean;
  application: { warranty: number; delivery: number };
  setApplication: React.Dispatch<
    React.SetStateAction<{ warranty: number; delivery: number }>
  >;
  isFieldsDisabled: boolean;
  providerPhone?: string;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  showApplication,
  application,
  setApplication,
  isFieldsDisabled,
  providerPhone
}) => {
  if (!showApplication) return null;

  return (
    <div className="mt-8">
      <p>Валидност на офертата: 30 дни</p>
      <p>
        Начин на плащане: По Договор 50% - АВАНСОВО,
        <br /> 30% междинно плащане и 20% при издаване на обекта;
      </p>
      <p>
        Срок на изпълнение: до{' '}
        <TextField
          type="text"
          name="delivery"
          value={application.delivery}
          smallField
          isFieldsDisabled={isFieldsDisabled}
          onChange={(e) =>
            setApplication({
              ...application,
              delivery: +e.target.value
            })
          }
        />{' '}
        работни дни;
      </p>
      <p>
        Гаранция по изпълнение:{' '}
        <TextField
          type="text"
          name="warranty"
          value={application.warranty}
          smallField
          isFieldsDisabled={isFieldsDisabled}
          onChange={(e) =>
            setApplication({
              ...application,
              warranty: +e.target.value
            })
          }
        />{' '}
        години
      </p>
      <p className="pt-4">
        След завършване на обекта с протокол акт 19, <br />
        се измерват всички количества. <br />
        За всички допълнителни СМР-та, се издават анекси.
      </p>
      <p className="pt-4">
        За информация относно продуктите и услугите, <br />
        моля свържете се с нас на телефон: {providerPhone}
      </p>
    </div>
  );
};

export default ApplicationDetails;
