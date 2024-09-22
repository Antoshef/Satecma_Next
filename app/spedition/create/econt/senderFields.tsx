import { Input, itemHandler } from '@/components/genericTable/genericInput';
import { City } from './services/shipments/types';
import { Sender } from './types';

interface Props extends Sender {
  cities: City[];
  setSender: React.Dispatch<React.SetStateAction<Sender>>;
}

export const SenderFields = ({
  name,
  city,
  office,
  cities,
  currentCityOffices,
  setSender
}: Props) => {
  return (
    <article className="flex flex-col gap-4">
      <h6 className="bg-gray-800 text-white px-2 py-1 text-lg font-semibold">
        Подател
      </h6>
      <section className="flex flex-row gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="senderName"
            className="text-sm font-medium text-gray-700"
          >
            Упълномощено лице
          </label>
          <input
            id="senderName"
            type="text"
            required
            value={name}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <Input
          label="Град"
          required
          data={cities}
          selectedItem={city}
          setSelectedItem={(name) =>
            itemHandler(name, cities, 'city', setSender)
          }
        />
        <Input
          label="Офис"
          required
          data={currentCityOffices}
          selectedItem={office}
          setSelectedItem={(name) =>
            itemHandler(name, currentCityOffices, 'office', setSender)
          }
        />
      </section>
    </article>
  );
};
