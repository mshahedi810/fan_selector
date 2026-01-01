"use client";

import { useState, useEffect } from "react";
import PerformanceCurveChart from "./PerformanceCurveChart";

export default function FanForm({ fanToEdit, onSubmit, onCancel }) {
  const defaultCurve = [
    { airflow: 0, staticPressure: 1200, power: 1.5, efficiency: 0 },
    { airflow: 2000, staticPressure: 1000, power: 1.6, efficiency: 0 },
    { airflow: 4000, staticPressure: 800,  power: 1.8, efficiency: 0 },
    { airflow: 6000, staticPressure: 550,  power: 2.1, efficiency: 0 },
    { airflow: 8000, staticPressure: 300,  power: 2.4, efficiency: 0 },
  ];

  const [formData, setFormData] = useState({
    variantName: "",
    impellerDia: "",
    powerConsumption: "",
    motorRpm: "",
    maxAirflow: "",
    noiseLevel: "",
    price: "",
    performanceCurve: defaultCurve,
  });

  useEffect(() => {
    if (fanToEdit) {
      setFormData({
        variantName: fanToEdit.variantName || "",
        impellerDia: fanToEdit.impellerDia || "",
        powerConsumption: fanToEdit.powerConsumption || "",
        motorRpm: fanToEdit.motorRpm || "",
        maxAirflow: fanToEdit.maxAirflow || "",
        noiseLevel: fanToEdit.noiseLevel || "",
        price: fanToEdit.price || "",
        performanceCurve: fanToEdit.performanceCurve?.length
          ? fanToEdit.performanceCurve.map(p => ({ ...p })) // clone to avoid read-only errors
          : defaultCurve,
      });
    }
  }, [fanToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCurveChange = (index, field, value) => {
    setFormData(prev => {
      const updatedCurve = prev.performanceCurve.map((p, i) =>
        i === index ? { ...p, [field]: Number(value) || 0 } : p
      );
      return { ...prev, performanceCurve: updatedCurve };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...fanToEdit,
      ...formData,
      impellerDia: Number(formData.impellerDia) || null,
      powerConsumption: Number(formData.powerConsumption) || null,
      motorRpm: Number(formData.motorRpm) || null,
      maxAirflow: Number(formData.maxAirflow) || null,
      noiseLevel: Number(formData.noiseLevel) || null,
      price: Number(formData.price) || null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white w-full max-w-4xl rounded-xl p-6 space-y-6 overflow-y-auto max-h-[90vh]"
      >
        <h3 className="text-xl font-bold text-cyan-400">
          {fanToEdit ? "ویرایش فن" : "افزودن فن جدید"}
        </h3>

        {/* اطلاعات اصلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="نام واریانت" name="variantName" value={formData.variantName} onChange={handleChange} required />
          <Input label="قطر پروانه (mm)" name="impellerDia" value={formData.impellerDia} onChange={handleChange} />
          <Input label="توان (kW)" name="powerConsumption" value={formData.powerConsumption} onChange={handleChange} />
          <Input label="دور موتور (RPM)" name="motorRpm" value={formData.motorRpm} onChange={handleChange} />
          <Input label="حداکثر دبی (m³/h)" name="maxAirflow" value={formData.maxAirflow} onChange={handleChange} />
          <Input label="سطح صدا (dB)" name="noiseLevel" value={formData.noiseLevel} onChange={handleChange} />
          <Input label="قیمت" name="price" value={formData.price} onChange={handleChange} />
        </div>

        {/* Performance Curve ویرایش‌پذیر */}
        <div>
          <h4 className="text-cyan-400 font-semibold mb-2">Performance Curve</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-2">Airflow</th>
                  <th className="p-2">Static Pressure</th>
                  <th className="p-2">Power</th>
                  <th className="p-2">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {formData.performanceCurve.map((p, i) => (
                  <tr key={i} className="border-t border-gray-700 text-center">
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.airflow}
                        onChange={(e) => handleCurveChange(i, "airflow", e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.staticPressure}
                        onChange={(e) => handleCurveChange(i, "staticPressure", e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.power}
                        onChange={(e) => handleCurveChange(i, "power", e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.efficiency}
                        onChange={(e) => handleCurveChange(i, "efficiency", e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <PerformanceCurveChart data={formData.performanceCurve} />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            می‌توانید مقادیر جدول را تغییر دهید تا چارت لحظه‌ای به‌روزرسانی شود
          </p>
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 font-semibold"
          >
            ذخیره
          </button>
        </div>
      </form>
    </div>
  );
}

/* کامپوننت ورودی */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...props}
        className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-400 focus:ring focus:ring-cyan-300 focus:ring-opacity-50"
      />
    </div>
  );
}
