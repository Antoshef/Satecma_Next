interface ClientProfile {
  id?: number;
  name?: string;
  nameEn?: string;
  phones: string[];
  email?: string;
  skypeAccounts?: string[];
  clientNumber?: string;
  clientNumberEn?: string;
  juridicalEntity?: boolean;
  personalIDType?: string;
  personalIDNumber?: string;
  companyType?: string;
  ein?: string;
  ddsEinPrefix?: string;
  ddsEin?: string;
  registrationAddress?: string;
  molName?: string;
  molEGN?: string;
  molIDNum?: string;
}

interface Address {
  id?: number;
  city?: City;
  fullAddress?: string;
  fullAddressEn?: string;
  quarter?: string;
  street?: string;
  num?: string;
  other?: string;
  location?: GeoLocation;
  zip?: string;
  hezid?: string;
}

interface PackElement {
  // Define the structure of PackElement based on your requirements
}

interface ShipmentType {
  // Define the structure of ShipmentType based on your requirements
}

interface ShippingLabelServices {
  // Define the structure of ShippingLabelServices based on your requirements
}

interface Instruction {
  // Define the structure of Instruction based on your requirements
}

interface PackingListElement {
  // Define the structure of PackingListElement based on your requirements
}

interface CustomsListElement {
  // Define the structure of CustomsListElement based on your requirements
}

export interface Shipment {
  shipmentNumber: string;
  senderName: string;
  status: string;
  createdDate: number;
  acceptedDate: number;
  cdAmount: number;
  courierServiceAmount: number;
  courierServiceMasterPayer: string;
  receiverPhone: string;
  cdCurrency: string;
  courierServiceCurrency: string;
}

export interface ShippingLabel {
  shipmentNumber?: string;
  previousShipmentNumber?: string;
  previousShipmentReceiverPhone?: string;
  senderClient?: ClientProfile;
  senderAgent?: ClientProfile;
  senderAddress?: Address;
  senderOfficeCode?: string;
  emailOnDelivery?: string;
  smsOnDelivery?: string;
  receiverClient?: ClientProfile;
  receiverAgent?: ClientProfile;
  receiverAddress?: Address;
  receiverOfficeCode?: string;
  receiverProviderID?: number;
  receiverBIC?: string;
  receiverIBAN?: string;
  envelopeNumbers: string[];
  packCount?: number;
  packs: PackElement[];
  shipmentType?: ShipmentType;
  weight?: number;
  sizeUnder60cm?: boolean;
  shipmentDimensionsL?: number;
  shipmentDimensionsW?: number;
  shipmentDimensionsH?: number;
  shipmentDescription?: string;
  orderNumber?: string;
  sendDate?: Date;
  holidayDeliveryDay?: string;
  keepUpright?: boolean;
  services?: ShippingLabelServices;
  instructions: Instruction[];
  payAfterAccept?: boolean;
  payAfterTest?: boolean;
  packingListType?: string;
  packingList: PackingListElement[];
  partialDelivery?: boolean;
  paymentSenderMethod?: string;
  paymentReceiverMethod?: string;
  paymentReceiverAmount?: number;
  paymentReceiverAmountIsPercent?: boolean;
  paymentOtherClientNumber?: string;
  paymentOtherAmount?: number;
  paymentOtherAmountIsPercent?: boolean;
  mediator?: string;
  paymentToken?: string;
  customsList: CustomsListElement[];
  customsInvoice?: string;
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

export interface City {
  id?: number;
  country?: Country;
  postCode?: string;
  name?: string;
  nameEn?: string;
  regionName?: string;
  regionNameEn?: string;
  phoneCode?: string;
  location?: string;
  expressCityDeliveries?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  serviceDays?: string;
  zoneId?: string;
  zoneName?: string;
  zoneNameEn?: string;
}

interface GeoLocation {
  latitude: number;
  longitude: number;
  confidence: number;
}

export interface Office {
  id?: number;
  code?: string;
  isMPS?: boolean;
  isAPS?: boolean;
  name?: string;
  nameEn?: string;
  phones?: string[];
  emails?: string[];
  address?: Address;
  info?: string;
  currency?: string;
  language?: string;
  normalBusinessHoursFrom?: number;
  normalBusinessHoursTo?: number;
  halfDayBusinessHoursFrom?: number;
  halfDayBusinessHoursTo?: number;
  sundayBusinessHoursFrom?: number;
  sundayBusinessHoursTo?: number;
  shipmentTypes?: string[];
  partnerCode?: string;
  hubCode?: string;
  hubName?: string;
  hubNameEn?: string;
  isDrive?: boolean;
}
