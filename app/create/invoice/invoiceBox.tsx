'use client';

import { Client } from '@/clients/utils/types';
import { InputWrapper } from '@/components/input/wrapper';
import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import useToast from '@/products/utils/useToast';
import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { InvoiceRequestBody } from '../../../pages/api/create/types';
import { TableItems } from '../table/tableItems';
import { TableServices } from '../table/tableServices';
import { useTableItems } from '../table/useTableItems';
import { createInvoice, getClientData, updateProducts } from './actions';
import ClientInvoiceData from './clientInvoiceData';
import {
  INIT_RECEIVER,
  INVOICE_DATA_DEFAULT_VALUES,
  SATECMA_LOGO,
  VAT_PREFIX
} from './constants';
import { InvoicePriceData } from './invoicePriceData';
import {
  Company,
  InvoiceData,
  InvoiceReceiver,
  InvoiceType,
  LatestInvoices,
  Product
} from './types';

interface InvoiceBoxProps {
  provider: Company;
  clients: Client[];
  products: Product[];
  invoiceIds: LatestInvoices;
}

const InvoiceBox = ({
  clients,
  invoiceIds,
  products,
  provider
}: InvoiceBoxProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wordPrice, setWordPrice] = useState('');
  const [reason, setReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('По Банка');
  const [email, setEmail] = useState('');
  const [sendMailToRecepient, setSendMailToRecepient] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<InvoiceReceiver>(INIT_RECEIVER);
  const [latestInvoiceNumbers, setLatestInvoiceNumbers] =
    useState<LatestInvoices>({
      ...invoiceIds
    });
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(
    InvoiceType.proforma
  );
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(
    INVOICE_DATA_DEFAULT_VALUES
  );
  const { Toast, notify } = useToast();

  const invoiceNumber = useMemo(() => {
    if (invoiceType === InvoiceType.proforma) {
      return latestInvoiceNumbers.proforma;
    }
    return latestInvoiceNumbers.original;
  }, [latestInvoiceNumbers, invoiceType]);

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
    services,
    total,
    addItem,
    itemChangeHandler,
    itemSelectHandler,
    removeItem,
    serviceChangeHandler,
    serviceSelectHandler
  } = useTableItems({ selectedProduct, setSelectedProduct });

  const productChangeHandler = (name: string | null) => {
    setSelectedProduct(
      products.find((product) => product.name === name) || null
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiver((state) => ({
      ...state,
      [name]: value
    }));
  };

  useEffect(() => {
    setEmail(receiver.email);
  }, [receiver.email, setEmail]);

  useEffect(() => {
    setReceiver((state) => ({
      ...state,
      VAT: receiver.EIK ? `${VAT_PREFIX}${receiver.EIK}` : ''
    }));
  }, [receiver.EIK]);

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
    <div className="flex flex-col align-middle">
      <Toast />
      <form className="p-4 max-w-5xl w-full" onSubmit={onSubmit} id="invoice">
        <div ref={invoiceRef} className="send-box">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="top">
                <td colSpan={8}>
                  <table>
                    <tbody>
                      <tr>
                        <td className="title">
                          <Image
                            src={SATECMA_LOGO}
                            alt="Satecma logo"
                            width={300}
                            height={65}
                          />
                          <br />
                          <span>Фактура </span>
                          <SelectField
                            isFieldsDisabled={isFieldsDisabled}
                            value={invoiceType}
                            values={[
                              InvoiceType.original,
                              InvoiceType.proforma
                            ]}
                            displayValues={['Оригинал', 'Проформа']}
                            className="mb-2"
                            onChange={(e) =>
                              setInvoiceType(e.target.value as InvoiceType)
                            }
                          />
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
                              className="mb-2"
                              onChange={(e) =>
                                setLatestInvoiceNumbers((state) => ({
                                  ...state,
                                  manual: e.target.value
                                }))
                              }
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
                        </td>

                        <td>
                          Доставчик: <br />
                          Фирма: {provider.name}
                          <br />
                          ЕИК: {provider.eik}
                          <br />
                          ДДС №: BG{provider.eik}
                          <br />
                          Град: {provider.city}
                          <br />
                          Адрес: {provider.address}
                          <br />
                          МОЛ: {provider.director}
                          <br />
                          Телефон: {provider.phone}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <InvoicePriceData
                total={total}
                wordPrice={wordPrice}
                setWordPrice={setWordPrice}
                isFieldsDisabled={isFieldsDisabled}
              />

              <tr className="bg-gray-700 text-white">
                <td>№</td>
                <td>Продукт / Услуга</td>
                <td>Количество</td>
                <td>Опаковка</td>
                <td>Ед. цена</td>
                <td>Отстъпка</td>
                <td>ДДС</td>
                <td>Стойност (без ДДС)</td>
              </tr>

              <TableItems
                items={items}
                className="border-gray-800 border-b text-right"
                isFieldsDisabled={isFieldsDisabled}
                itemChangeHandler={itemChangeHandler}
                itemSelectHandler={itemSelectHandler}
                removeItem={removeItem}
              />

              <TableServices
                services={services}
                className="border-gray-800 border-b text-right"
                isFieldsDisabled={isFieldsDisabled}
                serviceChangeHandler={serviceChangeHandler}
                serviceSelectHandler={serviceSelectHandler}
                removeItem={removeItem}
              />

              <InputWrapper
                size="small"
                data={products}
                isFieldsDisabled={isFieldsDisabled}
                selectedItem={selectedProduct}
                onSubmit={addItem}
                setSelectedItem={productChangeHandler}
              />

              <ClientInvoiceData
                clients={clients}
                receiver={receiver}
                setReceiver={setReceiver}
                isFieldsDisabled={isFieldsDisabled}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                provider={provider}
                reason={reason}
                setReason={setReason}
                onChange={onChange}
              />
            </tbody>
          </table>
        </div>
      </form>
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
    </div>
  );
};

export default InvoiceBox;
