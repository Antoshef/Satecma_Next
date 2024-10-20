import './styles.css';
import { HeaderActions } from './headerActions';

export async function Header() {
  return (
    <header className="pl-4 md:pl-12 relative dash-background w-full h-[80vh] flex items-center p-4 bg-theme-light-background dark:bg-theme-dark-background">
      {/* Left-side content */}
      <div className="relative z-10 max-w-full md:max-w-2xl text-theme-light-primary dark:text-theme-dark-primary p-4 md:p-8 lg:p-12">
        <p className="text-4xl lg:text-8xl text-theme-light-white">
          ОРГАНИЗАТОР.БГ
        </p>
        <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-theme-light-quaternary to-theme-light-danger bg-clip-text text-transparent dark:from-theme-dark-primary dark:to-theme-dark-secondary">
          Професионално приложение за управление на вашия бизнес
        </h1>
        <p className="mt-2 text-base md:text-xl text-theme-light-white bg-gradient-to-r from-theme-light-primary to-theme-light-secondary bg-clip-text dark:text-theme-dark-tertiary dark:from-theme-dark-primary dark:to-theme-dark-secondary">
          Оптимизирайте бизнес операциите си с лекота
        </p>

        {/* Buttons for Sign Up and Book a Demo */}
        <HeaderActions />
      </div>

      {/* Right-side image */}
      {/* <div className="hidden md:block relative z-10 w-2/5 h-full">
        <div className="absolute top-48">
          <Lottie />
        </div>
      </div> */}
    </header>
  );
}
