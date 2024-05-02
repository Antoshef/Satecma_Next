import { forwardRef } from "react";
import { SATECMA_LOGO } from "../invoice/constants";
import { Provider } from "../invoice/types";

interface OfferBoxProps {
  provider: Provider;
}

export const OfferBox = forwardRef<HTMLDivElement, OfferBoxProps>(
  ({ provider }, ref) => {
    return (
      <div ref={ref}>
        <table>
          <tbody>
            <tr className="top">
              <td colSpan={2}>
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
          </tbody>
        </table>
      </div>
    );
  }
);
