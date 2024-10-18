import { InputWrapper } from "@/components/input/wrapper";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SelectField } from "../../components/selectField/SelectField";
import { TextField } from "../../components/textField/TextField";
import { TableItems } from "../table/tableItems";
import { TableServices } from "../table/tableServices";
import { useTableItems } from "../table/useTableItems";
import { INIT_RECEIVER, SATECMA_LOGO } from "./constants";
import {
  InvoiceData,
  InvoiceIdType,
  InvoiceReceiver,
  InvoiceType,
  Item,
  LatestInvoices,
  Product,
  Provider,
} from "./types";

interface InvoiceBoxProps {
  provider: Provider;
  products: Product[];
  invoiceNumber: string;
  isFieldsDisabled: boolean;
  invoiceData: InvoiceData;
  invoiceIdType: InvoiceIdType;
  invoiceType: InvoiceType;
  receiver: InvoiceReceiver;
  setReceiver: Dispatch<SetStateAction<InvoiceReceiver>>;
  setEmail: (email: string) => void;
  setError: (error: boolean) => void;
  submitItems: (items: Item[]) => void;
  setInvoiceData: Dispatch<SetStateAction<InvoiceData>>;
  setInvoiceIdType: Dispatch<SetStateAction<InvoiceIdType>>;
  setLatestInvoiceNumbers: Dispatch<SetStateAction<LatestInvoices>>;
  setInvoiceType: Dispatch<SetStateAction<InvoiceType>>;
}

export const InvoiceBox = forwardRef<HTMLDivElement, InvoiceBoxProps>(
  (
    {
      provider,
      products,
      invoiceNumber,
      isFieldsDisabled,
      invoiceData,
      invoiceIdType,
      invoiceType,
      receiver,
      setReceiver,
      setEmail,
      setError,
      submitItems,
      setInvoiceType,
      setInvoiceData,
      setInvoiceIdType,
      setLatestInvoiceNumbers,
    },
    ref,
  ) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
      null,
    );
    const [wordPrice, setWordPrice] = useState("");
    const [reason, setReason] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("По Банка");

    const invoiceTypeValues =
      invoiceType === InvoiceType.invoice
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
      setReceiver((state) => ({
        ...state,
        [e.target.name]: e.target.value,
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
        VAT: receiver.EIK ? `BG${receiver.EIK}` : "",
      }));
    }, [receiver.EIK]);

    useEffect(() => {
      setError(!wordPrice.length || invoiceNumber.length !== 10);
    }, [wordPrice, invoiceNumber, setError]);

    useEffect(() => {
      submitItems(items);
    }, [items, submitItems]);

    useEffect(() => {
      setInvoiceData((state) => ({
        ...state,
        client: receiver.company,
        eik: Number(receiver.EIK),
        vat_number: receiver.VAT,
        amount: total.netAmount,
        vat: total.VAT,
        total: total.paid,
        invoice_id: invoiceNumber,
        type: invoiceType,
      }));
    }, [receiver, total, invoiceNumber]);

    return (
      <div ref={ref} className="send-box">
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr className="top">
              <td colSpan={8}>
                <table>
                  <tbody>
                    <tr>
                      <td className="title">
                        <img
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
                          values={[InvoiceType.invoice, InvoiceType.proforma]}
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
                              setInvoiceIdType(e.target.value as InvoiceIdType)
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
                <TextField
                  name="company"
                  type="text"
                  placeholder="Име на фирма"
                  value={receiver.company}
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={onChange}
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
                    Банкови реквизити: {provider.bankDetails.name}
                    <br />
                    BIC: {provider.bankDetails.swift}
                    <br />
                    IBAN: {provider.bankDetails.iban}
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
    );
  },
);

InvoiceBox.displayName = "InvoiceBox";
