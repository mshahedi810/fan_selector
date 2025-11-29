<<<<<<< HEAD
import React from "react";

const Header = ({ onNavigate }) => {
  return (
    <header className="relative w-full bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 shadow-xl overflow-hidden">
      
      {/* نور پس‌زمینه افکت شیشه‌ای */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-5 md:py-7">

        {/* لوگو */}
        <div className="flex items-center gap-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-white/40">
            <img
              src="./images/ftpe.png"
              alt="Logo"
              className="w-12 h-12 md:w-16 md:h-16 rounded-xl"
            />
          </div>

          <h1 className="text-white text-xl md:text-3xl font-extrabold drop-shadow-lg tracking-wide">
            فن‌آوران تهویه پیام
          </h1>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex gap-4 lg:gap-6">
          
          <button
            className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 
            text-white font-semibold text-sm hover:bg-white/25 transition-all shadow-md"
          >
            محصولات
          </button>

          <button
            onClick={() => onNavigate("allfan")}
            className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 
            text-white font-semibold text-sm hover:bg-white/25 transition-all shadow-md"
          >
            تماس با ما
          </button>

          <button
            onClick={() => onNavigate("aboutus")}
            className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 
            text-white font-semibold text-sm hover:bg-white/25 transition-all shadow-md"
          >
            درباره ما
          </button>
        </nav>

        {/* دکمه منوی موبایل */}
        <div className="md:hidden text-white">
          <button className="focus:outline-none hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* تیتر اصلی */}
      <div className="relative text-center py-14 px-4 md:py-20">
        <h2 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
          انتخاب فن مناسب برای پروژه شما
        </h2>

        <p className="mt-4 text-white/90 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow">
          دقت، کارایی و کیفیت را یکجا تجربه کنید
        </p>

        <button
          onClick={() => onNavigate("home")}
          className="mt-8 px-6 py-3 bg-white/20 backdrop-blur-lg 
          border border-white/30 text-white rounded-xl shadow-lg
          hover:bg-white/30 transition-all"
        >
          بازگشت به صفحه اصلی
        </button>
=======
import React from 'react';

const Header = ({ showHomeButton, onGoHome }) => {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* لوگو + عنوان */}
        <div className="flex items-center gap-4">
          {/* آیکون لوگو */}
          <div className="bg-white p-2 rounded-full shadow-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-blue-600" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2C6.485 2 2 6.485 2 12C2 17.515 6.485 22 12 22C17.515 22 22 17.515 22 12C22 6.485 17.515 2 12 2ZM11.999 20C7.588 20 4 16.412 4 12C4 7.588 7.588 4 12 4C16.412 4 20 7.588 20 12C20 16.411 16.411 20 11.999 20Z" />
              <path d="M12 17.5C9.514 17.5 7.5 15.486 7.5 13C7.5 12.861 7.516 12.723 7.545 12.588C8.145 13.518 9.222 14.204 10.5 14.441V16.5C10.5 16.776 10.724 17 11 17H13C13.276 17 13.5 16.776 13.5 16.5V14.441C14.778 14.204 15.855 13.518 16.455 12.588C16.484 12.723 16.5 12.861 16.5 13C16.5 15.486 14.486 17.5 12 17.5Z" />
              <path d="M12 11.5C10.621 11.5 9.5 10.379 9.5 9C9.5 7.621 10.621 6.5 12 6.5C13.379 6.5 14.5 7.621 14.5 9C14.5 10.379 13.379 11.5 12 11.5Z" />
            </svg>
          </div>

          {/* عنوان و توضیح */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-300">
             انتخاب فن مناسب برای پروژه شما
            </h1>
            <p className="text-sm md:text-base text-white">
             با فن آوران تهویه پیام، بهترین فن‌ها را متناسب با نیاز و فضای خود پیدا کنید. دقت، کارایی و کیفیت را یکجا تجربه کنید.
            </p>
          </div>
        </div>

        {/* دکمه بازگشت */}
        {showHomeButton && (
          <button
            onClick={onGoHome}
            className="py-2 px-5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center gap-2 text-sm md:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l4.293 4.293a1 1 0 001.414-1.414l-7-7z" transform="rotate(-90 10 10)" />
            </svg>
            <span>بازگشت به صفحه اصلی</span>
          </button>
        )}

>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
      </div>
    </header>
  );
};

export default Header;
