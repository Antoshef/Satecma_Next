'use client';
import { useEffect, useRef, useState } from 'react';
import { DashedLineIcon } from './dashedLineIcon'; // Import the DashedLineIcon component
import { EmailIcon } from './icons/emailIcon';
import { OfferIcon } from './icons/offerIcon';
import { InvoiceIcon } from './icons/invoiceIcon';
import { ClientIcon } from './icons/clientIcon';
import { ProductIcon } from './icons/productIcon';

const items = [
  {
    primary: 'Създаване на фактури',
    secondary: 'База данни и управление на вашите фактури',
    Icon: InvoiceIcon
  },
  {
    primary: 'Създаване на оферти',
    secondary: 'Бази данни и управление на оферти',
    Icon: OfferIcon
  },
  {
    primary: 'Автоматично изпращане на документи',
    secondary: 'Възможност за изпращане на създадени документи на клиентите',
    Icon: EmailIcon
  },
  {
    primary: 'Управление данни на клиенти',
    secondary: 'Възможност за управление на данни на клиентите',
    Icon: ClientIcon
  },
  {
    primary: 'Управление на бази данни на продукти',
    secondary: 'Възможност за управление на бази данни на продукти',
    Icon: ProductIcon
  }
];

export const ScrollableText = () => {
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const middleOfScreen = window.innerHeight / 2;
      const newActiveIndices: number[] = [];

      listItemRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Check if the item's top is above the middle of the screen
          if (rect.top < middleOfScreen) {
            newActiveIndices.push(index);
          }
        }
      });

      setActiveIndices(newActiveIndices);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="my-40 rounded-none shadow-none">
      <div className="container px-16 min-h-[50vh] flex flex-wrap  mx-auto">
        {/* Left Column: Large Title */}
        <div className="w-full md:w-1/2">
          <div className="sticky top-[40%] z-10 transform -translate-y-1/10">
            <h2 className="text-5xl font-bold text-theme-light-primary dark:text-theme-dark-primary tracking-wide">
              Процес на управление на проекти
            </h2>
          </div>
        </div>

        {/* Right Column: Icons with Titles/Subtitles */}
        <div className="w-full md:w-1/2 pl-12 flex flex-col justify-center">
          <ul>
            {items.map((item, index) => (
              <DashedLineIcon
                key={index}
                Icon={item.Icon}
                disableLine={index >= items.length - 1}
                isActive={activeIndices.includes(index)}
                item={item}
                index={index}
                listItemRefs={listItemRefs}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
