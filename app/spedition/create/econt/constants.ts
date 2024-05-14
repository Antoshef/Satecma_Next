export const INIT_SENDER = {
  name: "",
  city: {},
  office: {},
  currentCityOffices: [],
};

export const INIT_RECEIVER = {
  name: "",
  phone: "",
  country: "България",
  city: {},
  email: "",
  office: {},
  address: undefined,
  currentCityOffices: [],
};

export const INIT_PACKAGE = {
  quantity: 1,
  weight: "",
  type: "Писмо",
  dimensions: {
    width: "",
    height: "",
    length: "",
  },
  description: "",
  id: "",
  isFragile: false,
  isLessThan60cm: false,
  volume: "",
};

export const INIT_ADDITIONAL_SERVICES = {
  price: "",
  cashOnDelivery: {
    payer: "",
    amount: "",
  },
  paymentType: "",
  twoWayDelivery: false,
  SMSNotification: false,
  coolingBag: false,
  invoiceId: "",
  stretchFoil: false,
  borrowPallet: false,
  stretchFoilPacking: false,
};
