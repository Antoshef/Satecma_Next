import { Fragment } from "react";
import { Hourglass } from "react-loader-spinner";
import { InvoiceProductData, StoreProduct, StoreUnits } from "./types";

interface Props {
  isOpen: boolean;
  isFetching: boolean;
  productsToUpdate: InvoiceProductData[] | null;
  productMap: Map<string, StoreProduct | null>;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const ProductsDialog = ({
  isOpen,
  setIsOpen,
  isFetching,
  productsToUpdate,
  productMap,
  onConfirm,
}: Props) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isFetching ? "Обновяване на склада..." : "Проверка на продуктите"}
          </h2>
          {!isFetching && (
            <button
              aria-label="close"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="p-4">
          {isFetching ? (
            <div className="flex justify-center">
              <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="p-4 text-lg font-semibold">
                Брой продукти за добавяне: {productsToUpdate?.length}
              </p>
              {productsToUpdate
                ?.sort((a, b) => {
                  const aKey = `${a.code}-${a.package}`;
                  const storeProduct = productMap.get(aKey);
                  if (storeProduct) {
                    return -1;
                  } else {
                    return 1;
                  }
                })
                .map((incomingProduct) => {
                  const key = `${incomingProduct.code}-${incomingProduct.package}`;
                  const storeProduct = productMap.get(key);
                  return (
                    <Fragment key={incomingProduct.code}>
                      <div className="mb-4 w-full">
                        <p className="text-base">
                          {storeProduct ? (
                            <>
                              <hr className="my-2" />
                              Код: {storeProduct.code}, Име: {storeProduct.name}
                              , Опаковка: {storeProduct.package}{" "}
                              {storeProduct.unit} - Текущо количество:{" "}
                              <span className="text-red-500 text-lg">
                                {storeProduct.quantity}
                              </span>
                              , Приходящо количество:{" "}
                              <span className="text-blue-500 text-lg">
                                {incomingProduct.unit === StoreUnits.pcs
                                  ? incomingProduct.totalQuantity
                                  : incomingProduct.quantity}{" "}
                              </span>{" "}
                              {"=>"} ,Общо:{" "}
                              <span className="text-green-500 text-lg">
                                {storeProduct.quantity +
                                  incomingProduct.quantity}{" "}
                                {StoreUnits.pcs}
                              </span>
                            </>
                          ) : (
                            <>
                              <hr className="my-2" />
                              Код: {incomingProduct.code}, Име:{" "}
                              {incomingProduct.description}, Опаковка:{" "}
                              {incomingProduct.package} {incomingProduct.unit},
                              Приходящо количество:{" "}
                              <span className="text-blue-500 text-lg">
                                {incomingProduct.unit === StoreUnits.pcs
                                  ? incomingProduct.totalQuantity
                                  : incomingProduct.quantity}{" "}
                                {StoreUnits.pcs}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </Fragment>
                  );
                })}
              <button
                onClick={onConfirm}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Прибави продуктите
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
