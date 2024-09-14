"use client";

import useToast from "@/store/utils/useToast";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  INIT_RECEIVER,
  INVOICE_DATA_DEFAULT_VALUES,
  SATECMA_LOGO,
  VAT_PREFIX,
} from "./constants";
import {
  IInvoiceIds,
  InvoiceData,
  InvoiceIdType,
  InvoiceReceiver,
  InvoiceType,
  LatestInvoices,
  Product,
  Company,
} from "./types";
import { Client } from "@/clients/utils/types";
import { Checkbox, Typography, Button, Grid } from "@mui/material";
import { useTableItems } from "../table/useTableItems";
import { InputWrapper } from "@/components/input/wrapper";
import { SelectField } from "@/components/selectField/SelectField";
import { TableItems } from "../table/tableItems";
import { TableServices } from "../table/tableServices";
import CompanySuggestions from "./CompanySuggestions";
import { TextField } from "@/components/textField/TextField";
import Image from "next/image";
import { createInvoice, getClientData, updateProducts } from "./actions";
import { InvoiceRequestBody } from "../../../pages/api/create/types";

interface InvoiceBoxProps {
  provider: Company;
  clients: Client[];
  products: Product[];
  invoiceIds: IInvoiceIds;
}

const InvoiceBox = ({
  clients,
  invoiceIds,
  products,
  provider,
}: InvoiceBoxProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wordPrice, setWordPrice] = useState("");
  const [reason, setReason] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("По Банка");
  const [email, setEmail] = useState("");
  const [sendMailToRecepient, setSendMailToRecepient] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<InvoiceReceiver>(INIT_RECEIVER);
  const [latestInvoiceNumbers, setLatestInvoiceNumbers] =
    useState<LatestInvoices>({
      ...invoiceIds,
      manual: "",
    });
  const [invoiceIdType, setInvoiceIdType] = useState<InvoiceIdType>(
    InvoiceIdType.current,
  );
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(
    InvoiceType.proforma,
  );
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(
    INVOICE_DATA_DEFAULT_VALUES,
  );
  const { Toast, notify } = useToast();

  const invoiceNumber = useMemo(() => {
    if (invoiceIdType === InvoiceIdType.manual) {
      return latestInvoiceNumbers.manual || "";
    }
    if (invoiceType === InvoiceType.proforma) {
      return latestInvoiceNumbers.proforma;
    }
    if (invoiceIdType === InvoiceIdType.current) {
      return latestInvoiceNumbers.current;
    }
    return latestInvoiceNumbers.previous;
  }, [invoiceIdType, latestInvoiceNumbers, invoiceType]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const css = await fetch("/globals.css").then((res) => res.text());

    try {
      if (!invoiceRef.current?.outerHTML) {
        notify("Възникна грешка при създаването на фактурата.", "error");
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
        client: invoiceData.client,
      };
      await createInvoice({ invoiceRequest, invoiceData });

      notify("Фактурата е създадена успешно!", "success");
    } catch (error) {
      notify("Възникна грешка при създаването на фактурата.", "error");
      setIsFieldsDisabled(false);
    }
  };

  const invoiceTypeValues =
    invoiceType === InvoiceType.original
      ? [InvoiceIdType.current, InvoiceIdType.previous, InvoiceIdType.manual]
      : [InvoiceIdType.current, InvoiceIdType.manual];

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiver((state) => ({
      ...state,
      [name]: value,
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
      VAT: receiver.EIK ? `${VAT_PREFIX}${receiver.EIK}` : "",
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
      receiver,
    }));
  }, [receiver, total, invoiceNumber, items]);

  return (
    <div>
      <form className="p-4" onSubmit={onSubmit} id="invoice">
        <Toast />
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
                            style={{ height: "auto", width: "auto" }}
                            src={SATECMA_LOGO}
                            alt="Satecma logo"
                            width={420}
                            height={95}
                          />
                          <br />
                          <SelectField
                            isFieldsDisabled={isFieldsDisabled}
                            value={invoiceType}
                            values={[
                              InvoiceType.original,
                              InvoiceType.proforma,
                            ]}
                            displayValues={[
                              "Фактура Оригинал",
                              "Проформа Фактура",
                            ]}
                            className="text-3xl mb"
                            onChange={(e) =>
                              setInvoiceType(e.target.value as InvoiceType)
                            }
                          />
                          <br />
                          {!isFieldsDisabled && (
                            <SelectField
                              isFieldsDisabled={isFieldsDisabled}
                              value={invoiceIdType}
                              values={invoiceTypeValues}
                              onChange={(e) =>
                                setInvoiceIdType(
                                  e.target.value as InvoiceIdType,
                                )
                              }
                            />
                          )}
                          <br />
                          <span>
                            Фактура №:{" "}
                            {invoiceIdType === InvoiceIdType.manual ? (
                              <TextField
                                name="invoiceNumber"
                                type="text"
                                placeholder="0000000001"
                                value={invoiceNumber}
                                isFieldsDisabled={isFieldsDisabled}
                                maxLength={10}
                                onChange={(e) =>
                                  setLatestInvoiceNumbers((state) => ({
                                    ...state,
                                    manual: e.target.value,
                                  }))
                                }
                              />
                            ) : (
                              invoiceNumber
                            )}
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
                            Създадена:{" "}
                            <TextField
                              isFieldsDisabled={isFieldsDisabled}
                              value={invoiceData.date}
                              type="date"
                              name="date"
                              onChange={(e) =>
                                setInvoiceData((state) => ({
                                  ...state,
                                  date: e.target.value,
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

              <tr className="information">
                <td colSpan={8}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          Данъчна основа без отстъпка:{" "}
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
                          Словом:{" "}
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
                variant="standard"
                data={products}
                isFieldsDisabled={isFieldsDisabled}
                selectedItem={selectedProduct}
                onSubmit={addItem}
                setSelectedItem={productChangeHandler}
              />

              <tr className="invoiceBox__companyData">
                <td colSpan={4}>
                  Получател:
                  <br />
                  Име на фирма:{" "}
                  <CompanySuggestions
                    clients={clients}
                    receiver={receiver}
                    setReceiver={setReceiver}
                    isFieldsDisabled={isFieldsDisabled}
                  />
                  <br />
                  Град:{" "}
                  <TextField
                    name="city"
                    type="text"
                    placeholder="Град"
                    value={receiver.city}
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={onChange}
                  />
                  <br />
                  Адрес:{" "}
                  <TextField
                    name="address"
                    type="text"
                    placeholder="Адрес"
                    value={receiver.address}
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={onChange}
                  />
                  <br />
                  ЕИК:{" "}
                  <TextField
                    name="EIK"
                    type="text"
                    placeholder="ЕИК"
                    value={receiver.EIK}
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={onChange}
                  />
                  <br />
                  ДДС №:{" "}
                  <TextField
                    name="VAT"
                    type="text"
                    placeholder="ДДС №"
                    value={receiver.VAT}
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={onChange}
                  />
                  <br />
                  МОЛ:{" "}
                  <TextField
                    name="director"
                    type="text"
                    placeholder="МОЛ"
                    value={receiver.director}
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={onChange}
                  />
                  <br />
                  Е-Поща:{" "}
                  <TextField
                    name="email"
                    type="text"
                    placeholder="Е-Поща"
                    value={receiver.email}
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={onChange}
                  />
                </td>
                <td colSpan={4}>
                  Начин на плащане:
                  <SelectField
                    isFieldsDisabled={isFieldsDisabled}
                    value={paymentMethod}
                    values={["По Банка", "В Брой"]}
                    onChange={paymentMethodHandler}
                  />
                  <br />
                  {paymentMethod === "По Банка" && (
                    <>
                      Банкови реквизити: {provider.bankName}
                      <br />
                      BIC: {provider.swift}
                      <br />
                      IBAN: {provider.iban}
                      <br />
                    </>
                  )}
                  Основание на сделка по ЗДДС:
                  <br />
                  <TextField
                    name="reason"
                    type="text"
                    placeholder="Основание на сделка по ЗДДС"
                    value={reason}
                    isFieldsDisabled={isFieldsDisabled}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Grid container margin={2} justifyContent="center" alignItems="center">
          <Grid
            item
            className="cursor-pointer"
            onClick={() => setSendMailToRecepient(!sendMailToRecepient)}
          >
            <Checkbox
              checked={sendMailToRecepient}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography component="span" variant="body2">
              Изпрати до получател
            </Typography>
          </Grid>
        </Grid>
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
    </div>
  );
};

export default InvoiceBox;
