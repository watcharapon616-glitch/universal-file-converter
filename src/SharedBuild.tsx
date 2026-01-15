import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Zap, Download, TrendingUp, ShieldCheck, Flame } from 'lucide-react';

// Mockup data for Global Prebuilt Sets (Price in USD)
const PREBUILT_SETS = [
  { id: 's1', name: 'EXTREME GODZILLA', cpu: 'i9-14900K', gpu: 'RTX 4090', price: 4500, score: 99 },
  { id: 's2', name: 'GAMING BEAST', cpu: 'Ryzen 7 7800X3D', gpu: 'RTX 4080 Super', price: 2500, score: 92 },
  { id: 's3', name: 'PRO STREAMER', cpu: 'i7-14700K', gpu: 'RTX 4070 Ti', price: 1800, score: 85 },
  { id: 's4', name: 'VALUE KING', cpu: 'i5-13400F', gpu: 'RTX 4060', price: 850, score: 65 },
  { id: 's5', name: 'BUDGET FIGHTER', cpu: 'Ryzen 5 5600', gpu: 'RX 6600', price: 550, score: 55 },
  { id: 's6', name: 'WORKSTATION LITE', cpu: 'i5-14400', gpu: 'RTX 3060', price: 950, score: 70 },
];

export default function SharedBuild() {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('pc_shared_data');
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  // 1. Ultimate Speed Ranking (Sort by Score)
  const topSpeedSets = [...PREBUILT_SETS].sort((a, b) => b.score - a.score).slice(0, 3);
  
  // 2. Best Value Ranking (Sort by Score per Price)
  const topValueSets = [...PREBUILT_SETS].sort((a, b) => (b.score / b.price) - (a.score / a.price)).slice(0, 3);

  if (!data) return <div className="p-20 text-center dark:text-white font-black italic">NO DATA FOUND...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/build')} className="mb-6 flex items-center gap-2 text-sm font-black dark:text-cyan-400 uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={16} /> Back to Configurator
        </button>

        {/* Current Build Performance Score Card */}
        <div className="mb-12 bg-white dark:bg-slate-900 rounded-[3rem] p-8 border-4 border-slate-900 dark:border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className="w-24 h-24 bg-cyan-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/40">
                <Zap size={40} fill="currentColor" />
             </div>
             <div>
                <p className="text-xs font-black text-cyan-500 uppercase tracking-widest">Your Current Build</p>
                <h2 className="text-3xl font-black dark:text-white italic uppercase tracking-tighter">Custom Configuration</h2>
                <p className="font-mono text-slate-400">Estimated Total: ${data.totalPrice.toLocaleString()}</p>
             </div>
          </div>
          <div className="text-center md:text-right bg-slate-100 dark:bg-black/20 px-8 py-4 rounded-3xl border dark:border-white/5">
             <p className="text-[10px] font-black text-slate-400 uppercase">Total Performance</p>
             <p className="text-5xl font-black text-slate-900 dark:text-white italic">{data.speedScore}<span className="text-sm opacity-30">/100</span></p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Section 1: Top 3 Ultimate Speed */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500 rounded-lg text-white"><Flame size={20} /></div>
              <h3 className="text-2xl font-black italic uppercase dark:text-white">Top 3 Ultimate Speed</h3>
            </div>
            {topSpeedSets.map((set, index) => (
              <div key={set.id} className="relative group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-100 dark:border-white/5 hover:border-orange-500 transition-all shadow-sm">
                <span className="absolute -top-3 -left-3 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black italic shadow-lg">#{index + 1}</span>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-black text-lg dark:text-white tracking-tight">{set.name}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">{set.cpu} + {set.gpu}</p>
                    <p className="text-orange-500 font-mono font-bold mt-2">${set.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Performance</p>
                    <p className="text-3xl font-black text-orange-500 italic">{set.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Top 3 Best Value */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500 rounded-lg text-white"><TrendingUp size={20} /></div>
              <h3 className="text-2xl font-black italic uppercase dark:text-white">Top 3 Best Value</h3>
            </div>
            {topValueSets.map((set, index) => (
              <div key={set.id} className="relative group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-100 dark:border-white/5 hover:border-green-500 transition-all shadow-sm">
                <span className="absolute -top-3 -left-3 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-black italic shadow-lg">#{index + 1}</span>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-black text-lg dark:text-white tracking-tight">{set.name}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">{set.cpu} + {set.gpu}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-green-500 font-mono font-bold">${set.price.toLocaleString()}</span>
                      <span className="text-[9px] px-2 py-0.5 bg-green-500/10 text-green-500 rounded-md font-bold uppercase">Best Value</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Perf/Price Ratio</p>
                    <p className="text-3xl font-black text-green-500 italic">{(set.score / set.price * 1000).toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}