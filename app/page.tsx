import Link from "next/link";
import VerifyEmailModal from "./verificationPage";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from "./api/auth/[auth0]/types";
import { fetchData } from "./utils/fetchData";

export default async function HomePage() {
  const session = await getSession();

  let user: User | null = null;
  if (session) {
    const { accessToken } = session;

    try {
      const response = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        user = await response.json();

        if (user?.email_verified) {
          // Check if user already exists
          const userExistsResponse = await fetchData(
            `/api/profile?sub=${user.sub}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!userExistsResponse.data) {
            // User does not exist, proceed with POST request
            await fetchData("/api/profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user info or checking existence:", error);
    }
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {user && user.email_verified && <VerifyEmailModal user={user} />}

      <header className="text-center my-12 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Добре дошли в нашето приложение за управление на бизнес
        </h1>
        <p className="text-2xl mt-6 text-gray-600">
          Оптимизирайте бизнес операциите си с лекота
        </p>
        {!user && (
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="/api/auth/login"
              className="px-4 py-2 uppercase font-bold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Вход
            </a>
          </div>
        )}
      </header>

      <section className="my-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-gray-800">
          За нашето приложение
        </h2>
        <p className="mt-6 text-xl text-gray-700">
          Нашето приложение е създадено, за да помогне на бизнеса да управлява
          своите операции ефективно. С функции като създаване на оферти,
          фактуриране, съхранение на продукти и управление на клиентска база
          данни, можете да се справите с всички нужди на вашия бизнес на едно
          място.
        </p>
      </section>

      <section className="my-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-gray-800">Функции</h2>
        <ul className="list-disc list-inside mt-6 text-xl text-gray-700 space-y-4">
          <li>Създаване и управление на оферти</li>
          <li>Генериране и проследяване на фактури</li>
          <li>Поддържане на обширно продуктово съхранение</li>
          <li>Ефективно управление на клиентската информация</li>
        </ul>
      </section>

      <section className="my-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-gray-800">Започнете сега</h2>
        <p className="mt-6 text-xl text-gray-700">
          Готови ли сте да оптимизирате бизнес операциите си? Разгледайте
          различните секции на нашето приложение:
        </p>
        <nav className="mt-6">
          <ul className="list-none text-lg space-y-4">
            <li className="group">
              <Link
                href="/create/offer"
                className="block p-4 bg-gray-200 rounded-lg shadow-md transition transform hover:bg-gray-300 hover:scale-105"
              >
                <span className="text-gray-800 group-hover:text-gray-900 font-medium">
                  Оферти
                </span>
              </Link>
            </li>
            <li className="group">
              <Link
                href="/create/invoice"
                className="block p-4 bg-gray-200 rounded-lg shadow-md transition transform hover:bg-gray-300 hover:scale-105"
              >
                <span className="text-gray-800 group-hover:text-gray-900 font-medium">
                  Фактури
                </span>
              </Link>
            </li>
            <li className="group">
              <Link
                href="/store"
                className="block p-4 bg-gray-200 rounded-lg shadow-md transition transform hover:bg-gray-300 hover:scale-105"
              >
                <span className="text-gray-800 group-hover:text-gray-900 font-medium">
                  Продуктово Съхранение
                </span>
              </Link>
            </li>
            <li className="group">
              <Link
                href="/clients"
                className="block p-4 bg-gray-200 rounded-lg shadow-md transition transform hover:bg-gray-300 hover:scale-105"
              >
                <span className="text-gray-800 group-hover:text-gray-900 font-medium">
                  Клиенти
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}
