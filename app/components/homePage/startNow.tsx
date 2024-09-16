import Link from 'next/link';

export const StartNow = () => {
  return (
    <div className="my-12 p-8 rounded-lg shadow-lg bg-theme-light-background dark:bg-theme-dark-background max-w-7xl mx-auto">
      <h2 className="font-bold text-theme-light-primary dark:text-theme-dark-primary tracking-wide text-center">
        Започнете сега
      </h2>

      <p className="mt-6 text-lg text-theme-light-secondary dark:text-theme-dark-tertiary text-center leading-relaxed">
        Готови ли сте да оптимизирате бизнес операциите си? Разгледайте
        различните секции на нашето приложение:
      </p>

      <nav className="mt-8">
        <ul className="list-none p-0">
          {[
            { href: '/create/offer', text: 'Оферти' },
            { href: '/create/invoice', text: 'Фактури' },
            { href: '/store', text: 'Продуктово Съхранение' },
            { href: '/clients', text: 'Клиенти' }
          ].map((item, index) => (
            <li key={index} className="mb-3">
              <Link
                href={item.href}
                passHref
                className="block w-full p-2 rounded-lg bg-theme-light-primary bg-gradient-to-br from-theme-light-primary to-theme-light-secondary text-white shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:from-theme-light-secondary hover:to-theme-light-primary dark:bg-theme-dark-primary dark:from-theme-dark-primary dark:to-theme-dark-secondary dark:hover:from-theme-dark-secondary dark:hover:to-theme-dark-primary"
              >
                <span className="font-medium text-base tracking-wide">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
