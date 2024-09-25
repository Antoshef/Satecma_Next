'use client';

import { Client } from '@/clients/utils/types';
import { InputWrapper } from '@/components/input/wrapper';
import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import useToast from '@/products/utils/useToast';
import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { InvoiceRequestBody } from '../../../pages/api/create/types';
import { TableItems } from '../table/tableItems';
import { useTableItems } from '../table/useTableItems';
import { createInvoice, getClientData, updateProducts } from './actions';
import CompanySuggestions from './CompanySuggestions';
import {
  INIT_RECEIVER,
  INVOICE_DATA_DEFAULT_VALUES,
  SATECMA_LOGO,
  VAT_PREFIX
} from './constants';
import { Company, InvoiceData, InvoiceType } from './types';
import { Product } from '@/products/utils/types';

interface InvoiceTableProps {
  provider: Company;
  clients: Client[];
  products: Product[];
  invoiceIds: string[];
}

export const InvoiceTable = ({
  clients,
  invoiceIds,
  products,
  provider
}: InvoiceTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState(invoiceIds[0]);
  const [wordPrice, setWordPrice] = useState('');
  const [reason, setReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('По Банка');
  const [email, setEmail] = useState('');
  const [sendMailToRecepient, setSendMailToRecepient] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<Client>(INIT_RECEIVER);
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(
    InvoiceType.proforma
  );
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(
    INVOICE_DATA_DEFAULT_VALUES
  );
  const { ToastContainer, notify } = useToast();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const css = await fetch('/globals.css').then((res) => res.text());

    try {
      if (!invoiceRef.current?.outerHTML) {
        notify('Възникна грешка при създаването на фактурата.', 'error');
        return;
      }

      if (invoiceType === InvoiceType.original) {
        if (items.length > 0) {
          await updateProducts(items);
        }
      }
      await getClientData(receiver);
      const invoiceRequest: InvoiceRequestBody = {
        email,
        invoiceNumber,
        html: invoiceRef.current.outerHTML,
        css,
        sendMailToRecepient,
        invoiceType,
        providerName: provider?.name,
        client: invoiceData.client
      };
      await createInvoice({ invoiceRequest, invoiceData });

      notify('Фактурата е създадена успешно!', 'success');
    } catch (error) {
      notify('Възникна грешка при създаването на фактурата.', 'error');
      setIsFieldsDisabled(false);
    }
  };

  const {
    items,
    total,
    addItem,
    itemChangeHandler,
    itemSelectHandler,
    removeItem
  } = useTableItems({ selectedProduct, setSelectedProduct });

  const productChangeHandler = (item: { name: string }) => {
    setSelectedProduct(
      products.find((product) => product.name === item.name) || null
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiver((state) => ({
      ...state,
      [name]: value
    }));
  };

  const paymentMethodHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    setEmail(receiver.email);
  }, [receiver.email, setEmail]);

  useEffect(() => {
    setReceiver((state) => ({
      ...state,
      VAT: receiver.eik ? `${VAT_PREFIX}${receiver.eik}` : ''
    }));
  }, [receiver.eik]);

  useEffect(() => {
    setError(!wordPrice || !invoiceNumber);
  }, [wordPrice, invoiceNumber, setError]);

  useEffect(() => {
    setInvoiceData((state) => ({
      ...state,
      items,
      total: total.paid,
      invoiceNumber,
      receiver
    }));
  }, [receiver, total, invoiceNumber, items]);

  return (
    <div className="p-4">
      <form onSubmit={onSubmit} id="invoice">
        <ToastContainer />
        <div ref={invoiceRef} className="send-box grid gap-4">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="title">
              <Image
                style={{ height: 'auto', width: 'auto' }}
                src={SATECMA_LOGO}
                alt="Satecma logo"
                width={420}
                height={95}
              />
              <br />
              <SelectField
                isFieldsDisabled={isFieldsDisabled}
                value={invoiceType}
                values={[InvoiceType.original, InvoiceType.proforma]}
                displayValues={['Фактура Оригинал', 'Проформа Фактура']}
                className="text-3xl mb"
                onChange={(e) => setInvoiceType(e.target.value as InvoiceType)}
              />
              <br />
              <br />
              <span>
                Фактура №:{' '}
                <TextField
                  name="invoiceNumber"
                  type="text"
                  placeholder="0000000001"
                  value={invoiceNumber}
                  isFieldsDisabled={isFieldsDisabled}
                  maxLength={10}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
                {invoiceNumber.length !== 10 && (
                  <>
                    <br />
                    <span className="invoiceBox__error">
                      Номера трябва да съдържа 10 символа
                    </span>
                  </>
                )}
              </span>
              <br />
              <span>
                Създадена:{' '}
                <TextField
                  isFieldsDisabled={isFieldsDisabled}
                  value={invoiceData.date}
                  type="date"
                  name="date"
                  onChange={(e) =>
                    setInvoiceData((state) => ({
                      ...state,
                      date: e.target.value
                    }))
                  }
                />
              </span>
            </div>

            {/* Provider Data */}
            <div>
              <h3 className="font-bold">Доставчик:</h3>
              <p>Фирма: {provider.name}</p>
              <p>ЕИК: {provider.eik}</p>
              <p>ДДС №: BG{provider.eik}</p>
              <p>Град: {provider.city}</p>
              <p>Адрес: {provider.address}</p>
              <p>МОЛ: {provider.director}</p>
              <p>Телефон: {provider.phone}</p>
            </div>
          </div>

          {/* Invoice Information */}
          <div className="information grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                Данъчна основа без отстъпка:{' '}
                {total.amountWithoutDiscount.toFixed(2)} BGN
              </p>
              <p>Отстъпка: {total.discount.toFixed(2)} BGN</p>
              <p>Общо НЕТО: {total.netAmount.toFixed(2)} BGN</p>
              <p>Начислен ДДС (20.00 %): {total.VAT.toFixed(2)} BGN</p>
              <p>Сума за плащане: {total.paid.toFixed(2)} BGN</p>
              <p>
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
              </p>
            </div>
          </div>

          {/* Items and Services */}
          <div className="bg-gray-700 text-white grid grid-cols-8 gap-2 p-2">
            <div>№</div>
            <div>Продукт / Услуга</div>
            <div>Количество</div>
            <div>Опаковка</div>
            <div>Ед. цена</div>
            <div>Отстъпка</div>
            <div>ДДС</div>
            <div>Стойност (без ДДС)</div>
          </div>

          <TableItems
            items={items}
            isFieldsDisabled={isFieldsDisabled}
            itemChangeHandler={itemChangeHandler}
            itemSelectHandler={itemSelectHandler}
            removeItem={removeItem}
          />

          <InputWrapper
            data={products}
            isFieldsDisabled={isFieldsDisabled}
            selectedItem={selectedProduct}
            onSubmit={addItem}
            setSelectedItem={
              productChangeHandler as (item: { name: string }) => void
            }
            displayProperty="name"
          />

          {/* Client Data */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">Получател:</h3>
              <p>
                Име на фирма:{' '}
                <CompanySuggestions
                  clients={clients}
                  receiver={receiver}
                  setReceiver={setReceiver}
                  isFieldsDisabled={isFieldsDisabled}
                />
              </p>
              <p>
                Град:{' '}
                <TextField
                  name="city"
                  type="text"
                  placeholder="Град"
                  value={receiver.city}
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={onChange}
                />
              </p>
              <p>
                Адрес:{' '}
                <TextField
                  name="address"
                  type="text"
                  placeholder="Адрес"
                  value={receiver.address}
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={onChange}
                />
              </p>
              <p>
                ЕИК:{' '}
                <TextField
                  name="EIK"
                  type="text"
                  placeholder="ЕИК"
                  value={receiver.eik}
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={onChange}
                />
              </p>
              <p>
                ДДС №:{' '}
                <TextField
                  name="VAT"
                  type="text"
                  placeholder="ДДС №"
                  value={receiver.vat}
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={onChange}
                />
              </p>
              <p>
                МОЛ:{' '}
                <TextField
                  name="director"
                  type="text"
                  placeholder="МОЛ"
                  value={receiver.director}
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={onChange}
                />
              </p>
              <p>
                Е-Поща:{' '}
                <TextField
                  name="email"
                  type="text"
                  placeholder="Е-Поща"
                  value={receiver.email}
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={onChange}
                />
              </p>
            </div>
            <div>
              <h3 className="font-bold">Начин на плащане:</h3>
              <SelectField
                isFieldsDisabled={isFieldsDisabled}
                value={paymentMethod}
                values={['По Банка', 'В Брой']}
                onChange={paymentMethodHandler}
              />
              <br />
              {paymentMethod === 'По Банка' && (
                <>
                  <p>Банкови реквизити: {provider.bankName}</p>
                  <p>BIC: {provider.swift}</p>
                  <p>IBAN: {provider.iban}</p>
                </>
              )}
              <p>Основание на сделка по ЗДДС:</p>
              <TextField
                name="reason"
                type="text"
                placeholder="Основание на сделка по ЗДДС"
                value={reason}
                isFieldsDisabled={isFieldsDisabled}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-2">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => setSendMailToRecepient(!sendMailToRecepient)}
          >
            <input
              type="checkbox"
              checked={sendMailToRecepient}
              onChange={() => setSendMailToRecepient(!sendMailToRecepient)}
              className="form-checkbox h-5 w-5 text-blue-600"
              aria-label="controlled"
            />
            <span className="ml-2 text-sm">Изпрати до получател</span>
          </div>
        </div>
        <div className="invoice__button">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={error || isFieldsDisabled}
            type="submit"
          >
            Създай
          </button>
        </div>
      </form>
    </div>
  );
};
