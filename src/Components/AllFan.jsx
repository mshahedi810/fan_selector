import { GiComputerFan } from "react-icons/gi";

const AllFan = ({onNavigate, fan}) => (
    <>
    <div className={`relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border ${isSelectedForCompare ? 'ring-2 ring-red-400' : 'border-blue-200'}`}>
    
    {/* تصویر با overlay کوچک روی hover */}
    <div className="relative group">
      <img
        src={fan.imageUrl}
        alt={fan.model}
        className="w-full h-56 sm:h-52 lg:h-60 object-cover transition-transform duration-300 group-hover:scale-105"
      />
     
    </div>

    <div className="p-4 flex flex-col flex-grow">
      {/* عنوان محصول با gradient و shadow */}
      <h3 className="relative text-lg font-extrabold mb-3 px-4 py-2 rounded-xl text-white
  bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg inline-block
  before:absolute before:inset-0 before:bg-white/20 before:rounded-xl before:-z-10
  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
  {fan.model}
</h3>

      {/* برند و نوع */}
      <p className="flex items-center text-sm text-slate-700 mb-3 font-semibold gap-2">
        <GiComputerFan className='text-lime-700' size={28} />
        {fan.manufacturer} • {fan.type}
      </p>

      {/* توضیحات */}
      <p className="text-xs text-justify text-slate-700 mb-4 line-clamp-3 leading-relaxed">
        {fan.description}
      </p>

      {/* Info boxes */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
        <div className="flex flex-col items-center bg-blue-100 p-2 rounded-md hover:bg-blue-200 transition-colors shadow-inner">
          <div className="font-semibold text-blue-700 flex items-center gap-1">💨 دبی هوا</div>
          <div className="text-blue-600">{fan.maxAirflow.toLocaleString('fa-IR')} m³/h</div>
        </div>

        <div className="flex flex-col items-center bg-purple-100 p-2 rounded-md hover:bg-purple-200 transition-colors shadow-inner">
          <div className="font-semibold text-purple-700 flex items-center gap-1">⚡ فشار استاتیک</div>
          <div className="text-purple-600">{fan.maxStaticPressure.toLocaleString('fa-IR')} Pa</div>
        </div>
      </div>
    </div>

    {/* دکمه‌ها */}
    <div className="px-4 pb-4 flex flex-col sm:flex-row sm:flex-wrap gap-3">
      {/* دکمه اصلی */}
      <button
        onClick={onSelect}
        className="flex-auto py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200 text-sm text-center"
      >
        مشاهده جزئیات
      </button>
    </div>
  </div>

  <button
        onClick={() => onNavigate('home')}
        className="mt-6 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all"
      >
        بازگشت به صفحه اصلی
      </button>
    </>
  
);

export default AllFan
