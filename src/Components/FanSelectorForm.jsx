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

const FanSelectorForm = ({ filters, onFilterChange }) => {
  const [units, setUnits] = useState({
    airflow: 'm³/h',
    pressure: 'Pa'
  });

  const airflowProps = useMemo(() => {
    const baseMin = 1000;
    const baseMax = 40000;
    const baseStep = 500;

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

  const pressureProps = useMemo(() => {
    const baseMin = 50;
    const baseMax = 2000;
    const baseStep = 10;

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
    </div>
  );
};

export default FanSelectorForm;
