import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { CompanyContext } from "../../components/providers/companyProvider";
import { SelectField } from "../../components/selectField/SelectField";
import { TextField } from "../../components/textField/TextField";
import { StoreUnits } from "../../store/utils/types";
import { Company, ECOHOME_COMPANY, SATECMA_COMPANY } from "./constants";
import {
  InvoiceData,
  InvoiceType,
  Item,
  LatestInvoices,
  ProductData,
  Provider,
} from "./types";
import { calculateItemPrice, getBankDetailsFromIban } from "./utils";

const logo =
  "https://satecma.bg/wp-content/uploads/2024/02/logo-satecma-industrias.png";

interface InvoiceBoxProps {
  provider: Provider;
  products: ProductData[];
  invoiceNumber: string;
  isFieldsDisabled: boolean;
  invoiceData: InvoiceData;
  currentInvoiceType: InvoiceType;
  setEmail: (email: string) => void;
  setError: (error: boolean) => void;
  setProvider: (provider: Provider) => void;
  submitItems: (items: Item[]) => void;
  setInvoiceData: Dispatch<SetStateAction<InvoiceData>>;
  setCurrentInvoiceType: Dispatch<SetStateAction<InvoiceType>>;
  setLatestInvoiceNumbers: Dispatch<SetStateAction<LatestInvoices>>;
}

