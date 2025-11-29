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

<<<<<<< HEAD
const StepperInput = ({ value, min, max, step, onChange, unit }) => {
  const decrement = () => onChange(Math.max(value - step, min));
  const increment = () => onChange(Math.min(value + step, max));

  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        onClick={decrement}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-800"
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
        className="bg-green-500 px-3 py-1 rounded hover:bg-green-800"
      >+</button>
    </div>
  );
};

=======
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
const FanSelectorForm = ({ filters, onFilterChange }) => {
  const [units, setUnits] = useState({
    airflow: 'm³/h',
    pressure: 'Pa'
  });

<<<<<<< HEAD
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

=======
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
  const airflowProps = useMemo(() => {
    const baseMin = 1000;
    const baseMax = 40000;
    const baseStep = 500;
<<<<<<< HEAD
    return {
      min: units.airflow === 'CFM' ? Math.round(m3hToCfm(baseMin)) : baseMin,
      max: units.airflow === 'CFM' ? Math.round(m3hToCfm(baseMax)) : baseMax,
      step: units.airflow === 'CFM' ? Math.round(m3hToCfm(baseStep)) : baseStep,
      value: getDisplayValue(filters.airflow, 'airflow'),
    };
  }, [filters.airflow, units.airflow]);
=======

    if (units.airflow === 'CFM') {
      return {
        min: Math.round(m3hToCfm(baseMin)),
        max: Math.round(m3hToCfm(baseMax)),
        step: Math.round(m3hToCfm(baseStep)),
        value: Math.round(m3hToCfm(filters.airflow)),
      };
    }

    return { min: baseMin, max: baseMax, step: baseStep, value: filters.airflow };
  }, [units.airflow, filters.airflow]);
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b

  const pressureProps = useMemo(() => {
    const baseMin = 50;
    const baseMax = 2000;
    const baseStep = 10;
<<<<<<< HEAD
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
          unit={units.airflow}
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
          unit={units.pressure}
        />
      </div>

      {/* Temperature */}
      <div className='flex flex-col'>
        
          <div className='flex justify-between'>
            <span>دمای کاری</span>
            <span>°C</span>
          </div>
          
          <span className="font-semibold text-center text-blue-600">{filters.temperature.toLocaleString('fa-IR')}°C</span>
        
          <StepperInput
          value={filters.temperature}
          min={-30}
          max={100}
          step={1}
          onChange={val => onFilterChange({ ...filters, temperature: val })}
          unit="°C"
        />
        
      </div>

      <p className="text-center text-xs text-gray-500 mt-2">
        مقادیر مورد نیاز پروژه خود را با استفاده از Stepper و واحدهای دلخواه تنظیم کنید.
      </p>
=======

    if (units.pressure === 'inWG') {
      return {
        min: parseFloat(paToInwg(baseMin).toFixed(2)),
        max: parseFloat(paToInwg(baseMax).toFixed(2)),
        step: parseFloat(paToInwg(baseStep).toFixed(2)),
        value: parseFloat(paToInwg(filters.staticPressure).toFixed(2)),
      };
    }

    return { min: baseMin, max: baseMax, step: baseStep, value: filters.staticPressure };
  }, [units.pressure, filters.staticPressure]);

  const handleAirflowChange = (e) => {
    const displayValue = Number(e.target.value);
    const baseValue = units.airflow === 'CFM' ? cfmToM3h(displayValue) : displayValue;
    onFilterChange({ ...filters, airflow: baseValue });
  };

  const handlePressureChange = (e) => {
    const displayValue = Number(e.target.value);
    const baseValue = units.pressure === 'inWG' ? inwgToPa(displayValue) : displayValue;
    onFilterChange({ ...filters, staticPressure: baseValue });
  };

  const handleTempChange = (e) => {
    onFilterChange({ ...filters, temperature: Number(e.target.value) });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-8 no-print">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">پارامترهای فنی پروژه</h2>

      <div className="space-y-6">
        {/* Airflow */}
        <div>
          <label htmlFor="airflow" className="text-sm font-medium text-slate-700 flex justify-between items-center">
            <span>دبی هوا</span>
            <UnitSelector
              value={units.airflow}
              options={['m³/h', 'CFM']}
              onChange={(u) => setUnits(prev => ({ ...prev, airflow: u }))}
            />
          </label>
          <div className="text-center font-semibold text-blue-600 my-1">
            {Number(airflowProps.value).toLocaleString('fa-IR')} <span className="text-sm">{units.airflow}</span>
          </div>
          <input
            type="range"
            id="airflow"
            min={airflowProps.min}
            max={airflowProps.max}
            step={airflowProps.step}
            value={airflowProps.value}
            onChange={handleAirflowChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Static Pressure */}
        <div>
          <label htmlFor="staticPressure" className="text-sm font-medium text-slate-700 flex justify-between items-center">
            <span>فشار استاتیک</span>
            <UnitSelector
              value={units.pressure}
              options={['Pa', 'inWG']}
              onChange={(u) => setUnits(prev => ({ ...prev, pressure: u }))}
            />
          </label>
          <div className="text-center font-semibold text-blue-600 my-1">
            {Number(pressureProps.value).toLocaleString('fa-IR')} <span className="text-sm">{units.pressure}</span>
          </div>
          <input
            type="range"
            id="staticPressure"
            min={pressureProps.min}
            max={pressureProps.max}
            step={pressureProps.step}
            value={pressureProps.value}
            onChange={handlePressureChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Temperature */}
        <div>
          <label htmlFor="temperature" className="text-sm font-medium text-slate-700 flex justify-between">
            <span>دمای کاری (°C)</span>
            <span className="font-semibold text-blue-600">{filters.temperature.toLocaleString('fa-IR')}</span>
          </label>
          <input
            type="range"
            id="temperature"
            name="temperature"
            min="-30"
            max="100"
            step="1"
            value={filters.temperature}
            onChange={handleTempChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="pt-4 text-center text-xs text-slate-500">
          <p>مقادیر مورد نیاز پروژه خود را با استفاده از اسلایدرها و واحدهای دلخواه تنظیم کنید.</p>
        </div>
      </div>
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
    </div>
  );
};

export default FanSelectorForm;
