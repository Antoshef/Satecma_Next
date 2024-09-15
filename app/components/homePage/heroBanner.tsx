'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// Import the images
import BusinessPresentation from '/public/assets/svg/business-presentation.svg';
import FinanceInsurance from '/public/assets/svg/finance-insurance.svg';
import BusinessmanExplainingStrategy from '/public/assets/svg/businessman-explaining-the-strategy.svg';
import BusinessPeopleDiscussing from '/public/assets/svg/business-people-discussing-on-analysis-graph.svg';
import ManDevelopingSite from '/public/assets/svg/man-developing-website-on-desk.svg';

// Array to hold the clickable options and their respective content and images
const contentOptions = [
  {
    label: 'Проследяване на проекти',
    content:
      'С нашата платформа можете лесно да проследявате напредъка на проектите си и да управлявате задачите в реално време.',
    image: BusinessPresentation
  },
  {
    label: 'Управление на ресурси',
    content:
      'Оптимизирайте използването на вашите ресурси, за да осигурите навременно изпълнение на всички проекти.',
    image: FinanceInsurance
  },
  {
    label: 'Комуникация в екипа',
    content:
      'Нашите инструменти улесняват комуникацията между членовете на екипа, като подобряват ефективността и сътрудничеството.',
    image: BusinessPeopleDiscussing
  },
  {
    label: 'Анализи и отчети',
    content:
      'Получавайте детайлни отчети и анализи за напредъка на проектите, което ще ви помогне да вземате по-добри решения.',
    image: BusinessmanExplainingStrategy
  },
  {
    label: 'Интеграция с други системи',
    content:
      'Лесна интеграция с други популярни системи за управление, за да създадете пълноценна екосистема за вашите нужди.',
    image: ManDevelopingSite
  }
];

export const HeroBanner = () => {
  // State for dynamic text content on the right side
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [selectedContent, setSelectedContent] = useState(
    contentOptions[0].content
  );

  // State for dynamic image
  const [selectedImage, setSelectedImage] = useState(BusinessPresentation);

  return (
    <div className="my-12 mx-auto max-w-6xl rounded-2xl shadow-lg bg-theme-light-background dark:bg-theme-dark-background">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="p-8">
          {/* Title */}
          <h3 className="text-3xl font-bold text-theme-light-primary dark:text-theme-dark-primary tracking-wide mb-2">
            Управление на Проекти
          </h3>

          {/* Subtitle */}
          <p className="text-lg text-theme-light-tertiary dark:text-theme-dark-tertiary mb-4">
            Управлявайте вашите проекти ефективно и лесно
          </p>

          {/* Price */}
          <h4 className="text-2xl font-bold text-theme-light-primary dark:text-theme-dark-primary mb-2">
            Получавате безплатно
          </h4>

          {/* CTA Button */}
          <Link
            href="/api/auth/login"
            className="block w-fit mb-4 px-6 py-3 rounded-lg bg-theme-light-primary text-white shadow-md transition-transform transform hover:scale-105 hover:bg-theme-light-secondary dark:bg-theme-dark-primary dark:hover:bg-theme-dark-secondary"
          >
            Запазете демо
          </Link>

          {/* List of clickable options */}
          <ul className="list-none p-0">
            {contentOptions.map((option, index) => (
              <li key={index}>
                <button
                  className={`w-full text-left py-2 px-4 transition-all duration-300 border-l-2 ${
                    selectedOptionIndex === index
                      ? 'border-theme-light-primary text-theme-light-primary dark:border-theme-dark-primary dark:text-theme-dark-primary'
                      : 'border-theme-light-secondary text-theme-light-tertiary dark:border-theme-dark-secondary dark:text-theme-dark-tertiary'
                  }`}
                  onClick={() => {
                    setSelectedContent(option.content);
                    setSelectedImage(option.image);
                    setSelectedOptionIndex(index); // Track the selected option
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="bg-theme-light-quaternary dark:bg-theme-dark-quaternary rounded-2xl flex flex-col justify-center items-center p-8">
          {/* Dynamic Image */}
          <Image
            src={selectedImage}
            alt="Project Management Image"
            className="mb-3 h-auto"
            width={300}
            height={300}
          />
          {/* Dynamic Text */}
          <p className="text-center text-theme-light-primary dark:text-theme-dark-primary">
            {selectedContent}
          </p>
        </div>
      </div>
    </div>
  );
};
