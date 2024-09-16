'use client';

import { useState } from 'react';

export const SEOAccordion = () => {
  const [openTab, setOpenTab] = useState<number | null>(null);

  const toggleTab = (index: number) => {
    setOpenTab(openTab === index ? null : index);
  };

  return (
    <div>
      {accordionData.map((item, index) => (
        <div
          key={index}
          className={`border border-theme-light-secondary dark:border-theme-dark-secondary rounded-lg overflow-hidden shadow-sm ${openTab === index && 'mb-4'}`}
        >
          <button
            onClick={() => toggleTab(index)}
            className="flex justify-between items-center w-full p-4 text-left text-lg font-medium text-theme-light-primary dark:text-theme-dark-primary bg-theme-light-background hover:bg-theme-light-secondary hover:text-theme-light-white  dark:bg-theme-dark-background dark:hover:bg-theme-dark-secondary focus:outline-none"
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            {item.title}
            <span
              className={`transform transition-transform ${
                openTab === index ? 'rotate-180' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <div
            id={`panel${index}-content`}
            className={`transition-max-height duration-200 overflow-hidden ${
              openTab === index ? 'max-h-screen p-4' : 'max-h-0'
            } bg-theme-light-background dark:bg-theme-dark-background text-theme-light-secondary dark:text-theme-dark-tertiary`}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const accordionData = [
  {
    title: 'Съхранение на оферти и фактури',
    content:
      'Нашето приложение предлага лесен начин за съхранение на всички оферти и фактури на едно място. Това улеснява бързия достъп до необходимата информация и намалява риска от загуба на данни.'
  },
  {
    title: 'Създаване и изпращане на документи',
    content:
      'Създаването на оферти и фактури никога не е било толкова лесно. Можете бързо да генерирате документи и да ги изпратите на клиентите си директно през приложението.'
  },
  {
    title: 'Поддържане на продуктово съхранение',
    content:
      'Нашето приложение ви дава възможност да следите наличностите на вашите продукти. Можете да добавяте нови продукти, да актуализирате техните данни и да следите количествата в реално време.'
  },
  {
    title: 'Управление на клиентска информация',
    content:
      'Приложението ви позволява да поддържате и организирате клиентска база данни. Лесно можете да добавяте нови клиенти, да актуализирате информацията им и да следите техните поръчки и документи.'
  },
  {
    title: 'Оптимизация на бизнес операциите',
    content:
      'Използването на нашето приложение значително подобрява ефективността на вашите бизнес операции. Всички необходими инструменти са събрани на едно място, което ви спестява време и усилия в управлението на вашите документи, продукти и клиенти.'
  }
];
