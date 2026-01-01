"use client";

import { useEffect, useState, useRef } from "react";
import FanForm from "./FanForm.jsx";

export default function AdminDashboard({ onAddFan, onUpdateFan, onDeleteFan }) {
  const [fans, setFans] = useState([]);
  const [filteredFans, setFilteredFans] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFan, setEditingFan] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  // Fetch data from API
  const fetchFans = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/fans/variants");
      if (!res.ok) throw new Error("Failed to fetch fans");
      const data = await res.json();
      setFans(data);
      setFilteredFans(data);
    } catch (err) {
      console.error("Failed to fetch fans", err);
    }
  };

  useEffect(() => {
    fetchFans();
  }, []);

  // Search / filter
  useEffect(() => {
    if (!searchQuery) {
      setFilteredFans(fans);
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = fans.filter(
        (fan) =>
          fan.variantName?.toLowerCase().includes(q) ||
          fan.fanSeries?.type?.toLowerCase().includes(q)
      );
      setFilteredFans(filtered);
    }
  }, [searchQuery, fans]);

  const handleAddNew = () => {
    setEditingFan(null);
    setIsFormOpen(true);
  };

  const handleEdit = (fan) => {
    setEditingFan(fan);
    setIsFormOpen(true);
  };

  const handleDelete = (fanId) => {
    if (window.confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      onDeleteFan(fanId);
    }
  };

  const handleFormSubmit = (fanData) => {
    if (fanData._id) onUpdateFan(fanData);
    else onAddFan(fanData);

    setIsFormOpen(false);
    fetchFans();
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg text-white min-h-screen">
      {/* هدر و دکمه‌ها */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">مدیریت محصولات</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md shadow-md font-semibold"
          >
            افزودن فن جدید
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md shadow-md font-semibold"
          >
            ورود از اکسل
          </button>
          <input type="file" ref={fileInputRef} className="hidden" />
        </div>
      </div>

      {/* جستجو */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجو بر اساس نام یا نوع فن..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-md bg-gray-700 border border-gray-400 text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:ring focus:ring-cyan-300 focus:ring-opacity-50 w-full md:w-64"
        />
      </div>

      {/* جدول دسکتاپ */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-right px-4 py-2">نام واریانت</th>
              <th className="text-right px-4 py-2">سازنده</th>
              <th className="text-right px-4 py-2">نوع</th>
              <th className="text-right px-4 py-2">حداکثر دبی</th>
              <th className="text-center px-4 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredFans.map((fan) => (
              <tr key={fan._id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                <td className="text-right px-4 py-2">{fan.variantName}</td>
                <td className="text-right px-4 py-2">{fan.fanSeries?.manufacturer || "-"}</td>
                <td className="text-right px-4 py-2">{fan.fanSeries?.type || "-"}</td>
                <td className="text-right px-4 py-2">{fan.maxAirflow?.toLocaleString("fa-IR") || "-"} m³/h</td>
                <td className="text-center px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(fan)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-white px-2 py-1 rounded-md text-sm"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(fan._id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* کارت موبایل */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredFans.map((fan) => (
          <div key={fan._id} className="bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={fan.fanSeries?.imageUrl || "https://picsum.photos/seed/fan/60/60"}
                alt={fan.variantName}
                className="w-16 h-16 rounded-full object-cover border border-gray-700"
              />
              <div className="flex flex-col flex-1">
                <span className="font-bold">{fan.variantName}</span>
                <span className="text-gray-300 text-sm">{fan.fanSeries?.manufacturer}</span>
                <span className="text-gray-400 text-sm">{fan.fanSeries?.type}</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-300">{fan.maxAirflow?.toLocaleString("fa-IR")} m³/h</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(fan)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-white px-2 py-1 rounded-md text-sm"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(fan._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* فرم */}
      {isFormOpen && (
        <FanForm
          fanToEdit={editingFan}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
