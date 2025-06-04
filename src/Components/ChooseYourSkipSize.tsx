import React, { useState, useEffect } from 'react';
import { Check, AlertTriangle, Truck, Clock, Sun, Moon } from 'lucide-react';

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

const SkipSelector: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Progress steps
  const steps = [
    { name: 'Postcode', completed: true },
    { name: 'Waste Type', completed: true },
    { name: 'Select Skip', completed: false, current: true },
    { name: 'Permit Check', completed: false },
    { name: 'Choose Date', completed: false },
    { name: 'Payment', completed: false }
  ];

  // Data from the API
  const mockData: Skip[] = [
    {"id":17933,"size":4,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":278,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.813","allowed_on_road":true,"allows_heavy_waste":true},
    {"id":17934,"size":6,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":305,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.992","allowed_on_road":true,"allows_heavy_waste":true},
    {"id":17935,"size":8,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":375,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.171","allowed_on_road":true,"allows_heavy_waste":true},
    {"id":17936,"size":10,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":400,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.339","allowed_on_road":false,"allows_heavy_waste":false},
    {"id":17937,"size":12,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":439,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.516","allowed_on_road":false,"allows_heavy_waste":false},
    {"id":17938,"size":14,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":470,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.69","allowed_on_road":false,"allows_heavy_waste":false},
    {"id":17939,"size":16,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":496,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.876","allowed_on_road":false,"allows_heavy_waste":false},
    {"id":15124,"size":20,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.434","allowed_on_road":false,"allows_heavy_waste":true},
    {"id":15125,"size":40,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.603","allowed_on_road":false,"allows_heavy_waste":false}
  ];

  useEffect(() => {
    setTimeout(() => {
      setSkips(mockData);
      setLoading(false);
    }, 800);
  }, []);

  const calculateTotalPrice = (skip: Skip): number => {
    return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
  };

  const getSelectedSkip = (): Skip | null => {
    return skips.find(skip => skip.id === selectedSkip) || null;
  };

  const handleSkipSelection = (skipId: number) => {
    setSelectedSkip(selectedSkip === skipId ? null : skipId);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      window.location.href = '/next-page';
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} flex items-center justify-center transition-all duration-500`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-3 ${isDark ? 'border-blue-400 border-t-transparent' : 'border-blue-600 border-t-transparent'} rounded-full animate-spin mx-auto mb-4`}></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg font-medium transition-colors duration-300`}>Loading available skips...</p>
        </div>
      </div>
    );
  }

  const selectedSkipData = getSelectedSkip();

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Header Progress */}
      <div className={`${isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/90 border-indigo-100'} backdrop-blur-sm shadow-lg border-b sticky top-0 z-10 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-center">
                  <div className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-lg transition-all duration-300 ${
                      step.completed 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' 
                        : step.current 
                        ? isDark ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {step.completed ? <Check size={16} /> : index + 1}
                    </div>
                    <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                      step.current ? (isDark ? 'text-blue-400' : 'text-indigo-700') : step.completed ? 'text-emerald-600' : (isDark ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-6 rounded-full transition-all duration-300 ${
                      step.completed ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : (isDark ? 'bg-gray-700' : 'bg-gray-300')
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`ml-6 p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600' 
                  : 'bg-gradient-to-r from-slate-600 to-gray-700 text-white hover:from-slate-700 hover:to-gray-800'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Choose Your Skip Size
          </h1>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Select the skip size that best suits your project needs. All prices include VAT and delivery.
          </p>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {skips.map((skip) => (
            <div
              key={skip.id}
              className={`backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 ${
                selectedSkip === skip.id 
                  ? (isDark 
                      ? 'border-indigo-400 shadow-2xl ring-4 ring-indigo-400/30 bg-gray-800/90' 
                      : 'border-indigo-500 shadow-2xl ring-4 ring-indigo-200 bg-white') 
                  : (isDark 
                      ? 'border-gray-700 hover:border-indigo-400 bg-gray-800/50' 
                      : 'border-gray-200 hover:border-indigo-300 bg-white/80')
              }`}
              onClick={() => handleSkipSelection(skip.id)}
            >
              {/* Skip Image */}
              <div className="relative h-48 bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 rounded-t-2xl overflow-hidden">
                {/* Skip Size Badge */}
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                }`}>
                  {skip.size} Yards
                </div>
                
                {/* Skip Bin SVG */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-2xl">
                    <rect x="20" y="25" width="80" height="45" fill="#FFA500" stroke="#FF8C00" strokeWidth="2" rx="4"/>
                    <rect x="15" y="20" width="90" height="8" fill="#FFB84D" stroke="#FF8C00" strokeWidth="1" rx="4"/>
                    <rect x="22" y="67" width="76" height="8" fill="#E6940A" rx="2"/>
                    <rect x="12" y="30" width="6" height="20" fill="#CC7A00" rx="3"/>
                    <rect x="102" y="30" width="6" height="20" fill="#CC7A00" rx="3"/>
                    <text x="60" y="52" textAnchor="middle" fill="#8B4513" fontSize="10" fontWeight="bold">SKIP</text>
                    <rect x="25" y="28" width="70" height="35" fill="#D2691E" opacity="0.7" rx="2"/>
                    <rect x="30" y="35" width="15" height="8" fill="#8B4513" rx="1"/>
                    <rect x="50" y="32" width="12" height="10" fill="#A0522D" rx="1"/>
                    <rect x="70" y="38" width="18" height="6" fill="#654321" rx="1"/>
                  </svg>
                </div>

                {/* Selection Indicator */}
                {selectedSkip === skip.id && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full p-2 shadow-lg animate-pulse">
                    <Check size={18} />
                  </div>
                )}
              </div>

              {/* Header */}
              <div className={`p-6 border-b transition-colors duration-300 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{skip.size} Yard Skip</h3>
                </div>
                
                <div className={`text-3xl font-bold transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                }`}>
                  £{calculateTotalPrice(skip)}
                  <span className={`text-sm font-normal ml-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>inc. VAT</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Duration */}
                <div className={`flex items-center gap-2 mb-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Clock size={16} className={`transition-colors duration-300 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                  <span className="text-sm font-medium">{skip.hire_period_days} day hire period</span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {skip.allowed_on_road ? (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                      isDark 
                        ? 'text-emerald-300 bg-emerald-900/30 border-emerald-700' 
                        : 'text-emerald-800 bg-emerald-100 border-emerald-200'
                    }`}>
                      <Truck size={16} />
                      <span className="text-sm font-medium">Road permit included</span>
                    </div>
                  ) : (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                      isDark 
                        ? 'text-amber-300 bg-amber-900/30 border-amber-700' 
                        : 'text-amber-800 bg-amber-100 border-amber-200'
                    }`}>
                      <AlertTriangle size={16} />
                      <span className="text-sm font-medium">Private property only</span>
                    </div>
                  )}

                  {skip.allows_heavy_waste && (
                    <div className={`text-sm px-3 py-2 rounded-lg border transition-all duration-300 ${
                      isDark 
                        ? 'text-gray-300 bg-gray-800/50 border-gray-700' 
                        : 'text-gray-700 bg-gray-100 border-gray-200'
                    }`}>
                      ✓ Heavy waste allowed
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
                    selectedSkip === skip.id
                      ? (isDark 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg scale-105' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg scale-105')
                      : (isDark 
                          ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-indigo-900/50 hover:to-purple-900/50 hover:text-indigo-300' 
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700')
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkipSelection(skip.id);
                  }}
                >
                  {selectedSkip === skip.id ? '✓ Selected' : 'Select Skip'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Only show when skip is selected */}
      {selectedSkipData && (
        <div className={`backdrop-blur-sm border-t p-6 sticky bottom-0 shadow-2xl transition-all duration-300 ${
          isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/90 border-indigo-200'
        }`}>
          <div className="max-w-7xl mx-auto">
            {/* Disclaimer */}
            <div className={`text-xs mb-4 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <div className={`text-xl font-bold transition-all duration-300 ${
                    isDark 
                      ? 'bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                  }`}>
                    {selectedSkipData.size} Yard Skip Selected
                  </div>
                  <div className={`flex items-center gap-4 text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-semibold">£{calculateTotalPrice(selectedSkipData)} inc. VAT</span>
                    <span>•</span>
                    <span>{selectedSkipData.hire_period_days} day hire</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold ${
                    isDark 
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className={`px-10 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl ${
                    isDark 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  }`}
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkipSelector;