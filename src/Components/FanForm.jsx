import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// محاسبه راندمان
const calculateEfficiency = (point) => {
  if (!point.airflow || !point.staticPressure || !point.power) return 0;
  const airflowM3s = point.airflow / 3600;
  const powerW = point.power * 1000;
  if (powerW === 0) return 0;
  return parseFloat(((airflowM3s * point.staticPressure) / powerW * 100).toFixed(1));
};

const INITIAL_STATE = {
  model: '',
  type: 'فن محوری (Axial)',
  manufacturer: '',
  imageUrl: `https://picsum.photos/seed/fan${Date.now()}/400/300`,
  description: '',
  maxAirflow: 0,
  maxStaticPressure: 0,
  powerConsumption: 0,
  motorRpm: 0,
  noiseLevel: 0,
  minTemp: -20,
  maxTemp: 60,
  fluidType: ['هوای تمیز'],
  price: 0,
  electricalSpecs: { voltage: 380, phase: 3, frequency: 50 },
  dimensions: { height: 0, width: 0, depth: 0 },
  performanceCurve: [{ airflow: 0, staticPressure: 0, power: 0, efficiency: 0, tempId: `point-${Date.now()}-0` }],
};

const FanForm = ({ fanToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    const initialData = fanToEdit ? JSON.parse(JSON.stringify(fanToEdit)) : JSON.parse(JSON.stringify(INITIAL_STATE));
    const curveWithTempId = initialData.performanceCurve
      .map((p, index) => ({ ...p, tempId: `point-${Date.now()}-${index}`, efficiency: calculateEfficiency(p) }))
      .sort((a, b) => a.airflow - b.airflow);
    return { ...initialData, performanceCurve: curveWithTempId };
  });

  const [hoveredPointId, setHoveredPointId] = useState(null);
  const isEditing = !!fanToEdit;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [name]: Number(value) }
    }));
  };

  const handleFluidTypeChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, fluidType: value.split(',').map(s => s.trim()) }));
  };

  const handlePerfPointChange = (tempId, e) => {
    const { name, value } = e.target;
    let newCurve = formData.performanceCurve.map(p => {
      if (p.tempId === tempId) {
        const updatedPoint = { ...p, [name]: Number(value) || 0 };
        if (['airflow','staticPressure','power'].includes(name)) updatedPoint.efficiency = calculateEfficiency(updatedPoint);
        return updatedPoint;
      }
      return p;
    });
    if (name === 'airflow') newCurve.sort((a,b) => a.airflow - b.airflow);
    setFormData(prev => ({ ...prev, performanceCurve: newCurve }));
  };

  const addPerfPoint = () => {
    setFormData(prev => {
      const curve = [...prev.performanceCurve];
      const newTempId = `point-${Date.now()}-${curve.length}`;
      let newPoint = { tempId: newTempId, airflow: 0, staticPressure: 0, power: 0, efficiency: 0 };
      if (curve.length > 0) {
        const last = curve[curve.length-1];
        newPoint.airflow = Math.round((last.airflow + 5000)/100)*100;
        newPoint.staticPressure = Math.max(0, Math.round(last.staticPressure*0.9/10)*10);
        newPoint.power = parseFloat((last.power + 0.5).toFixed(1));
      }
      newPoint.efficiency = calculateEfficiency(newPoint);
      return { ...prev, performanceCurve: [...curve, newPoint].sort((a,b)=>a.airflow-b.airflow) };
    });
  };

  const removePerfPoint = (tempId) => {
    if (formData.performanceCurve.length <= 1) return;
    setFormData(prev => ({ ...prev, performanceCurve: prev.performanceCurve.filter(p => p.tempId !== tempId) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = { ...formData, performanceCurve: formData.performanceCurve.map(({tempId,...rest})=>rest) };
    onSubmit(finalFormData);
  };

  const CustomDot = ({ cx, cy, stroke, payload }) => {
    if (payload.tempId === hoveredPointId) return <circle cx={cx} cy={cy} r={8} fill={stroke} stroke="#fff" strokeWidth={3} />;
    return <circle cx={cx} cy={cy} r={5} fill={stroke} stroke="#fff" strokeWidth={2} />;
  };

  const formInputClass = "mt-1 w-full p-2 border rounded-md bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-12 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">{isEditing ? `ویرایش محصول: ${fanToEdit.model}` : 'افزودن محصول جدید'}</h3>
          </div>
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* فیلدهای فرم مشابه نسخه TypeScript */}
            {/* ... اینجا می‌توانید همان فیلدها و جدول performanceCurve را اضافه کنید ... */}
          </div>
          <div className="p-4 bg-slate-50 flex justify-end gap-x-3">
            <button type="button" onClick={onCancel} className="py-2 px-4 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300">انصراف</button>
            <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">{isEditing ? 'ذخیره تغییرات' : 'ایجاد محصول'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FanForm;
