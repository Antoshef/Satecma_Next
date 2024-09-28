import Link from 'next/link';
import dynamic from 'next/dynamic';
import './styles.css';

const Lottie = dynamic(() => import('./Lottie'), { ssr: false });

export async function Header() {
  return (
    <header className="relative dash-background w-full h-[80vh] flex items-center justify-around p-4 bg-theme-light-background dark:bg-theme-dark-background">
      {/* Left-side content */}
      <div className="relative z-10 max-w-2xl text-theme-light-primary dark:text-theme-dark-primary p-4">
        <p className="text-8xl text-theme-light-white">ОРГАНИЗАТОР.БГ</p>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-theme-light-quaternary to-theme-light-danger bg-clip-text text-transparent dark:from-theme-dark-primary dark:to-theme-dark-secondary">
          Професионално приложение за управление на вашия бизнес
        </h1>
        <p className="mt-2 text-lg md:text-xl text-theme-light-white bg-gradient-to-r from-theme-light-primary to-theme-light-secondary bg-clip-text dark:text-theme-dark-tertiary dark:from-theme-dark-primary dark:to-theme-dark-secondary">
          Оптимизирайте бизнес операциите си с лекота
        </p>

        {/* Buttons for Sign Up and Book a Demo */}
        <div className="mt-4 flex gap-2">
          <button className="bg-theme-light-quaternary px-8 py-2 rounded-lg text-theme-light-primary text-lg dark:bg-theme-dark-primary hover:bg-theme-light-primary hover:text-theme-light-white dark:hover:bg-theme-dark-secondary dark:hover:text-theme-dark-primary">
            <Link href="/api/auth/login">Вход</Link>
          </button>
          <button className="border border-theme-light-white text-theme-light-white px-8 py-2 rounded-lg text-lg dark:border-theme-dark-primary dark:text-theme-dark-primary hover:bg-theme-light-white hover:text-theme-light-secondary dark:hover:bg-theme-dark-secondary dark:hover:text-theme-dark-primary">
            <Link href="">Виж Демо</Link>
          </button>
        </div>
      </div>

      {/* Right-side image */}
      <div className="hidden md:block relative z-10 w-2/5 h-full">
        <div className="absolute">
          <Lottie />
        </div>
      </div>
    </header>
  );
}
