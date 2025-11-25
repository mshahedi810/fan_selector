import React, { useState } from 'react'
import fans from '../data/fans'

export default function AddFan() {
    const [fansData,setFansData] = useState(fans)
  return (
    <div>
        <form className="space-y-6">
  
  {/* اطلاعات پایه */}
  <section className="grid grid-cols-2 gap-4">
    <input className="input" placeholder="مدل (model)" />
    <input className="input" placeholder="نوع (type)" />
    <input className="input" placeholder="تولیدکننده (manufacturer)" />
    <input className="input" placeholder="آدرس تصویر (imageUrl)" />
    <textarea className="input col-span-2" placeholder="توضیحات محصول"></textarea>
    <input type="number" className="input" placeholder="قیمت (تومان)" />
  </section>

  {/* مشخصات عملکردی */}
  <section className="grid grid-cols-3 gap-4">
    <input type="number" className="input" placeholder="Max Airflow (m3/h)" />
    <input type="number" className="input" placeholder="Max Static Pressure (Pa)" />
    <input type="number" className="input" placeholder="Power Consumption (kW)" />
    <input type="number" className="input" placeholder="Motor RPM" />
    <input type="number" className="input" placeholder="Noise Level (dB)" />
  </section>

  {/* دما */}
  <section className="grid grid-cols-2 gap-4">
    <input type="number" className="input" placeholder="Min Temp (°C)" />
    <input type="number" className="input" placeholder="Max Temp (°C)" />
  </section>

  {/* نوع سیال */}
  <div className="space-y-2">
    <label>نوع سیال:</label>
    <div className="flex gap-4">
      <label><input type="checkbox" /> هوای تمیز</label>
      <label><input type="checkbox" /> هوای دارای گرد و غبار</label>
      <label><input type="checkbox" /> دود</label>
      <label><input type="checkbox" /> هوای چرب</label>
      <label><input type="checkbox" /> گازهای قابل اشتعال</label>
    </div>
  </div>

  {/* مشخصات الکتریکی */}
  <section className="grid grid-cols-3 gap-4">
    <input className="input" placeholder="Voltage" />
    <input className="input" placeholder="Phase" />
    <input className="input" placeholder="Frequency" />
  </section>

  {/* ابعاد */}
  <section className="grid grid-cols-3 gap-4">
    <input className="input" placeholder="Height (mm)" />
    <input className="input" placeholder="Width (mm)" />
    <input className="input" placeholder="Depth (mm)" />
  </section>

  {/* منحنی عملکرد */}
  <section>
    <h3 className="font-bold text-lg mb-2">نقاط منحنی عملکرد</h3>

    {/* رندر نقاط */}
    {performance.map((row, index) => (
      <div key={index} className="grid grid-cols-5 gap-4 mb-2">
        <input className="input" placeholder="Airflow (m3/h)" />
        <input className="input" placeholder="Static Pressure (Pa)" />
        <input className="input" placeholder="Power (kW)" />
        <input className="input" placeholder="Efficiency (%)" />
        <button className="bg-red-500 text-white px-4">حذف</button>
      </div>
    ))}

    <button className="bg-blue-600 text-white px-4 mt-2">➕ افزودن نقطه</button>
  </section>

  <button className="bg-green-600 text-white py-2 px-6 rounded">ثبت محصول</button>
</form>

    </div>
  )
}
