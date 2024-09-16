import { apiRequest } from '@/utils/speedyRestClient';
import { EcontRestClient } from '../econtRestClient';
import { City, Office, Shipment, ShippingLabel } from './shipments/types';
import { Receiver } from '../types';

const getCities = async () =>
  EcontRestClient.request('Nomenclatures/NomenclaturesService.getCities.json', {
    countryCode: 'BG'
  })
    .then((res) => res.cities as City[])
    .catch((error) => {
      throw new Error(error);
    });

const getOffices = async () =>
  EcontRestClient.request(
    'Nomenclatures/NomenclaturesService.getOffices.json',
    { countryCode: 'BG' }
  )
    .then((res) => res.offices as Office[])
    .catch((error) => {
      throw new Error(error);
    });

const getClientProfiles = async () => {
  EcontRestClient.request('Profile/ProfileService.getClientProfiles.json')
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

const getShipments = async () => {
  EcontRestClient.request('Shipments/ShipmentService.getMyAWB.json')
    .then((data) => data.results as Shipment[])
    .catch((error) => console.error(error));
};

const getSpeedyOffices = async () => {
  apiRequest('shipment')
    .then((data) => console.log(data, 'DATA'))
    .catch((error) => console.error(error));
};

const getPaymentReportService = async () => {
  EcontRestClient.request(
    'PaymentReport/PaymentReportService.PaymentReport.json',
    {
      dateFrom: '2024-05-01',
      dateTo: '2024-05-15',
      paymentType: 'CASH'
    }
  )
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

const getShipmentStatuses = async () => {
  EcontRestClient.request(
    'Shipments/ShipmentService.getShipmentStatuses.json',
    {}
  )
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

const validateAddress = async (receiver: Receiver) => {
  const isAddressValid = EcontRestClient.request(
    'Nomenclatures/AddressService.validateAddress.json'
    // { city: receiver.city, street: receiver.address, num: receiver.num }
  );
  return isAddressValid;
};

const createLabel = async (receiver: Receiver) => {
  const label = EcontRestClient.request<{ label: ShippingLabel }>(
    'Shipments/LabelService.createLabel.json',
    {
      label: {
        receiverClient: {
          name: receiver.name,
          phones: [receiver.phone],
          email: receiver.email
        },
        receiverAddress: {
          city: receiver.city
          // street: receiver.address,
          // num: receiver.num,
        },
        receiverOfficeCode: receiver.office.code
      }
    }
  );
  return label;
};

export const EcontUtils = {
  getCities,
  getOffices,
  getClientProfiles,
  getShipments,
  getSpeedyOffices,
  getPaymentReportService,
  getShipmentStatuses,
  validateAddress,
  createLabel
};
