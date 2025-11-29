const AboutUs = ({ onNavigate }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">درباره ما</h2>
      <p className="text-white/80">
        توضیحاتی درباره شرکت و تیم ما ...
      </p>
      <button
        onClick={() => onNavigate('home')}
        className="mt-6 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
};

export default AboutUs
