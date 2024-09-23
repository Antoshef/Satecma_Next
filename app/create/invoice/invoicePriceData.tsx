'use client';

import React from 'react';
import { TextField } from '@/components/textField/TextField';

interface InvoicePriceDataProps {
  error: {
    wordPrice: boolean;
    invoiceNumber: boolean;
  };
  total: {
    amountWithoutDiscount: number;
    discount: number;
    netAmount: number;
    vat: number;
    paid: number;
  };
  wordPrice: string;
  setWordPrice: (price: string) => void;
  isFieldsDisabled: boolean;
}

export const InvoicePriceData: React.FC<InvoicePriceDataProps> = ({
  error,
  total,
  wordPrice,
  setWordPrice,
  isFieldsDisabled
}) => {
  return (
    <td colSpan={4} className="text-right">
      <div>
        Данъчна основа без отстъпка: {total.amountWithoutDiscount.toFixed(2)}{' '}
        BGN
        <br />
        Отстъпка: {total.discount.toFixed(2)} BGN
        <br />
        Общо НЕТО: {total.netAmount.toFixed(2)} BGN
        <br />
        Начислен ДДС (20.00 %): {total.vat.toFixed(2)} BGN
        <br />
        Сума за плащане: {total.paid.toFixed(2)} BGN
        <br />
        Словом:{' '}
        <TextField
          name="wordPrice"
          type="text"
          placeholder="Сума на думи"
          value={wordPrice}
          isFieldsDisabled={isFieldsDisabled}
          onChange={(e) => setWordPrice(e.target.value)}
        />
        {error.wordPrice && (
          <>
            <br />
            <p className="text-red-500 text-xs text-center">
              Полето не може да бъде празно
            </p>
          </>
        )}
        <br />
      </div>
    </td>
  );
};