export const InvoiceBox = forwardRef<HTMLTableElement, InvoiceBoxProps>(
  (
    {
      provider,
      products,
      invoiceNumber,
      isFieldsDisabled,
      invoiceData,
      currentInvoiceType,
      setEmail,
      setError,
      setProvider,
      submitItems,
      setInvoiceData,
      setCurrentInvoiceType,
      setLatestInvoiceNumbers,
    },
    ref
  ) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
      null
    );
    const [wordPrice, setWordPrice] = useState("");
    const [reason, setReason] = useState("");
    const [items, setItems] = useState<Item[]>([]);
    const [services, setServices] = useState<Item[]>([]);
    const [bank, setBank] = useState({
      iban: "BG79FINV91501017339942",
      swift: "FINVBGSF",
      name: "Първа Инвестиционна Банка",
      error: false,
    });
    const [paymentMethod, setPaymentMethod] = useState("По Банка");
    const { company } = useContext(CompanyContext);
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setReceiver((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    };

    const itemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, dataset } = e.target;
      const newItems = [...items];
      const currentItem = newItems.find((item) => item.code === dataset.code);
      if (currentItem) {
        (currentItem as any)[name] = value;
        currentItem.totalPrice = calculateItemPrice(currentItem);
        setItems(newItems);
      }
    };

    const itemSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, dataset, name } = e.target;
      const newItems = [...items];
      const currentItem = newItems.find((item) => item.code === dataset.code);
      if (currentItem) {
        (currentItem as any)[name] = value;
        currentItem.totalPrice = calculateItemPrice(currentItem);
        setItems(newItems);
      }
    };

    const serviceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, dataset } = e.target;
      const newServices = [...services];
      const currentService = newServices.find(
        (item) => item.code === dataset.code
      );
      if (currentService) {
        (currentService as any)[name] = value;
        currentService.totalPrice = (
          currentService.quantity * currentService.price
        ).toFixed(2);
        setServices(newServices);
      }
    };

    const serviceSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, dataset } = e.target;
      const newServices = [...services];
      const currentService = newServices.find(
        (item) => item.code === dataset.code
      );
      if (currentService) {
        currentService.VAT = value;
        setServices(newServices);
      }
    };

    const addItem = () => {
      if (selectedProduct) {
        const { unit, code, name, price, packing, percentage_increase } =
          selectedProduct;
        const salePrice = price * percentage_increase;
        const VAT = "20";
        const newItem: Item = {
          code: code || (items.length + services.length + 8000).toString(),
          name,
          packing,
          currentPackage: packing.split(", ")[0] || "",
          quantity: 1,
          unit,
          price: salePrice,
          discount: "0",
          VAT,
          totalPrice: "0",
        };
        newItem.totalPrice = calculateItemPrice(newItem);
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
          code: (items.length + services.length + 9000).toString(),
          name: "",
          packing: "",
          currentPackage: "",
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
      setError(!wordPrice.length || invoiceNumber.length !== 10);
    }, [wordPrice, invoiceNumber, setError]);

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
        company === Company.ekoHome ? ECOHOME_COMPANY : SATECMA_COMPANY
      );
    }, [company]);

    useEffect(() => {
      submitItems([...items]);
    }, [items, submitItems]);

    useEffect(() => {
      setInvoiceData((state) => ({
        ...state,
        client: receiver.company,
        eik: Number(receiver.EIK),
        vat_number: receiver.VAT,
        amount: total.amountWithoutDiscount,
        vat: total.VAT,
        total: total.paid,
        invoice_id: invoiceNumber,
      }));
    }, [receiver, total, invoiceNumber]);

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
                        <img
                          style={{ height: "auto", width: "auto" }}
                          src={logo}
                          alt="logo"
                          width={420}
                          height={95}
                        />
                        <br />
                        {!isFieldsDisabled && (
                          <>
                            <SelectField
                              isFieldsDisabled={isFieldsDisabled}
                              value={currentInvoiceType}
                              values={[
                                InvoiceType.current,
                                InvoiceType.previous,
                                InvoiceType.manual,
                              ]}
                              onChange={(e) =>
                                setCurrentInvoiceType(
                                  e.target.value as InvoiceType
                                )
                              }
                            />
                            <br />
                          </>
                        )}
                        <span>
                          Фактура №:{" "}
                          {currentInvoiceType === InvoiceType.manual ? (
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
                        <span>Създадена: {invoiceData.date}</span>
                      </td>

                      <td>
                        Доставчик: <br />
                        Фирма: {company}
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

            <tr className="heading">
              <td>№</td>
              <td>Продукт</td>
              <td>Количество</td>
              <td>Опаковка</td>
              <td>Ед. цена</td>
              <td>Отстъпка (%)</td>
              <td>ДДС (%)</td>
              <td>Стойност (без ДДС)</td>
            </tr>

            {items &&
              items.map(
                ({
                  code,
                  name,
                  packing,
                  currentPackage,
                  discount,
                  quantity,
                  price,
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
                      <TextField
                        smallField
                        type="number"
                        name="quantity"
                        value={quantity}
                        data-code={code}
                        isFieldsDisabled={isFieldsDisabled}
                        onChange={itemChangeHandler}
                      />
                      {` ${StoreUnits.pcs}`}
                    </td>
                    <td>
                      <SelectField
                        name="currentPackage"
                        data-code={code}
                        isFieldsDisabled={isFieldsDisabled}
                        value={currentPackage}
                        values={packing.split(", ")}
                        onChange={itemSelectHandler}
                      />
                      {` ${unit}`}
                    </td>

                    <td>{`${price.toFixed(2)} лв.`}</td>
                    <td>
                      <TextField
                        smallField
                        type="number"
                        name="discount"
                        value={discount}
                        data-code={code}
                        isFieldsDisabled={isFieldsDisabled}
                        onChange={itemChangeHandler}
                      />{" "}
                    </td>
                    <td>
                      <SelectField
                        name="VAT"
                        data-code={code}
                        isFieldsDisabled={isFieldsDisabled}
                        value="20"
                        values={["20"]}
                        onChange={itemSelectHandler}
                      />
                    </td>
                    <td
                      className={
                        !Number(totalPrice) ? "invoiceBox__zero-amount" : ""
                      }
                    >
                      {totalPrice} лв.
                    </td>
                  </tr>
                )
              )}

            {services.map(
              ({ name, code, discount, quantity, price, totalPrice, unit }) => (
                <tr className="service" key={code}>
                  <td>
                    <Button
                      isFieldsDisabled={isFieldsDisabled}
                      value={code}
                      onClick={removeItem}
                    />
                  </td>
                  <td>
                    <TextField
                      type="text"
                      name="name"
                      value={name}
                      data-code={code}
                      isFieldsDisabled={isFieldsDisabled}
                      onChange={serviceChangeHandler}
                    />{" "}
                  </td>
                  <td>
                    <TextField
                      smallField
                      type="number"
                      name="quantity"
                      value={quantity}
                      data-code={code}
                      isFieldsDisabled={isFieldsDisabled}
                      onChange={serviceChangeHandler}
                    />
                    {` ${unit}`}
                  </td>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      name="price"
                      value={price}
                      data-code={code}
                      className="input-field max-w-16"
                      onChange={serviceChangeHandler}
                    />
                    {" лв. "}
                  </td>
                  <td>
                    <TextField
                      smallField
                      type="number"
                      name="discount"
                      value={discount}
                      data-code={code}
                      isFieldsDisabled={isFieldsDisabled}
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
                  <button
                    className="button"
                    type="button"
                    onClick={addItem}
                  >
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
