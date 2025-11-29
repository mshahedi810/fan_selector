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
  const [view, setView] = useState('home');
  const [fans, setFans] = useState(FANS_DATA);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // بررسی وضعیت ورود ادمین از localStorage هنگام mount شدن کامپوننت
  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(logged);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("adminLoggedIn", "true");
    setView("admin");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    setView("home");
  };

  // فانکشن های مدیریت فن‌ها 
  const handleUpdateFan = (updatedFan) => {
    setFans(prevFans => prevFans.map(fan => fan.id === updatedFan.id ? updatedFan : fan));
  };

  const handleAddFan = (newFan) => {
    const fanWithId = { ...newFan, id: Date.now() };
    setFans(prevFans => [...prevFans, fanWithId]);
  };

  const handleAddFansBatch = (newFans) => {
    const fansWithIds = newFans.map((fan, index) => ({ ...fan, id: Date.now() + index }));
    setFans(prevFans => [...prevFans, ...fansWithIds]);
  };

  const handleDeleteFan = (fanId) => {
    setFans(prevFans => prevFans.filter(fan => fan.id !== fanId));
  };

  // تابع رندر کردن محتوای صفحه بسته به view
  const renderContent = () => {
    switch (view) {
      case 'customer':
        return <CustomerPortal fans={fans} />;
      case 'allfan':
        return <AllCard onNavigate={setView} fans={fans} />;
      case 'aboutus':
        return <AboutUs onNavigate={setView} FANS_DATA />;
      case 'admin':
        return isLoggedIn 
          ? <AdminDashboard 
              fans={fans}
              onAddFan={handleAddFan}
              onUpdateFan={handleUpdateFan}
              onDeleteFan={handleDeleteFan}
              onAddFansBatch={handleAddFansBatch}
              onLogout={handleLogout} 
            />
          : <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      case 'login':
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      case 'home':
      default:
        return <Home onNavigate={setView} />;
    }
  };

  // رندر اصلی برنامه
  return (
    <div className="bg-blue-500 min-h-screen text-slate-800 flex flex-col justify-center w-full ">
      <Header showHomeButton={view !== 'home'} onGoHome={() => setView('home')} onNavigate={setView} />
      <main className="w-full p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm no-print">
        <p className='text-yellow-50'>
          طراحی شده توسط مهندس ارشد فرانت‌اند با تخصص در React و Gemini API
        </p>
      </footer>
    </div>
  );
};

export default App;
