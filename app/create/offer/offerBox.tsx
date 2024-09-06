"use client";

import { InputWrapper } from "@/components/input/wrapper";
import { TextField } from "@/components/textField/TextField";
import { Button, Typography } from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import { SATECMA_LOGO } from "../invoice/constants";
import { Product, Provider } from "../invoice/types";
import { TableItems } from "../table/tableItems";
import { TableServices } from "../table/tableServices";
import { useTableItems } from "../table/useTableItems";
import useToast from "@/store/utils/useToast";
import { fetchData } from "@/utils/fetchData";
import Image from "next/image";

interface OfferBoxProps {
  provider: Provider;
  products: Product[];
}

export const OfferBox = ({ products, provider }: OfferBoxProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [application, setApplication] = useState({
    warranty: 0,
    delivery: 0,
  });
  const [showApplication, setShowApplication] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const offerRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [heading, setHeading] = useState("Заглавие на офертата");
  const { Toast, setMessage } = useToast();
  const [recipient, setRecipient] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const {
    items,
    services,
    total,
    addItem,
    itemChangeHandler,
    itemSelectHandler,
    removeItem,
    serviceChangeHandler,
    serviceSelectHandler,
  } = useTableItems({ selectedProduct, setSelectedProduct });

  const productChangeHandler = (name: string | null) => {
    setSelectedProduct(
      products.find((product) => product.name === name) || null,
    );
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const css = await fetch("/globals.css").then((res) => res.text());
    try {
      await fetchData("/api/create/offer", {
        method: "POST",
        body: JSON.stringify({
          email: recipient.email,
          name: recipient.name,
          html: offerRef.current?.outerHTML,
          css,
          providerName: provider?.name,
          heading,
        }),
      });
      setMessage({
        severity: "success",
        text: "Офертата беше успешно изпратена.",
      });
    } catch (error) {
      setMessage({
        severity: "error",
        text: "Грешка при изпращането на офертата.",
      });
    }
  };

  return (
    <form className="p-4" onSubmit={onSubmit} id="offer">
      <Toast />
      <div ref={offerRef} className="send-box">
        <table>
          <tbody>
            <tr className="top">
              <td colSpan={8}>
                <table>
                  <tbody>
                    <tr>
                      <td className="title">
                        <Image
                          style={{ height: "auto", width: "auto" }}
                          src={SATECMA_LOGO}
                          alt="Satecma logo"
                          width={420}
                          height={95}
                        />
                        <br />
                        Получател:{" "}
                        <TextField
                          type="text"
                          name="name"
                          value={recipient.name}
                          isFieldsDisabled={isFieldsDisabled}
                          onChange={(e) =>
                            setRecipient({
                              ...recipient,
                              name: e.target.value,
                            })
                          }
                        />
                        <br />
                        Телефон:{" "}
                        <TextField
                          type="text"
                          name="phone"
                          value={recipient.phone}
                          isFieldsDisabled={isFieldsDisabled}
                          onChange={(e) =>
                            setRecipient({
                              ...recipient,
                              phone: e.target.value,
                            })
                          }
                        />
                        <br />
                        Е-Поща:{" "}
                        <TextField
                          type="text"
                          name="email"
                          value={recipient.email}
                          isFieldsDisabled={isFieldsDisabled}
                          onChange={(e) => {
                            setRecipient({
                              ...recipient,
                              email: e.target.value,
                            });
                          }}
                        />
                      </td>
                      <td>
                        Доставчик: <br />
                        Фирма: {provider.name}
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
                  className="text-md font-bold max-w-2xl w-full uppercase text-center"
                  textClass="text-md font-bold uppercase"
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </td>
            </tr>
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
              isFieldsDisabled={isFieldsDisabled}
              className="border-gray-800 border-b text-right"
              itemChangeHandler={itemChangeHandler}
              itemSelectHandler={itemSelectHandler}
              removeItem={removeItem}
            />
            <TableServices
              services={services}
              isFieldsDisabled={isFieldsDisabled}
              className="border-gray-800 border-b text-right"
              serviceChangeHandler={serviceChangeHandler}
              serviceSelectHandler={serviceSelectHandler}
              removeItem={removeItem}
            />

            <InputWrapper
              size="small"
              variant="standard"
              isFieldsDisabled={isFieldsDisabled}
              data={products}
              selectedItem={selectedProduct}
              onSubmit={addItem}
              setSelectedItem={productChangeHandler}
            />

            <tr className="border-gray-800 border-b text-right bg-gray-700 text-white">
              <td colSpan={2}></td>
              <td colSpan={2}>Данъчна основа</td>
              <td>Отстъпка</td>
              <td>Общо НЕТО</td>
              <td>ДДС</td>
              <td>Сума за плащане</td>
            </tr>

            <tr>
              <td className="border-gray-800 border-b text-right" colSpan={2}>
                ОБЩО
              </td>
              <td className="border-gray-800 border-b text-right" colSpan={2}>
                {total.amountWithoutDiscount.toFixed(2)} лв.
              </td>
              <td className="border-gray-800 border-b text-right">
                {total.discount.toFixed(2)} лв.
              </td>
              <td className="border-gray-800 border-b text-right">
                {total.netAmount.toFixed(2)} лв.
              </td>
              <td className="border-gray-800 border-b text-right">
                {total.VAT.toFixed(2)} лв.
              </td>
              <td className="border-gray-800 border-b text-right">
                {total.paid.toFixed(2)} лв.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-8">
          {!isFieldsDisabled && (
            <>
              <span className="mr-4">Покажи гаранции и условия</span>
              <label className="switch">
                <input
                  type="checkbox"
                  onClick={(e) => setShowApplication(e.currentTarget.checked)}
                />
                <span className="slider round"></span>
              </label>
            </>
          )}
          {showApplication && (
            <>
              <p>Валидност на офертата: 30 дни</p>
              <p>
                Начин на плащане: По Договор 50% - АВАНСОВО,
                <br /> 30% междинно плащане и 20% при издаване на обекта;
              </p>
              <p>
                Срок на изпълнение: до{" "}
                <TextField
                  type="text"
                  name="delivery"
                  value={application.delivery}
                  smallField
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={(e) =>
                    setApplication({
                      ...application,
                      delivery: +e.target.value,
                    })
                  }
                />{" "}
                работни дни;
              </p>
              <p>
                Гаранция по изпълнение:{" "}
                <TextField
                  type="text"
                  name="warranty"
                  value={application.warranty}
                  smallField
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={(e) =>
                    setApplication({
                      ...application,
                      warranty: +e.target.value,
                    })
                  }
                />{" "}
                години
              </p>
              <Typography variant="body1" className="pt-4">
                След завършване на обекта с протокол акт 19, <br />
                се измерват всички количества. <br />
                За всички допълнителни СМР-та, се издават анекси.
              </Typography>
            </>
          )}
          <Typography variant="body1" className="pt-4">
            За информация относно продуктите и услугите, <br />
            моля свържете се с нас на телефон: {provider.phone}
          </Typography>
        </div>
        <div className="flex flex-col text-end mt-6 mb-2">
          <span className="red-span">гр. {provider.city.split(",")[0]}</span>
          <span>
            Дата:{" "}
            {new Date().toLocaleDateString("bg-BG", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              timeZone: "Europe/Sofia",
            })}
          </span>
        </div>
      </div>
      <div className="invoice__button">
        <Button
          variant="contained"
          disabled={error || isFieldsDisabled}
          type="submit"
        >
          Създай
        </Button>
      </div>
    </form>
  );
};
