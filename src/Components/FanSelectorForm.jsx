import React, { useState, useMemo } from 'react';
import { m3hToCfm, cfmToM3h, paToInwg, inwgToPa } from '../utils/conversions';

const UnitSelector = ({ value, options, onChange }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="bg-white border border-slate-300 text-slate-700 text-xs rounded p-1"
  >
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

const StepperInput = ({ value, min, max, step, onChange }) => {
  const decrement = () => onChange(Math.max(value - step, min));
  const increment = () => onChange(Math.min(value + step, max));

  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        onClick={decrement}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-800 text-white"
      >-</button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        className="w-20 text-center border rounded px-2 py-1"
      />
      <button
        onClick={increment}
        className="bg-green-500 px-3 py-1 rounded hover:bg-green-800 text-white"
      >+</button>
    </div>
  );
};

const FanSelectorForm = ({ filters, onFilterChange }) => {
  const [units, setUnits] = useState({
    airflow: 'm³/h',
    pressure: 'Pa'
  });

  const getDisplayValue = (value, type) => {
    if (type === 'airflow') return units.airflow === 'CFM' ? Math.round(m3hToCfm(value)) : value;
    if (type === 'pressure') return units.pressure === 'inWG' ? parseFloat(paToInwg(value).toFixed(2)) : value;
    return value;
  };

  const toBaseValue = (value, type) => {
    if (type === 'airflow') return units.airflow === 'CFM' ? cfmToM3h(value) : value;
    if (type === 'pressure') return units.pressure === 'inWG' ? inwgToPa(value) : value;
    return value;
  };

  const airflowProps = useMemo(() => {
    const baseMin = 1000;
    const baseMax = 40000;
    const baseStep = 500;
    return {
      min: units.airflow === 'CFM' ? Math.round(m3hToCfm(baseMin)) : baseMin,
      max: units.airflow === 'CFM' ? Math.round(m3hToCfm(baseMax)) : baseMax,
      step: units.airflow === 'CFM' ? Math.round(m3hToCfm(baseStep)) : baseStep,
      value: getDisplayValue(filters.airflow, 'airflow'),
    };
  }, [filters.airflow, units.airflow]);

  const pressureProps = useMemo(() => {
    const baseMin = 50;
    const baseMax = 2000;
    const baseStep = 10;
    return {
      min: units.pressure === 'inWG' ? parseFloat(paToInwg(baseMin).toFixed(2)) : baseMin,
      max: units.pressure === 'inWG' ? parseFloat(paToInwg(baseMax).toFixed(2)) : baseMax,
      step: units.pressure === 'inWG' ? parseFloat(paToInwg(baseStep).toFixed(2)) : baseStep,
      value: getDisplayValue(filters.staticPressure, 'pressure'),
    };
  }, [filters.staticPressure, units.pressure]);

  return (
    <div className="bg-gradient-to-br from-blue-200 to-blue-50 p-6 rounded-lg shadow-md sticky top-8 no-print max-w-xl mx-auto space-y-6">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">پارامترهای فنی پروژه</h2>

      {/* Airflow */}
      <div>
        <label className="flex justify-between items-center mb-1 text-sm font-medium text-gray-700">
          <span>دبی هوا</span>
          <UnitSelector
            value={units.airflow}
            options={['m³/h', 'CFM']}
            onChange={(u) => setUnits(prev => ({ ...prev, airflow: u }))}
          />
        </label>
        <div className="text-center font-semibold text-blue-600 mb-2">
          {Number(airflowProps.value).toLocaleString('fa-IR')} <span className="text-sm">{units.airflow}</span>
        </div>
        <StepperInput
          {...airflowProps}
          onChange={val => onFilterChange({ ...filters, airflow: toBaseValue(val, 'airflow') })}
        />
      </div>

      {/* Pressure */}
      <div>
        <label className="flex justify-between items-center mb-1 text-sm font-medium text-gray-700">
          <span>فشار استاتیک</span>
          <UnitSelector
            value={units.pressure}
            options={['Pa', 'inWG']}
            onChange={(u) => setUnits(prev => ({ ...prev, pressure: u }))}
          />
        </label>
        <div className="text-center font-semibold text-blue-600 mb-2">
          {Number(pressureProps.value).toLocaleString('fa-IR')} <span className="text-sm">{units.pressure}</span>
        </div>
        <StepperInput
          {...pressureProps}
          onChange={val => onFilterChange({ ...filters, staticPressure: toBaseValue(val, 'pressure') })}
        />
      </div>

      {/* Temperature */}
      <div className="flex flex-col">
        <div className="flex justify-between mb-1">
          <span>دمای کاری</span>
          <span>°C</span>
        </div>
        <span className="font-semibold text-center text-blue-600 mb-2">{filters.temperature.toLocaleString('fa-IR')}°C</span>
        <StepperInput
          value={filters.temperature}
          min={-30}
          max={100}
          step={1}
          onChange={val => onFilterChange({ ...filters, temperature: val })}
        />
      </div>

      <p className="text-center text-xs text-gray-500 mt-2">
        مقادیر مورد نیاز پروژه خود را با استفاده از Stepper و واحدهای دلخواه تنظیم کنید.
      </p>
    </div>
  );
};

export default FanSelectorForm;
