import { Input, itemHandler } from "@/components/input";
import { City } from "./services/shipments/types";
import { Receiver } from "./types";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

interface Props extends Receiver {
  cities: City[];
  isAddressUsed: boolean;
  setIsAddressUsed: React.Dispatch<React.SetStateAction<boolean>>;
  setReceiver: React.Dispatch<React.SetStateAction<Receiver>>;
}

export const ReceiverFields = ({
  name,
  country,
  email,
  phone,
  cities,
  city,
  office,
  address,
  isAddressUsed,
  currentCityOffices,
  setIsAddressUsed,
  setReceiver,
}: Props) => {
  const addressRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);

  return (
    <article className="flex flex-col gap-4">
      <h6 className="bg-gray-800 text-white px-2 py-1 text-lg font-semibold">
        Получател
      </h6>
      <section className="flex flex-col gap-4">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => setIsAddressUsed(!isAddressUsed)}
        >
          <span className="text-sm font-medium text-gray-700">
            Достави до адрес
          </span>
          <input
            type="checkbox"
            checked={isAddressUsed}
            onChange={() => setIsAddressUsed(!isAddressUsed)}
            className="ml-2 form-checkbox h-5 w-5 text-blue-600"
            aria-label="controlled"
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Телефон
            </label>
            <input
              id="phone"
              type="text"
              required
              value={phone}
              onChange={(e) =>
                setReceiver((state) => ({
                  ...state,
                  phone: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Име на получател
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) =>
                setReceiver((state) => ({
                  ...state,
                  name: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Имейл
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setReceiver((state) => ({
                  ...state,
                  email: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="country"
              className="text-sm font-medium text-gray-700"
            >
              Държава
            </label>
            <input
              id="country"
              type="text"
              required
              disabled
              value={country}
              onChange={(e) =>
                setReceiver((state) => ({
                  ...state,
                  country: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Input
            label="Град"
            required
            data={cities}
            selectedItem={city}
            setSelectedItem={(name) =>
              itemHandler(name, cities, "city", setReceiver)
            }
          />
          <div className="flex flex-col">
            <label
              htmlFor="postCode"
              className="text-sm font-medium text-gray-700"
            >
              Пощенски код
            </label>
            <input
              id="postCode"
              type="number"
              value={city?.postCode || ""}
              onChange={(e) =>
                setReceiver((state) => ({
                  ...state,
                  postCode: +e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <CSSTransition
            in={!isAddressUsed}
            timeout={300}
            classNames="address"
            unmountOnExit
            nodeRef={officeRef}
          >
            <Input
              label="Офис"
              required
              data={currentCityOffices}
              ref={officeRef}
              selectedItem={office}
              setSelectedItem={(name) =>
                itemHandler(name, currentCityOffices, "office", setReceiver)
              }
            />
          </CSSTransition>
        </div>

        <CSSTransition
          in={isAddressUsed}
          timeout={300}
          classNames="address"
          unmountOnExit
          nodeRef={addressRef}
        >
          <div className="flex flex-col gap-4" ref={addressRef}>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="street"
                  className="text-sm font-medium text-gray-700"
                >
                  Улица
                </label>
                <input
                  id="street"
                  type="text"
                  required
                  value={address?.street || ""}
                  onChange={(e) =>
                    setReceiver((state) => ({
                      ...state,
                      address: {
                        ...state.address,
                        street: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="number"
                  className="text-sm font-medium text-gray-700"
                >
                  Номер
                </label>
                <input
                  id="number"
                  type="text"
                  required
                  value={address?.num || ""}
                  onChange={(e) =>
                    setReceiver((state) => ({
                      ...state,
                      address: {
                        ...state.address,
                        num: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="district"
                  className="text-sm font-medium text-gray-700"
                >
                  Квартал
                </label>
                <input
                  id="district"
                  type="text"
                  value={address?.quarter || ""}
                  onChange={(e) =>
                    setReceiver((state) => ({
                      ...state,
                      address: {
                        ...state.address,
                        quarter: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="Building"
                  className="text-sm font-medium text-gray-700"
                >
                  Блок
                </label>
                <input
                  id="Building"
                  type="text"
                  value={address?.other || ""}
                  onChange={(e) =>
                    setReceiver((state) => ({
                      ...state,
                      address: {
                        ...state.address,
                        other: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="entrance"
                  className="text-sm font-medium text-gray-700"
                >
                  Вход
                </label>
                <input
                  id="entrance"
                  type="text"
                  value={address?.other || ""}
                  onChange={(e) =>
                    setReceiver((state) => ({
                      ...state,
                      address: {
                        ...state.address,
                        other: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="floor"
                  className="text-sm font-medium text-gray-700"
                >
                  Етаж
                </label>
                <input
                  id="floor"
                  type="text"
                  value={address?.other || ""}
                  onChange={(e) =>
                    setReceiver((state) => ({
                      ...state,
                      address: {
                        ...state.address,
                        other: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="apartment"
                  className="text-sm font-medium text-gray-700"
                >
                  Апартамент
                </label>
                <input
                  id="apartment"
                  type="text"
                  value={address?.other || ""}
                  onChange={(e) =>
                    setReceiver((state) => ({
                      ...state,
                      address: {
                        ...state.address,
                        other: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </CSSTransition>
      </section>
    </article>
  );
};
