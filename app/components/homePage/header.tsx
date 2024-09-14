import Image from "next/image";

export const Header = () => (
  <header className="relative w-full h-[80vh] flex items-center justify-between p-4">
    {/* Background Image */}
    <Image
      src="/header-bg.jpg"
      alt="Business Management App Background"
      fill
      quality={100}
      className="z-0 w-full h-full object-cover"
    />

    {/* Left-side content */}
    <div className="relative z-10 max-w-full md:max-w-1/2 text-white backdrop-blur-lg rounded-lg p-4">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-black to-pink-500 bg-clip-text text-transparent">
        Добре дошли в нашето приложение за управление на бизнес
      </h1>
      <p className="mt-2 text-lg md:text-xl text-gray-300 bg-gradient-to-r from-black to-pink-500 bg-clip-text text-transparent">
        Оптимизирайте бизнес операциите си с лекота
      </p>

      {/* Buttons for Sign Up and Book a Demo */}
      <div className="mt-4 flex gap-2">
        <button className="bg-blue-600 px-4 py-1.5 rounded-lg text-white text-lg">
          Вход
        </button>
        <button className="border border-white text-white px-4 py-1.5 rounded-lg text-lg hover:border-blue-600">
          Виж Демо
        </button>
      </div>

      {/* Awards/Badges section */}
      {/* <div className="flex mt-6 gap-2 flex-wrap">
        <Image src={Badge} alt="Badge" width={200} height={200} />
        <Image
          src="/award2.png"
          alt="Award 2"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/award3.png"
          alt="Award 3"
          width={100}
          height={100}
          className="object-contain"
        />
      </div> */}
    </div>

    {/* Right-side image */}
    {/* <div className="hidden md:block relative z-10 w-2/5 h-auto">
      <Image
        src="/girl-transparent.png" // Add the right-side image you want here
        alt="girl image"
        layout="responsive"
        width={500}
        height={500}
        className="object-contain"
      />
    </div> */}
  </header>
);
