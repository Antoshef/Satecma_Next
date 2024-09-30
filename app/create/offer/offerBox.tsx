'use client';

import { InputWrapper } from '@/components/input/wrapper';
import { TextField } from '@/components/textField/TextField';
import { baseUrl } from '@/constants';
import useToast from '@/products/utils/useToast';
import Image from 'next/image';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { TableItems } from '../table/tableItems';
import { Product } from '@/products/utils/types';
import { useTableItems } from '../table/useTableItems';
import { Company } from '../invoice/types';
import ProviderDetails from '../invoice/providerDetails';
import TableHeader from '../invoice/tableHeader';
import { DocumentPriceData } from '../invoice/documentPriceData';
import ApplicationDetails from './applicationDetails';
import RecipientDetails from './recepientDetails';
import { useLogo } from '@/context/logoContext';

interface OfferBoxProps {
  provider: Company | null;
  products: Product[];
}

export const OfferBox = ({ products, provider }: OfferBoxProps) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [application, setApplication] = useState({
    warranty: 0,
    delivery: 0
  });
  const [showApplication, setShowApplication] = useState(false);
  const [sendMailToRecepient, setSendMailToRecepient] = useState<boolean>(true);
  const offerRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [heading, setHeading] = useState('Заглавие на офертата');
  const { ToastContainer, notify } = useToast();
  const [recipient, setRecipient] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const { items, total, addItem, itemChangeHandler, removeItem } =
    useTableItems({ selectedProduct, setSelectedProduct });
  const { logoUrl } = useLogo();

  const productChangeHandler = (item: { name: string }) => {
    setSelectedProduct(
      products.find((product) => product.name === item.name) || null
    );
  };

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsFieldsDisabled(true);
      const css = await fetch('/globals.css').then((res) => res.text());
      try {
        await fetch(`${baseUrl}/api/create/offer`, {
          method: 'POST',
          body: JSON.stringify({
            email: recipient.email,
            name: recipient.name,
            sendMailToRecepient,
            html: offerRef.current?.outerHTML,
            css,
            providerName: provider?.name,
            heading
          })
        });
        notify('Офертата беше успешно изпратена.', 'success');
      } catch (error) {
        notify('Грешка при изпращането на офертата.', 'error');
      }
    },
    [
      recipient.email,
      recipient.name,
      sendMailToRecepient,
      provider?.name,
      heading,
      notify
    ]
  );

  useEffect(() => {
    if (provider) {
      setCompany(provider);
    }
  }, [provider]);

  return (
    <div className="flex flex-col align-middle">
      <ToastContainer />

      <form autoComplete="off" className="p-4" onSubmit={onSubmit} id="offer">
        <div
          ref={offerRef}
          className="mx-auto p-4 border border-gray-200 shadow-md text-base font-sans"
        >
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td colSpan={4}>
                  <Image
                    src={logoUrl}
                    alt="Satecma logo"
                    className="mb-4"
                    width={220}
                    height={47}
                  />
                </td>
              </tr>

              <tr>
                <ProviderDetails company={company} setCompany={setCompany} />
                <RecipientDetails
                  recipient={recipient}
                  setRecipient={setRecipient}
                  isFieldsDisabled={isFieldsDisabled}
                />
              </tr>

              <tr>
                <td colSpan={8}>
                  <h1 className="text-center text-2xl text-stone-800 font-bold p-4">
                    ОФЕРТА
                  </h1>
                </td>
              </tr>

              <tr>
                <td className="text-center" colSpan={8}>
                  <TextField
                    type="text"
                    name="offerNumber"
                    value={heading}
                    className="text-md max-w-2xl w-full uppercase text-center"
                    textClass="text-md uppercase"
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={(e) => setHeading(e.target.value)}
                  />
                </td>
              </tr>

              <tr className="bg-gray-700 text-white">
                <TableHeader />
              </tr>

              <TableItems
                items={items}
                isFieldsDisabled={isFieldsDisabled}
                itemChangeHandler={itemChangeHandler}
                removeItem={removeItem}
              />

              <tr>
                <InputWrapper
                  isFieldsDisabled={isFieldsDisabled}
                  data={products}
                  selectedItem={selectedProduct}
                  onSubmit={addItem}
                  setSelectedItem={productChangeHandler}
                  displayProperty="name"
                />
              </tr>

              <tr>
                <td colSpan={4}>
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => setShowApplication(!showApplication)}
                  >
                    <input
                      type="checkbox"
                      checked={showApplication}
                      onChange={() => setShowApplication(!showApplication)}
                      className="form-checkbox h-5 w-5 text-gray-800"
                      aria-label="controlled"
                    />
                    <span className="ml-2 text-sm">
                      Покажи гаранции и условия
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <ApplicationDetails
                  showApplication={showApplication}
                  application={application}
                  setApplication={setApplication}
                  isFieldsDisabled={isFieldsDisabled}
                  providerPhone={provider?.phone}
                />

                <DocumentPriceData
                  total={total}
                  isFieldsDisabled={isFieldsDisabled}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div className="flex justify-center items-center my-4">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => setSendMailToRecepient(!sendMailToRecepient)}
        >
          <input
            type="checkbox"
            checked={sendMailToRecepient}
            onChange={() => setSendMailToRecepient(!sendMailToRecepient)}
            className="form-checkbox h-5 w-5 text-gray-800"
            aria-label="controlled"
          />
          <span className="ml-2 text-sm">Изпрати до получател</span>
        </div>
      </div>
      <div className="mt-8 w-full flex flex-col items-center justify-center">
        <button
          className="py-2 px-12 bg-gray-800 bg-opacity-90 text-white border-none rounded cursor-pointer text-base font-bold hover:bg-opacity-80"
          type="submit"
        >
          Създай
        </button>
      </div>
    </div>
  );
};
