'use client';

import React from 'react';
import { TextField } from '@/components/textField/TextField';

interface InvoicePriceDataProps {
  total: {
    amountWithoutDiscount: number;
    discount: number;
    netAmount: number;
    VAT: number;
    paid: number;
  };
  wordPrice: string;
  setWordPrice: (price: string) => void;
  isFieldsDisabled: boolean;
}

export const InvoicePriceData: React.FC<InvoicePriceDataProps> = ({
  total,
  wordPrice,
  setWordPrice,
  isFieldsDisabled
}) => {
  return (
    <tr className="information">
      <td colSpan={8}>
        <table>
          <tbody>
            <tr>
              <td>
                Данъчна основа без отстъпка:{' '}
                {total.amountWithoutDiscount.toFixed(2)} BGN
                <br />
                Отстъпка: {total.discount.toFixed(2)} BGN
                <br />
                Общо НЕТО: {total.netAmount.toFixed(2)} BGN
                <br />
                Начислен ДДС (20.00 %): {total.VAT.toFixed(2)} BGN
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
                {!wordPrice.length && (
                  <>
                    <br />
                    <span className="invoiceBox__error">
                      Полето не може да бъде празно
                    </span>
                  </>
                )}
                <br />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};
