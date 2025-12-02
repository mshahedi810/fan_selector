// import کتابخانه‌های React
import { useState, useEffect } from "react";

// import کامپوننت‌های پروژه
import CustomerPortal from './Components/CustomerPortal';
import AdminDashboard from './Components/AdminDashboard';
import Home from './Components/Home';
import AdminLogin from './Components/AdminLogin';
import Header from './Components/Header';
import AboutUs from './Components/AboutUs'

// import دیتا اولیه فن‌ها
import { FANS_DATA } from './data/fans'; 
import AllCard from "./Components/AllFan";

// کامپوننت اصلی برنامه
const App = () => {
  // 🔹 state برای کنترل view فعلی ('home', 'customer', 'admin', 'login')
  const [view, setView] = useState('home');

  // 🔹 state برای نگهداری لیست فن‌ها
  const [fans, setFans] = useState(FANS_DATA);

  // 🔹 state برای وضعیت ورود ادمین
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 بررسی وضعیت ورود ادمین از localStorage هنگام mount شدن کامپوننت
  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(logged);
  }, []);

  // 🔹 تابعی که بعد از ورود موفق ادمین اجرا می‌شود
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);                     // بروزرسانی state ورود
    localStorage.setItem("adminLoggedIn", "true"); // ذخیره وضعیت ورود در localStorage
    setView("admin");                        // تغییر view به صفحه admin
  };

  // 🔹 تابع خروج ادمین
  const handleLogout = () => {
    setIsLoggedIn(false);                   // بروزرسانی state ورود
    localStorage.removeItem("adminLoggedIn"); // پاک کردن وضعیت ورود از localStorage
    setView("home");                         // بازگشت به صفحه home
  };

  // 🔹 مدیریت بروزرسانی فن‌ها
  const handleUpdateFan = (updatedFan) => {
    setFans(prevFans => prevFans.map(fan => fan.id === updatedFan.id ? updatedFan : fan));
  };

  // 🔹 اضافه کردن یک فن جدید
  const handleAddFan = (newFan) => {
    const fanWithId = { ...newFan, id: Date.now() }; // ساخت id منحصر به فرد با Date.now()
    setFans(prevFans => [...prevFans, fanWithId]);   // اضافه کردن به لیست فن‌ها
  };

  // 🔹 اضافه کردن چند فن به صورت batch
  const handleAddFansBatch = (newFans) => {
    const fansWithIds = newFans.map((fan, index) => ({ ...fan, id: Date.now() + index }));
    setFans(prevFans => [...prevFans, ...fansWithIds]);
  };

  // 🔹 حذف یک فن
  const handleDeleteFan = (fanId) => {
    setFans(prevFans => prevFans.filter(fan => fan.id !== fanId));
  };

  // 🔹 تابعی برای رندر کردن محتوای صفحه بسته به view
  const renderContent = () => {
    switch (view) {
      case 'customer':
        // نمایش صفحه CustomerPortal و ارسال دیتا فن‌ها
        return <CustomerPortal fans={fans} />;
      case 'allfan':
        return <AllCard onNavigate={setView} fans={fans} />   
      case 'aboutus':
        return <AboutUs onNavigate={setView} FANS_DATA  />  
      case 'admin':
        // اگر ادمین وارد شده، AdminDashboard نمایش داده می‌شود
        return isLoggedIn 
          ? <AdminDashboard 
              fans={fans}                     // ارسال لیست فن‌ها
              onAddFan={handleAddFan}          // تابع اضافه کردن فن
              onUpdateFan={handleUpdateFan}    // تابع بروزرسانی فن
              onDeleteFan={handleDeleteFan}    // تابع حذف فن
              onAddFansBatch={handleAddFansBatch} // تابع اضافه کردن چند فن
              onLogout={handleLogout}          // تابع خروج ادمین
            />
          // اگر وارد نشده باشد، صفحه Login نمایش داده می‌شود
          : <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      case 'login':
        // نمایش صفحه ورود ادمین
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      case 'home':
      default:
        // نمایش صفحه اصلی Home
        return <Home onNavigate={setView} />;
    }
  };

  // 🔹 رندر اصلی برنامه
  return (
    <div className="bg-blue-500 min-h-screen text-slate-800 flex flex-col justify-center w-full ">
      {/* Header با قابلیت نمایش دکمه Home در صورت لزوم */}
      <Header showHomeButton={view !== 'home'} onGoHome={() => setView('home')} onNavigate={setView} />

      {/* بخش اصلی محتوا */}
      <main className="w-full p-4 md:p-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-slate-500 text-sm no-print">
        <p className='text-yellow-50'>
          طراحی شده توسط مهندس ارشد فرانت‌اند با تخصص در React و Gemini API
        </p>
      </footer>
    </div>
  );
};
 
export default App;
