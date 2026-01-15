import { Link, useLocation } from 'react-router-dom';
import { Cpu, Home, LayoutList, Share2, Zap, Moon, Sun } from 'lucide-react';

export default function Navbar({ isDark, setIsDark }: { isDark: boolean, setIsDark: (v: boolean) => void }) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-cyan-500/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-slate-100 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <Cpu className="text-cyan-600 dark:text-cyan-400" size={28} />
              </div>
            </div>
            {/* ปรับชื่อแบรนด์ให้ดู Global */}
            <span className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white uppercase italic">
              PC Builder <span className="text-cyan-500 text-sm align-top">PRO</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2 text-sm items-center">
              <Link to="/" className={`px-4 py-2 font-bold transition-all ${isActive('/') ? 'text-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-cyan-500'}`}>
                Home
              </Link>
              
              <Link to="/shared-build" className={`px-4 py-2 font-bold transition-all ${isActive('/shared-build') ? 'text-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-cyan-500'}`}>
                Rankings
              </Link>

              <Link to="/build" className={`group relative px-6 py-2.5 rounded-xl font-black overflow-hidden transition-all ${isActive('/build') ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                <div className={`absolute inset-0 transition-all duration-300 ${isActive('/build') ? 'bg-gradient-to-r from-cyan-600 to-purple-600' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                <span className="relative flex items-center gap-2"><Zap size={16}/> Configurator</span>
              </Link>
            </div>
            
            <button onClick={() => setIsDark(!isDark)} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-700 transition-all active:scale-90 hover:shadow-lg">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-2 shadow-2xl">
        <div className="flex justify-around items-center">
          <Link to="/" className={`flex flex-col items-center gap-1 p-3 transition-all ${isActive('/') ? 'text-cyan-500' : 'text-slate-400'}`}>
            <Home size={22} />
            <span className="text-[9px] font-black uppercase">Home</span>
          </Link>
          
          <Link to="/build" className={`relative flex flex-col items-center gap-1 p-3 transition-all ${isActive('/build') ? 'text-white' : 'text-slate-400'}`}>
            {isActive('/build') && <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-purple-600 rounded-2xl -z-10 animate-pulse"></div>}
            <LayoutList size={22} />
            <span className="text-[9px] font-black uppercase">Build</span>
          </Link>

          <Link to="/shared-build" className={`relative flex flex-col items-center gap-1 p-3 transition-all ${isActive('/shared-build') ? 'text-white' : 'text-slate-400'}`}>
            {isActive('/shared-build') && <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-purple-600 rounded-2xl -z-10"></div>}
            <Share2 size={22} />
            <span className="text-[9px] font-black uppercase">Ranks</span>
          </Link>
        </div>
      </nav>
    </>
  );
}