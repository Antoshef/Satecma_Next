import { forwardRef, useEffect, useState } from "react";
import { Item, ProductData, Providers } from "./types";
import { getBankDetailsFromIban } from "./utils";
import "./invoiceBox.css";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { Button } from "./Button";
import { ECOHOME_COMPANY, SATECMA_COMPANY } from "./constants";
import { StoreUnits } from "../store/types";
import { unitsMapCyrilic } from "../store/utils";
import { Input } from "../input/Input";
import Image from "next/image";

const logo =
  "https://satecma.bg/wp-content/uploads/2024/02/logo-satecma-industrias.png";

interface InvoiceBoxProps {
  products: ProductData[];
  invoiceNumber: number;
  isFieldsDisabled: boolean;
  setEmail: (email: string) => void;
  setError: (error: boolean) => void;
}

export const InvoiceBox = forwardRef<HTMLTableElement, InvoiceBoxProps>(
  ({ products, invoiceNumber, isFieldsDisabled, setEmail, setError }, ref) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
      null
    );
    const [wordPrice, setWordPrice] = useState("");
    const [reason, setReason] = useState("");
    const [bank, setBank] = useState({
      iban: "BG79FINV91501017339942",
      swift: "FINVBGSF",
      name: "Първа Инвестиционна Банка",
      error: false,
    });
    const [paymentMethod, setPaymentMethod] = useState("По Банка");
    const [providerName, setProviderName] = useState<Providers>(
      Providers.Ecohome
    );
    const [provider, setProvider] = useState(ECOHOME_COMPANY);
    const [receiver, setReceiver] = useState({
      email: "anton.stanev@satecma.bg",
      company: "ДЛВ ЕООД",
      city: "София",
      address: "бул. България 69",
      EIK: "123456789",
      VAT: "BG123456789",
    });
    const [total, setTotal] = useState({
      amountWithoutDiscount: 0,
      discount: 0,
      netAmount: 0,
      VAT: 0,
      paid: 0,
    });
    const [items, setItems] = useState<Item[]>([]);
    const [services, setServices] = useState<Item[]>([]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setReceiver((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    };

    const itemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, dataset } = e.target;
      const newItems = [...items];
      const currentItem = newItems.find(
        (item) => item.code === Number(dataset.code)
      );
      if (currentItem) {
        (currentItem as any)[name] = value;
        currentItem.totalPrice = (
          currentItem.quantity *
          (currentItem.price || currentItem.unit_price || 0)
        ).toFixed(2);
        setItems(newItems);
      }
    };

    const itemSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, dataset } = e.target;
      const newItems = [...items];
      const currentItem = newItems.find(
        (item) => item.code === Number(dataset.code)
      );
      if (currentItem) {
        currentItem.VAT = value;
        setItems(newItems);
      }
    };

    const serviceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, dataset } = e.target;
      const newServices = [...services];
      const currentService = newServices.find(
        (item) => item.code === Number(dataset.code)
      );
      if (currentService) {
        (currentService as any)[name] = value;
        currentService.totalPrice = (
          Number(currentService.quantity) * Number(currentService.price)
        ).toFixed(2);
        setServices(newServices);
      }
    };

    const serviceSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, dataset } = e.target;
      const newServices = [...services];
      const currentService = newServices.find(
        (item) => item.code === Number(dataset.code)
      );
      if (currentService) {
        currentService.VAT = value;
        setServices(newServices);
      }
    };

    const addItem = () => {
      if (selectedProduct) {
        const { unit, code, name, price, unit_price, percentage_increase } =
          selectedProduct;
        const unitSalePrice = unit_price
          ? unit_price * percentage_increase
          : null;
        const salePrice = price ? price * percentage_increase : null;
        const VAT = "20";
        const totalPrice = unitSalePrice
          ? unitSalePrice.toFixed(2)
          : salePrice?.toFixed(2) || "0.00";
        const newItem: Item = {
          code,
          name,
          quantity: 1,
          unit,
          unit_price: unitSalePrice,
          price: salePrice,
          discount: "0",
          VAT,
          totalPrice,
        };
        setItems((state) => [...state, newItem]);
        setSelectedProduct(null);
      } else {
        addService();
      }
    };

    const removeItem = (code: string | number | null) => {
      setItems((state) => state.filter((item) => item.code !== code));
      setServices((state) => state.filter((item) => item.code !== code));
    };

    const addService = () => {
      setServices((state) => [
        ...state,
        {
          code: state.length + 1,
          name: "",
          unit: StoreUnits.pcs,
          quantity: 1,
          price: 0,
          unit_price: 0,
          discount: "0",
          totalPrice: "0",
          VAT: "0",
        },
      ]);
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
      setError(!wordPrice.length);
    }, [wordPrice, setError]);

    useEffect(() => {
      setTotal(() => {
        let amountWithoutDiscount = items.reduce(
          (acc, item) => acc + Number(item.totalPrice),
          0
        );
        amountWithoutDiscount += services.reduce(
          (acc, item) => acc + Number(item.totalPrice),
          0
        );
        let discount = items.reduce(
          (acc, item) =>
            acc + (Number(item.discount) / 100) * Number(item.totalPrice),
          0
        );
        discount += services.reduce(
          (acc, item) =>
            acc + (Number(item.discount) / 100) * Number(item.totalPrice),
          0
        );
        const netAmount = amountWithoutDiscount - discount;
        const VAT = 0.2 * netAmount;
        const paid = netAmount + VAT;

        return {
          amountWithoutDiscount,
          discount,
          netAmount,
          VAT,
          paid,
        };
      });
    }, [items, services]);

    useEffect(() => {
      setProvider(
        providerName === Providers.Ecohome ? ECOHOME_COMPANY : SATECMA_COMPANY
      );
    }, [providerName, provider]);

    return (
      <div ref={ref} className="invoice-box">
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
                          src={logo}
                          alt="logo"
                          width={420}
                          height={95}
                        />
                        <br />
                        <span>Фактура №: {invoiceNumber}</span>
                        <br />
                        <span>
                          Създадена:{" "}
                          {new Date().toLocaleDateString("bg-BG", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            timeZone: "Europe/Sofia",
                          })}
                        </span>
                      </td>

                      <td>
                        Доставчик: <br />
                        Фирма:{" "}
                        <SelectField
                          value={providerName}
                          values={[Providers.Ecohome, Providers.Satecma]}
                          isFieldsDisabled={isFieldsDisabled}
                          onChange={(e) =>
                            setProviderName(e.target.value as Providers)
                          }
                        />
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td>№</td>
              <td>Продукт</td>
              <td>Количество</td>
              <td>Ед. цена (без ДДС)</td>
              <td>Отстъпка (%)</td>
              <td>ДДС (%)</td>
              <td>Стойност (без ДДС)</td>
            </tr>

            {items &&
              items.map(
                ({
                  code,
                  name,
                  discount,
                  quantity,
                  price,
                  unit_price,
                  totalPrice,
                  unit,
                }) => (
                  <tr className="item" key={code}>
                    <td>
                      <Button
                        isFieldsDisabled={isFieldsDisabled}
                        value={code}
                        onClick={removeItem}
                      />
                    </td>
                    <td>{name}</td>
                    <td>
                      <input
                        className="invoiceBox__small-field"
                        type="number"
                        name="quantity"
                        value={quantity}
                        data-code={code}
                        onChange={itemChangeHandler}
                      />
                      {` ${
                        unit_price
                          ? unitsMapCyrilic[StoreUnits.pcs]
                          : unitsMapCyrilic[unit]
                      }`}
                    </td>
                    <td>
                      {unit_price
                        ? unit_price.toFixed(2)
                        : price
                        ? price?.toFixed(2)
                        : "0.00"}{" "}
                      лв.
                    </td>
                    <td>
                      <input
                        className="invoiceBox__small-field"
                        type="number"
                        name="discount"
                        value={discount}
                        data-code={code}
                        onChange={itemChangeHandler}
                      />{" "}
                    </td>
                    <td>
                      <SelectField
                        data-code={code}
                        isFieldsDisabled={isFieldsDisabled}
                        value="20"
                        values={["20"]}
                        onChange={itemSelectHandler}
                      />
                    </td>
                    <td>{totalPrice} лв.</td>
                  </tr>
                )
              )}

            {services.map(
              ({
                name,
                code,
                discount,
                quantity,
                price,
                unit_price,
                totalPrice,
                unit,
              }) => (
                <tr className="service" key={code}>
                  <td>
                    <Button
                      isFieldsDisabled={isFieldsDisabled}
                      value={code}
                      onClick={removeItem}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      data-code={code}
                      onChange={serviceChangeHandler}
                    />{" "}
                  </td>
                  <td>
                    <input
                      className="invoiceBox__small-field"
                      type="number"
                      name="quantity"
                      value={quantity}
                      data-code={code}
                      onChange={serviceChangeHandler}
                    />
                    {` ${unitsMapCyrilic[unit]}`}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="price"
                      value={unit_price || price || 0}
                      data-code={code}
                      onChange={serviceChangeHandler}
                    />
                    {" лв. "}
                  </td>
                  <td>
                    <input
                      className="invoiceBox__small-field"
                      type="number"
                      name="discount"
                      value={discount}
                      data-code={code}
                      onChange={serviceChangeHandler}
                    />{" "}
                  </td>
                  <td>
                    <SelectField
                      data-code={code}
                      isFieldsDisabled={isFieldsDisabled}
                      value="20"
                      values={["20"]}
                      onChange={serviceSelectHandler}
                    />
                  </td>
                  <td>{totalPrice} лв.</td>
                </tr>
              )
            )}
            {!isFieldsDisabled && (
              <tr>
                <td></td>
                <td colSpan={1}>
                  <Input
                    products={products}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                </td>
                <td colSpan={1}>
                  <button type="button" onClick={addItem}>
                    Добави
                  </button>
                </td>
              </tr>
            )}
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
                Email:{" "}
                <TextField
                  name="email"
                  type="text"
                  placeholder="Email"
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
                    Банкови реквизити: {bank.name}
                    <br />
                    BIC: {bank.swift}
                    <br />
                    IBAN:{" "}
                    <TextField
                      name="iban"
                      type="text"
                      placeholder="IBAN"
                      value={bank.iban}
                      isFieldsDisabled={isFieldsDisabled}
                      onChange={(e) =>
                        setBank({
                          ...getBankDetailsFromIban(e.target.value),
                        })
                      }
                    />
                    {bank.error && (
                      <>
                        <br />
                        <span className="invoiceBox__error">
                          IBAN-a трябва да съдържа 22 символа
                        </span>
                      </>
                    )}
                    <br />
                  </>
                )}
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
  }
);

InvoiceBox.displayName = "InvoiceBox";