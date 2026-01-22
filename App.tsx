
import React, { useState, useEffect } from 'react';
import { Calendar, Settings as SettingsIcon, LayoutGrid, Utensils, ChevronLeft, ChevronRight, Sun, Moon, RotateCcw } from 'lucide-react';
import { format, parseISO, addDays, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { AppConfig, TabType } from './types';
import { DEFAULT_MENU, DEFAULT_START_DATE, STORAGE_KEY, DAYS_LIST } from './constants';
import { calculateRotationWeek, mapDayToMenuKey, isWeekend } from './utils';

const App: React.FC = () => {
  // State initialization
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      startDate: DEFAULT_START_DATE,
      menu: DEFAULT_MENU
    };
  });

  const [consultDate, setConsultDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const startDateObj = parseISO(config.startDate);
  const currentRotationWeek = calculateRotationWeek(startDateObj, consultDate);
  const menuKey = mapDayToMenuKey(consultDate);
  const todayDish = menuKey ? config.menu[currentRotationWeek - 1].days[menuKey] : null;
  const isSelectedToday = isSameDay(consultDate, new Date());

  const navigateDate = (days: number) => {
    setConsultDate(prev => addDays(prev, days));
  };

  const handleUpdateMenu = (weekIdx: number, day: string, dish: string) => {
    const newMenu = JSON.parse(JSON.stringify(config.menu));
    newMenu[weekIdx].days[day] = dish;
    setConfig({ ...config, menu: newMenu });
  };

  const handleUpdateStartDate = (newDate: string) => {
    setConfig({ ...config, startDate: newDate });
  };

  const goToToday = () => {
    setConsultDate(new Date());
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-slate-800 flex flex-col font-['Quicksand']">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md pt-6 pb-4 px-4 sticky top-0 z-30 border-b border-orange-100 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-2.5 rounded-2xl text-white shadow-md shadow-orange-200">
              <Sun size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-orange-600 tracking-tight">Menù Sunshine</h1>
          </div>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`p-2.5 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-orange-100 text-orange-600 scale-105 shadow-inner' : 'text-slate-400 hover:bg-slate-100'}`}
            aria-label="Settings"
          >
            <SettingsIcon size={24} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full p-5 pb-28">
        {activeTab === 'daily' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Date Navigator */}
            <div className="bg-white p-5 rounded-[2.5rem] shadow-lg shadow-orange-100/50 border border-orange-50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
              <div className="flex items-center justify-between relative z-10">
                <button 
                  onClick={() => navigateDate(-1)} 
                  className="p-3 bg-orange-50 hover:bg-orange-100 rounded-2xl text-orange-500 transition-colors"
                  aria-label="Previous Day"
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </button>
                <div className="text-center">
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] mb-1">
                    {format(consultDate, 'EEEE', { locale: it })}
                  </p>
                  <p className="text-xl font-extrabold text-slate-700 capitalize">
                    {format(consultDate, 'd MMMM yyyy', { locale: it })}
                  </p>
                </div>
                <button 
                  onClick={() => navigateDate(1)} 
                  className="p-3 bg-orange-50 hover:bg-orange-100 rounded-2xl text-orange-500 transition-colors"
                  aria-label="Next Day"
                >
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
              
              <div className="flex justify-center items-center gap-2 mt-3">
                <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                  Settimana {currentRotationWeek}
                </span>
                
                {/* Quick action: Today button */}
                {!isSelectedToday && (
                  <button 
                    onClick={goToToday}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-md hover:bg-slate-700 transition-all active:scale-95 animate-in zoom-in-50 duration-300"
                  >
                    <RotateCcw size={10} strokeWidth={3} />
                    Oggi
                  </button>
                )}
              </div>
            </div>

            {/* Dish Display */}
            <div className="relative pt-4">
              <div className="absolute top-0 left-2 bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-3xl shadow-xl shadow-orange-200 z-20">
                <Utensils size={32} className="text-white" strokeWidth={2.5} />
              </div>
              
              <div className="bg-white p-8 pt-16 rounded-[3rem] shadow-2xl shadow-orange-200/40 border border-white relative z-10 overflow-hidden min-h-[280px] flex flex-col justify-center text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full -mr-12 -mt-12 z-0" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-50/30 rounded-full -ml-8 -mb-8 z-0" />
                
                <div className="relative z-10">
                  <h2 className="text-xs font-black text-orange-300 uppercase tracking-[0.3em] mb-6">Primo Piatto</h2>
                  
                  {isWeekend(consultDate) ? (
                    <div className="py-8">
                      <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Moon className="text-slate-300" size={40} />
                      </div>
                      <p className="text-2xl font-bold text-slate-400">Mensa Chiusa</p>
                      <p className="text-slate-300 font-medium">Ci vediamo lunedì!</p>
                    </div>
                  ) : (
                    <div className="py-4">
                      <p className="text-3xl font-extrabold text-slate-800 leading-snug px-2">
                        {todayDish || "Menu non disponibile"}
                      </p>
                      <div className="mt-10 flex justify-center items-center gap-2">
                          {[1, 2, 3, 4].map((w) => (
                              <div 
                                key={w} 
                                className={`h-1.5 rounded-full transition-all duration-500 ${w === currentRotationWeek ? 'bg-orange-400 w-12 shadow-sm' : 'bg-slate-100 w-8'}`} 
                              />
                          ))}
                      </div>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-3">Ciclo 4 Settimane</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'full' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-3 px-2">
              <LayoutGrid className="text-orange-500" size={24} />
              <h2 className="text-2xl font-black text-slate-800">Piano Completo</h2>
            </div>
            <div className="space-y-6">
              {config.menu.map((week) => {
                const isCurrent = currentRotationWeek === week.id;
                return (
                  <div 
                    key={week.id} 
                    className={`bg-white rounded-[2rem] shadow-lg overflow-hidden border-2 transition-all duration-500 ${isCurrent ? 'border-orange-400 ring-8 ring-orange-50' : 'border-transparent opacity-80'}`}
                  >
                    <div className={`px-6 py-4 flex justify-between items-center ${isCurrent ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <span className="font-black uppercase text-xs tracking-[0.2em]">Settimana {week.id}</span>
                      {isCurrent && <span className="text-[10px] bg-white text-orange-600 px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm">In corso</span>}
                    </div>
                    <div className="p-6 space-y-4">
                      {DAYS_LIST.map((day) => (
                        <div key={day} className="flex items-start gap-4 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                          <span className="text-[10px] font-black text-orange-300 uppercase w-20 pt-1 tracking-wider">{day}</span>
                          <span className="text-sm text-slate-700 font-bold leading-tight">{week.days[day]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-800">Impostazioni</h2>
              <button 
                onClick={() => setActiveTab('daily')} 
                className="bg-orange-500 text-white px-5 py-2 rounded-2xl text-sm font-black shadow-lg shadow-orange-200"
              >
                FATTO
              </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-orange-50 space-y-6">
              <label className="block">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Inizio Rotazione</span>
                <input 
                  type="date" 
                  value={config.startDate}
                  onChange={(e) => handleUpdateStartDate(e.target.value)}
                  className="mt-2 block w-full rounded-2xl border-none bg-slate-50 p-4 font-bold text-slate-700 focus:ring-2 focus:ring-orange-400 transition-all outline-none" 
                />
                <p className="text-[10px] text-slate-400 mt-3 font-medium px-2 leading-relaxed">
                  Scegli la data d'inizio del ciclo per ricalibrare le settimane.
                </p>
              </label>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-black text-slate-400 uppercase ml-4 tracking-[0.2em]">Personalizza Menù</h3>
              {config.menu.map((week, wIdx) => (
                <div key={week.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-5">
                  <p className="font-black text-orange-500 text-sm tracking-wider uppercase">Settimana {week.id}</p>
                  <div className="space-y-4">
                    {DAYS_LIST.map((day) => (
                      <div key={day} className="space-y-1">
                        <label className="text-[10px] font-black text-slate-300 uppercase ml-2">{day}</label>
                        <input 
                          type="text"
                          value={week.days[day]}
                          onChange={(e) => handleUpdateMenu(wIdx, day, e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-slate-700 focus:ring-1 focus:ring-orange-300 transition-all outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                if(confirm("Vuoi davvero ripristinare il menu originale?")) {
                  setConfig({ startDate: DEFAULT_START_DATE, menu: DEFAULT_MENU });
                }
              }}
              className="w-full py-5 text-xs font-black text-red-400 bg-white rounded-[2rem] border-2 border-red-50 hover:bg-red-50 hover:text-red-500 transition-all uppercase tracking-widest shadow-sm"
            >
              Ripristina Dati Originali
            </button>
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-400">Creato da <span className="font-bold text-slate-700">Andrea Bravaccino</span></p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-md bg-white/90 backdrop-blur-xl border border-orange-100 rounded-[2.5rem] px-4 py-3 z-40 shadow-2xl shadow-orange-200/50">
        <div className="flex justify-around items-center">
          <NavButton 
            active={activeTab === 'daily'} 
            onClick={() => setActiveTab('daily')} 
            icon={<Calendar size={22} strokeWidth={2.5} />} 
            label="Oggi" 
          />
          <NavButton 
            active={activeTab === 'full'} 
            onClick={() => setActiveTab('full')} 
            icon={<LayoutGrid size={22} strokeWidth={2.5} />} 
            label="Piano" 
          />
          <NavButton 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            icon={<SettingsIcon size={22} strokeWidth={2.5} />} 
            label="Config" 
          />
        </div>
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-[2rem] transition-all duration-500 ${active ? 'text-orange-600 bg-orange-100 shadow-inner' : 'text-slate-400 hover:text-orange-300 hover:bg-orange-50/50'}`}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export default App;
