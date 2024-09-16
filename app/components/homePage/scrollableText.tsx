'use client';
import { useEffect, useRef, useState } from 'react';
import { DashedLineIcon } from './dashedLineIcon'; // Import the DashedLineIcon component

const items = [
  {
    primary: 'Регистрация на екип',
    secondary: 'Добавяне на членове към проекта'
  },
  {
    primary: 'Подписване на договор',
    secondary: 'Използвайте готови или персонализирани договори'
  },
  {
    primary: 'Изпращане на фактура',
    secondary: 'Екипът изпраща фактури за одобрение'
  },
  {
    primary: 'Одобряване на фактура',
    secondary: 'Извършете плащане по фактурата'
  },
  {
    primary: 'Получаване на плащане',
    secondary: 'Екипът получава заплащането в избраната валута'
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
              <li
                key={index}
                ref={(el) => {
                  listItemRefs.current[index] = el;
                  return undefined;
                }}
                className="flex items-start gap-2 py-0"
              >
                {/* DashedLineIcon with the isActive prop */}
                <DashedLineIcon
                  disableLine={index >= items.length - 1}
                  isActive={activeIndices.includes(index)}
                />
                <div>
                  <p className="text-theme-light-primary dark:text-theme-dark-primary">
                    {item.primary}
                  </p>
                  <p className="text-theme-light-secondary dark:text-theme-dark-tertiary">
                    {item.secondary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
