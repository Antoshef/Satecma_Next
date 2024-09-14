import { useCreateEcontPackage } from "./useCreateEcontPackage";

export const PackageDataFields = () => {
  const { packageData, setPackageData } = useCreateEcontPackage();
  const {
    description,
    dimensions,
    id,
    isFragile,
    quantity,
    type,
    volume,
    weight,
    isLessThan60cm,
  } = packageData;

  return (
    <section className="flex flex-col gap-4">
      <h6 className="bg-gray-800 text-white px-2 py-1 text-lg font-semibold">
        Данни за пратката
      </h6>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm font-medium text-gray-700">
              Тип на пратката
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  type: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Писмо">Документ</option>
              <option value="Писмо">Колет</option>
              <option value="Писмо">Пощенска пратка</option>
              <option value="Писмо">Карго палет</option>
              <option value="Писмо">Карго експрес</option>
              <option value="Писмо">Карго палет + документи</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="quantity"
              className="text-sm font-medium text-gray-700"
            >
              Брой части
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  quantity: +e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="weight"
              className="text-sm font-medium text-gray-700"
            >
              Тегло на пратката (кг)
            </label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  weight: +e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="id" className="text-sm font-medium text-gray-700">
              Номер на пратката
            </label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  id: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="volume"
              className="text-sm font-medium text-gray-700"
            >
              Обем на пратката (м3)
            </label>
            <input
              id="volume"
              type="number"
              value={volume}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  volume: +e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Описание на пратката
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  description: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="dimensions.width"
              className="text-sm font-medium text-gray-700"
            >
              Ширина (см)
            </label>
            <input
              id="dimensions.width"
              type="number"
              value={dimensions.width}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  dimensions: {
                    ...dimensions,
                    width: +e.target.value,
                  },
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="dimensions.height"
              className="text-sm font-medium text-gray-700"
            >
              Височина (см)
            </label>
            <input
              id="dimensions.height"
              type="number"
              value={dimensions.height}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  dimensions: {
                    ...dimensions,
                    height: +e.target.value,
                  },
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="dimensions.length"
              className="text-sm font-medium text-gray-700"
            >
              Дължина (см)
            </label>
            <input
              id="dimensions.length"
              type="number"
              value={dimensions.length}
              onChange={(e) =>
                setPackageData((state) => ({
                  ...state,
                  dimensions: {
                    ...dimensions,
                    length: +e.target.value,
                  },
                }))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="cursor-pointer flex items-center"
            onClick={() =>
              setPackageData((state) => ({
                ...state,
                isFragile: !isFragile,
              }))
            }
          >
            <span className="text-sm font-medium text-gray-700">
              Пратката ми е чуплива
            </span>
            <input
              type="checkbox"
              checked={isFragile}
              onChange={() =>
                setPackageData((state) => ({
                  ...state,
                  isFragile: !isFragile,
                }))
              }
              className="ml-2 form-checkbox h-5 w-5 text-blue-600"
              aria-label="controlled"
            />
          </div>
          <div
            className="cursor-pointer flex items-center"
            onClick={() =>
              setPackageData((state) => ({
                ...state,
                isLessThan60cm: !isLessThan60cm,
              }))
            }
          >
            <span className="text-sm font-medium text-gray-700">Под 60 см</span>
            <input
              type="checkbox"
              checked={isLessThan60cm}
              onChange={() =>
                setPackageData((state) => ({
                  ...state,
                  isLessThan60cm: !isLessThan60cm,
                }))
              }
              className="ml-2 form-checkbox h-5 w-5 text-blue-600"
              aria-label="controlled"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
