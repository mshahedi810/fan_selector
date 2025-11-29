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
      </div>
    </header>
  );
};

export default Header;
