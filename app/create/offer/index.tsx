import { InputWrapper } from "@/components/input/wrapper";
import { forwardRef, useState } from "react";
import { SATECMA_LOGO } from "../invoice/constants";
import { ProductData, Provider } from "../invoice/types";
import { TableItems } from "../table/tableItems";
import { TableServices } from "../table/tableServices";
import { useTableItems } from "../table/useTableItems";
import { TextField } from "@/components/textField/TextField";

interface OfferBoxProps {
  provider: Provider;
  isFieldsDisabled: boolean;
  products: ProductData[];
}

export const OfferBox = forwardRef<HTMLDivElement, OfferBoxProps>(
  ({ provider, isFieldsDisabled, products }, ref) => {
    const [recipient, setRecipient] = useState({
      name: "",
      phone: "",
      email: "",
    });
    const [heading, setHeading] = useState("Заглавие на офертата");
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
      null
    );
    const [application, setApplication] = useState({
      warranty: 0,
      delivery: 0,
    });
    const [showApplication, setShowApplication] = useState(false);
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

    return (
      <div ref={ref} className="invoice-box">
        <table>
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
                        Получател:{" "}
                        <TextField
                          type="text"
                          name="name"
                          value={recipient.name}
                          isFieldsDisabled={isFieldsDisabled}
                          onChange={(e) =>
                            setRecipient({ ...recipient, name: e.target.value })
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
                          onChange={(e) =>
                            setRecipient({
                              ...recipient,
                              email: e.target.value,
                            })
                          }
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
                <h1 className="text-center text-4xl text-stone-800 font-bold p-8">
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
                  className="text-xl font-bold max-w-3xl w-full uppercase text-center"
                  textClass="text-xl font-bold uppercase"
                  isFieldsDisabled={isFieldsDisabled}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </td>
            </tr>
            <tr className="heading offer-table">
              <td>№</td>
              <td>Продукт</td>
              <td>Количество</td>
              <td>Опаковка</td>
              <td>Ед. цена</td>
              <td>Отстъпка (%)</td>
              <td>ДДС (%)</td>
              <td>Стойност (без ДДС)</td>
            </tr>
            <TableItems
              items={items}
              isFieldsDisabled={isFieldsDisabled}
              className="offer__items"
              itemChangeHandler={itemChangeHandler}
              itemSelectHandler={itemSelectHandler}
              removeItem={removeItem}
            />
            <TableServices
              services={services}
              isFieldsDisabled={isFieldsDisabled}
              className="offer__items"
              serviceChangeHandler={serviceChangeHandler}
              serviceSelectHandler={serviceSelectHandler}
              removeItem={removeItem}
            />

            <InputWrapper
              isFieldsDisabled={isFieldsDisabled}
              products={products}
              selectedProduct={selectedProduct}
              onSubmit={addItem}
              setSelectedProduct={setSelectedProduct}
            />

            <tr className="heading offer-prices">
              <td colSpan={2}></td>
              <td colSpan={2}>
                Данъчна основа
                <br /> без отстъпка
              </td>
              <td>Отстъпка</td>
              <td>Общо НЕТО</td>
              <td>ДДС</td>
              <td>Сума за плащане</td>
            </tr>

            <tr className="offer-prices">
              <td colSpan={2}>ОБЩО</td>
              <td colSpan={2}>{total.amountWithoutDiscount.toFixed(2)} лв.</td>
              <td>{total.discount.toFixed(2)} лв.</td>
              <td>{total.netAmount.toFixed(2)} лв.</td>
              <td>{total.VAT.toFixed(2)} лв.</td>
              <td>{total.paid.toFixed(2)} лв.</td>
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
                  //@ts-ignore
                  onClick={(e) => setShowApplication(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </>
          )}
          {showApplication && (
            <>
              <p>Валидност на офертата: 30 дни</p>
              <p>
                Начин на плащане: По Договор 50% - АВАНСОВО, 30% междинно
                плащане и 20% при издаване на обекта;
              </p>
              <p>
                Срок на изпълнение: до{" "}
                <TextField
                  type="number"
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
                  type="number"
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
            </>
          )}
        </div>
        <div className="flex justify-between mt-6 mb-2 font-bold">
          <span>гр. {provider.city}</span>
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
    );
  }
);
