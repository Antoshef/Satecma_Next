import { useCreateEcontPackage } from "./useCreateEcontPackage";

export const AdditionalServices = () => {
  const { additionalServices, setAdditionalServices } = useCreateEcontPackage();
  const { SMSNotification, cashOnDelivery, invoiceId, paymentType, price } =
    additionalServices;

  return (
    <article className="flex flex-col gap-4">
      <h6 className="bg-gray-800 text-white px-2 py-1 text-lg font-semibold">
        Допълнителни услуги
      </h6>
      <section className="flex flex-row gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Обявена стойност
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) =>
                setAdditionalServices((state) => ({
                  ...state,
                  price: Number(e.target.value),
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="cashOnDeliveryPayer"
              className="text-sm font-medium text-gray-700"
            >
              Наложен платеж
            </label>
            <input
              id="cashOnDeliveryPayer"
              type="text"
              value={cashOnDelivery.payer}
              onChange={(e) =>
                setAdditionalServices((state) => ({
                  ...state,
                  cashOnDelivery: {
                    ...state.cashOnDelivery,
                    payer: e.target.value,
                  },
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="cashOnDeliveryAmount"
              className="text-sm font-medium text-gray-700"
            >
              Сума
            </label>
            <input
              id="cashOnDeliveryAmount"
              type="number"
              value={cashOnDelivery.amount}
              onChange={(e) =>
                setAdditionalServices((state) => ({
                  ...state,
                  cashOnDelivery: {
                    ...state.cashOnDelivery,
                    amount: Number(e.target.value),
                  },
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="invoiceId"
              className="text-sm font-medium text-gray-700"
            >
              Фактура / Дата
            </label>
            <input
              id="invoiceId"
              type="text"
              value={invoiceId}
              onChange={(e) =>
                setAdditionalServices((state) => ({
                  ...state,
                  invoiceId: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="paymentType"
              className="text-sm font-medium text-gray-700"
            >
              Тип на плащане
            </label>
            <input
              id="paymentType"
              type="text"
              value={paymentType}
              onChange={(e) =>
                setAdditionalServices((state) => ({
                  ...state,
                  paymentType: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div
            className="cursor-pointer flex items-center"
            onClick={() =>
              setAdditionalServices((state) => ({
                ...state,
                SMSNotification: !SMSNotification,
              }))
            }
          >
            <span className="text-sm font-medium text-gray-700">
              SMS известяване
            </span>
            <input
              type="checkbox"
              checked={SMSNotification}
              onChange={() =>
                setAdditionalServices((state) => ({
                  ...state,
                  SMSNotification: !SMSNotification,
                }))
              }
              className="ml-2 form-checkbox h-5 w-5 text-blue-600"
              aria-label="controlled"
            />
          </div>
        </div>
      </section>
    </article>
  );
};
