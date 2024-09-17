export const Intro = () => {
  return (
    <div className="my-12 p-8 rounded-lg shadow-lg bg-theme-light-background dark:bg-theme-dark-background max-w-screen-2xl mx-auto">
      <h2 className="font-bold text-theme-light-primary dark:text-theme-dark-primary text-2xl md:text-3xl lg:text-4xl text-center tracking-wide">
        За нашето приложение
      </h2>
      <p className="mt-6 text-lg md:text-xl text-theme-light-secondary dark:text-theme-dark-tertiary text-center leading-relaxed">
        Нашето приложение е създадено, за да помогне на бизнеса да управлява
        своите операции ефективно. С функции като създаване на оферти,
        фактуриране, съхранение на продукти и управление на клиентска база
        данни, можете да се справите с всички нужди на вашия бизнес на едно
        място.
      </p>
    </div>
  );
};
