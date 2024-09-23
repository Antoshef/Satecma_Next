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
import ReceiverDetails from './receiverDetails';

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
  const [error, setError] = useState({
    invoiceNumber: false,
    wordPrice: false
  });
  const [receiver, setReceiver] = useState<Client>(INIT_RECEIVER);
  const [invoiceNumber, setInvoiceNumber] = useState<string>(
    invoiceIds[0] || ''
  );
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(InvoiceType.none);
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
      vat: receiver.eik ? `${VAT_PREFIX}${receiver.eik}` : ''
    }));
  }, [receiver.eik]);

  useEffect(() => {
    setError((state) => ({ ...state, invoiceNumber: false }));
  }, [invoiceNumber]);

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

      <form autoComplete="off" className="p-4" onSubmit={onSubmit} id="invoice">
        <div
          ref={invoiceRef}
          className="mx-auto p-4 border border-gray-200 shadow-md text-base font-sans"
        >
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <InvoiceDetails
                  invoiceType={invoiceType}
                  setInvoiceType={setInvoiceType}
                  invoiceNumber={invoiceNumber}
                  setInvoiceNumber={setInvoiceNumber}
                  invoiceData={invoiceData}
                  setInvoiceData={setInvoiceData}
                  isFieldsDisabled={isFieldsDisabled}
                  error={error}
                />
              </tr>

              <tr>
                <ProviderDetails company={company} setCompany={setCompany} />
                <ReceiverDetails
                  receiver={receiver}
                  onChange={onChange}
                  clients={clients}
                  setReceiver={setReceiver}
                  isFieldsDisabled={isFieldsDisabled}
                />
              </tr>

              <tr className="bg-gray-700 text-white">
                <TableHeader />
              </tr>

              <tr className="border-gray-800 border-b text-right">
                <TableItems
                  items={items}
                  isFieldsDisabled={isFieldsDisabled}
                  itemChangeHandler={itemChangeHandler}
                  itemSelectHandler={itemSelectHandler}
                  removeItem={removeItem}
                />
              </tr>

              <tr>
                <InputWrapper
                  data={products}
                  displayProperty="name"
                  isFieldsDisabled={isFieldsDisabled}
                  selectedItem={selectedProduct}
                  onSubmit={addItem}
                  setSelectedItem={productChangeHandler}
                />
              </tr>

              <tr className="invoiceBox__companyData">
                <ClientInvoiceData
                  setReceiver={setReceiver}
                  isFieldsDisabled={isFieldsDisabled}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  provider={provider}
                  reason={reason}
                  setReason={setReason}
                />

                <InvoicePriceData
                  error={error}
                  total={total}
                  wordPrice={wordPrice}
                  setWordPrice={setWordPrice}
                  isFieldsDisabled={isFieldsDisabled}
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
      <div className="mt-8 w-full flex flex-col items-center justify-center">
        <button
          className="py-2 px-12 bg-gray-800 bg-opacity-90 text-white border-none rounded cursor-pointer text-base font-bold hover:bg-opacity-80"
          disabled={error.invoiceNumber || error.wordPrice || isFieldsDisabled}
          type="submit"
        >
          Създай
        </button>
      </div>
    </div>
  );
};

export default InvoiceBox;
