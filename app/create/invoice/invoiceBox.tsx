'use client';

import { Client } from '@/clients/utils/types';
import { InputWrapper } from '@/components/input/wrapper';
import { TableItems } from '../table/tableItems';
import { useTableItems } from '../table/useTableItems';
import { createInvoice, getClientData, updateProducts } from './actions';
import ClientInvoiceData from './clientInvoiceData';
import {
  INIT_RECEIVER,
  INVOICE_DATA_DEFAULT_VALUES,
  VAT_PREFIX
} from './constants';
import { InvoicePriceData } from './invoicePriceData';
import { Company, InvoiceData, InvoiceType } from './types';
import { Product } from '@/products/utils/types';
import useToast from '@/products/utils/useToast';
import { FormEvent, useEffect, useRef, useState } from 'react';
import InvoiceDetails from './invoiceDetails';
import ProviderDetails from './providerDetails';
import { InvoiceRequestBody } from '../../../pages/api/create/types';
import TableHeader from './tableHeader';
import { ProviderContextProvider } from '@/context/ProviderContext';

interface InvoiceBoxProps {
  provider: Company | null;
  clients: Client[];
  products: Product[];
  invoiceIds: string[];
}

const InvoiceBox = ({
  clients,
  invoiceIds,
  products,
  provider
}: InvoiceBoxProps) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wordPrice, setWordPrice] = useState('');
  const [reason, setReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('По Банка');
  const [email, setEmail] = useState('');
  const [sendMailToRecepient, setSendMailToRecepient] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<Client>(INIT_RECEIVER);
  const [invoiceNumber, setInvoiceNumber] = useState<string>(
    invoiceIds[0] || ''
  );
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(
    InvoiceType.proforma
  );
  const invoiceRef = useRef<HTMLTableElement>(null);
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
        providerName: company?.name || '',
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

  useEffect(() => {
    setCompany(provider);
  }, [provider]);

  return (
    <div className="flex flex-col align-middle">
      <ToastContainer />
      <form
        autoComplete="off"
        className="p-4 max-w-5xl w-full"
        onSubmit={onSubmit}
        id="invoice"
      >
        <div ref={invoiceRef} className="send-box">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="top">
                <InvoiceDetails
                  invoiceType={invoiceType}
                  setInvoiceType={setInvoiceType}
                  invoiceNumber={invoiceNumber}
                  setInvoiceNumber={setInvoiceNumber}
                  invoiceData={invoiceData}
                  setInvoiceData={setInvoiceData}
                  isFieldsDisabled={isFieldsDisabled}
                />
                <ProviderDetails company={company} setCompany={setCompany} />
              </tr>

              <TableHeader />

              <TableItems
                items={items}
                className="border-gray-800 border-b text-right"
                isFieldsDisabled={isFieldsDisabled}
                itemChangeHandler={itemChangeHandler}
                itemSelectHandler={itemSelectHandler}
                removeItem={removeItem}
              />

              <tr>
                <InputWrapper
                  data={products}
                  isFieldsDisabled={isFieldsDisabled}
                  selectedItem={selectedProduct}
                  onSubmit={addItem}
                  setSelectedItem={productChangeHandler}
                  displayProperty="name"
                />
              </tr>

              <tr className="invoiceBox__companyData">
                <InvoicePriceData
                  total={total}
                  wordPrice={wordPrice}
                  setWordPrice={setWordPrice}
                  isFieldsDisabled={isFieldsDisabled}
                />
                <ClientInvoiceData
                  setReceiver={setReceiver}
                  isFieldsDisabled={isFieldsDisabled}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  provider={provider}
                  reason={reason}
                  setReason={setReason}
                />
              </tr>
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
