import Link from "next/link";

export const StartNow = () => {
  return (
    <div className="my-12 p-8 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-white max-w-6xl mx-auto">
      <h2 className="font-bold text-primary tracking-wide text-center">
        Започнете сега
      </h2>

      <p className="mt-6 text-lg text-secondary text-center leading-relaxed">
        Готови ли сте да оптимизирате бизнес операциите си? Разгледайте
        различните секции на нашето приложение:
      </p>

      <nav className="mt-8">
        <ul className="list-none p-0">
          {[
            { href: "/create/offer", text: "Оферти" },
            { href: "/create/invoice", text: "Фактури" },
            { href: "/store", text: "Продуктово Съхранение" },
            { href: "/clients", text: "Клиенти" },
          ].map((item, index) => (
            <li key={index} className="mb-3">
              <Link
                href={item.href}
                passHref
                className="block w-full p-2 rounded-lg bg-blue-500 bg-gradient-to-br from-blue-500 to-blue-900 text-white shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:from-blue-900 hover:to-blue-500"
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
