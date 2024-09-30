'use client';

import React, { useEffect, useState, useRef } from 'react';

interface DashedLineIconProps {
  Icon: React.FC<{ isActive?: boolean }>;
  isActive: boolean;
  disableLine: boolean;
  item: {
    primary: string;
    secondary: string;
  };
  index: number;
  listItemRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

export const DashedLineIcon: React.FC<DashedLineIconProps> = ({
  Icon,
  isActive,
  disableLine,
  item,
  index,
  listItemRefs
}) => {
  const lineRef = useRef<HTMLSpanElement>(null);
  const [solidHeight, setSolidHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = lineRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const middleOfScreen = window.innerHeight / 2;

      if (rect.top < middleOfScreen) {
        const percentageSolid =
          ((middleOfScreen - rect.top) / rect.height) * 100;
        setSolidHeight(Math.min(percentageSolid, 100)); // Grow the solid line up to 100%
      } else {
        setSolidHeight(0); // Keep it 0% below the middle of the screen
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <li
      ref={(el) => {
        listItemRefs.current[index] = el;
        return undefined;
      }}
      className="flex items-start gap-2 py-0"
    >
      <div className="flex flex-col items-center relative h-32">
        <Icon isActive={isActive} />

        {/* Dashed and Solid Line */}
        {!disableLine && (
          <>
            {/* Dashed Line */}
            <span className="absolute top-10 left-1/2 transform -translate-x-1/2 border-l border-dashed border-theme-light-primary dark:border-theme-dark-primary opacity-50 h-20" />

            {/* Solid Line - Height changes dynamically */}
            <span
              ref={lineRef}
              className="absolute top-10 left-1/2 transform -translate-x-1/2 border-l border-solid border-theme-light-primary dark:border-theme-dark-primary transition-all ease-linear"
              style={{ height: `${solidHeight}%`, maxHeight: '80px' }} // Dynamic height for the solid line
            />
          </>
        )}
      </div>
      <div>
        <p className="text-theme-light-primary dark:text-theme-dark-primary">
          {item.primary}
        </p>
        <p className="text-theme-light-secondary dark:text-theme-dark-tertiary">
          {item.secondary}
        </p>
      </div>
    </li>
  );
};
