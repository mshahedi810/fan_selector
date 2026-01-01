"use client";

import { useState } from 'react';
import { FaTachometerAlt, FaChartLine, FaDollarSign, FaMicrochip } from 'react-icons/fa';
import SpecTab from './SpecTab';
import PerformanceSimulator from './PerformanceSimulator';
import EconomicAnalysis from './EconomicAnalysis';
import Monitoring from './Monitoring';

const FanDetails = ({ fan, onBack }) => {
  const [activeTab, setActiveTab] = useState('specs');

  const tabs = [
    { id: 'specs', label: 'مشخصات فنی', icon: <FaTachometerAlt /> },
    { id: 'simulation', label: 'شبیه‌سازی عملکرد', icon: <FaChartLine /> },
    { id: 'eco', label: 'آنالیز اقتصادی', icon: <FaDollarSign /> },
    { id: 'monitor', label: 'مانیتورینگ IoT', icon: <FaMicrochip /> },
  ];

  return (
    <div className="bg-linear-to-br from-gray-900 via-gray-950 to-black p-6 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold drop-shadow-[0_0_6px_rgb(255,255,255)]">{fan.model}</h2>
        <button
          onClick={onBack}
          className="py-2 px-4 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
        >
          بازگشت
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image & Description */}
        <div className="lg:col-span-1 space-y-6">
          <img
            src={fan.imageUrl}
            alt={fan.model}
            className="w-full rounded-xl shadow-[0_0_10px_rgba(255,255,255,0.1)] object-cover"
          />
          <div className="text-white/80">
            <h3 className="font-bold mb-2">توضیحات</h3>
            <p className="text-sm leading-relaxed">{fan.description}</p>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="lg:col-span-2">
          <div className="border-b border-white/20">
            <nav className="flex gap-4 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-3 border-b-2 font-medium text-sm flex items-center gap-2 transition-all
                    ${activeTab === tab.id
                      ? 'border-blue-400 text-blue-400 bg-black/40'
                      : 'border-transparent text-white/70 hover:text-blue-400'}`
                  }
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 space-y-6">
            {activeTab === 'specs' && <SpecTab fan={fan} />}
            {activeTab === 'simulation' && <PerformanceSimulator fan={fan} />}
            {activeTab === 'eco' && <EconomicAnalysis fan={fan} />}
            {activeTab === 'monitor' && <Monitoring fan={fan} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanDetails;
