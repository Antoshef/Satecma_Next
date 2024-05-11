export interface Receiver {
  name: string;
  phone: string;
  country: string;
  city: string;
  email: string;
  zipCode: number | string;
  office: string;
}

export interface Package {
  quantity: number | string;
  weight: number | string;
  type: string;
  dimensions: {
    width: number | string;
    height: number | string;
    length: number | string;
  };
  description: string;
  id: string;
  isFragile: boolean;
  volume: number | string;
  isLessThan60cm: boolean;
}

export interface AdditionalServices {
  price: number | string;
  cashOnDelivery: {
    payer: string;
    amount: number | string;
  };
  paymentType: string;
  twoWayDelivery: boolean;
  SMSNotification: boolean;
  coolingBag: boolean;
  invoiceId: string;
  stretchFoil: boolean;
  borrowPallet: boolean;
  stretchFoilPacking: boolean;
}

interface ShipmentType {
  // Assuming structure for ShipmentType; define according to specific requirements
  type: string;
  description: string;
}

interface Country {
  id: number;
  code2: string;
  code3: string;
  name: string;
  nameEn: string;
  isEU: boolean;
}

export interface EcontCity {
  id: number;
  country: Country;
  postCode: string;
  name: string;
  nameEn: string;
  regionName: string | null;
  regionNameEn: string | null;
  phoneCode: string | null;
  location: string | null;
  expressCityDeliveries: string | null;
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
  serviceDays: string | null;
  zoneId: string | null;
  zoneName: string | null;
  zoneNameEn: string | null;
}

interface Location {
  latitude: number;
  longitude: number;
  confidence: number;
}

interface Address {
  id: string | null;
  city: EcontCity;
  fullAddress: string;
  fullAddressEn: string;
  quarter: string;
  street: string;
  num: string;
  other: string;
  location: Location;
  zip: string | null;
  hezid: string | null;
}

export interface EcontOffice {
  id: number;
  code: string;
  isMPS: boolean;
  isAPS: boolean;
  name: string;
  nameEn: string;
  phones: string[];
  emails: string[];
  address: Address;
  info: string;
  currency: string;
  language: string | null;
  normalBusinessHoursFrom: number;
  normalBusinessHoursTo: number;
  halfDayBusinessHoursFrom: number;
  halfDayBusinessHoursTo: number;
  sundayBusinessHoursFrom: number;
  sundayBusinessHoursTo: number;
  shipmentTypes: string[];
  partnerCode: string;
  hubCode: string;
  hubName: string;
  hubNameEn: string;
  isDrive: boolean;
}
