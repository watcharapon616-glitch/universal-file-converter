import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, TrendingUp, Trophy, Monitor, ShieldCheck, Activity } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* ข้อความฝั่งซ้าย */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-inner">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Next-Gen PC Configurator v2.0
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] text-slate-900 dark:text-white uppercase">
              Build your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">Dream</span> machine
            </h1>

            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              The world's most precise PC building tool. Check component compatibility, 
              calculate performance benchmarks, and compare the best market prices in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                to="/build" 
                className="group relative px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-2">Start Your Build <Zap size={18} fill="currentColor" /></span>
              </Link>
            </div>
          </div>

          {/* Visual Decor ฝั่งขวา */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative z-10 w-full aspect-square bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-[4rem] border border-white/10 backdrop-blur-3xl p-10 flex items-center justify-center">
               <div className="w-full bg-slate-900/90 rounded-[2.5rem] border border-white/20 shadow-2xl p-8 transform rotate-6 hover:rotate-0 transition-all duration-700">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-2 text-white/30 text-[10px] font-black uppercase tracking-widest italic">System Ready</div>
                    <Activity className="text-cyan-400 animate-pulse" size={20} />
                  </div>
                  <div className="mt-12 flex justify-center py-6">
                       <div className="relative">
                          <div className="w-32 h-32 rounded-full border-[10px] border-white/5 border-t-cyan-500 animate-spin-slow"></div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-black text-white italic">99%</span>
                              <span className="text-[8px] text-cyan-400 font-bold tracking-widest">PERFECT</span>
                          </div>
                       </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-6">
          {[
            { icon: <Monitor className="text-cyan-500" />, title: "Visual Builder", desc: "Design your setup with an intuitive interface. Simple for beginners, powerful for pros." },
            { icon: <ShieldCheck className="text-purple-500" />, title: "Compatibility", desc: "Smart AI-driven system to ensure every component works perfectly together." },
            { icon: <Trophy className="text-yellow-500" />, title: "Market Ranking", desc: "Real-time performance benchmarks and value-for-money comparisons." }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-cyan-500/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black italic uppercase mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}