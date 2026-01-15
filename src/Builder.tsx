import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, ShoppingCart, X, Zap, Trophy,
    Share2, AlertTriangle, CheckCircle2, RotateCcw,
    Store, ChevronRight
} from 'lucide-react';
import type { Product } from "./part";
import { products, categories as DB_CATEGORIES } from "./part";

export default function Builder() {
    const navigate = useNavigate();
    const [selectedParts, setSelectedParts] = useState<Record<string, Product>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // 1. Smart Filtering Logic
    const filteredProducts = products.filter(product => {
        if (product.category !== activeCategory) return false;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;

        // Socket Compatibility Filter
        if (activeCategory === 'Mainboard' && selectedParts['CPU']) {
            return product.socket === selectedParts['CPU'].socket;
        }
        if (activeCategory === 'CPU' && selectedParts['Mainboard']) {
            return product.socket === selectedParts['Mainboard'].socket;
        }
        return true;
    });

    // 2. Calculation Logic (Converted to USD for Global Market)
    const getBestPrice = (p: Product) => Math.min(...Object.values(p.prices));
    const totalPrice = Object.values(selectedParts).reduce((sum, p) => sum + getBestPrice(p), 0);

    const speedScore = Math.round(
        ((selectedParts['CPU']?.speed || 0) * 0.4) +
        ((selectedParts['GPU']?.speed || 0) * 0.45) +
        (Object.values(selectedParts).length * 2)
    );

    const checkPSU = () => {
        const psu = selectedParts['PSU'];
        if (!psu) return { status: 'ok' };
        const totalWatt = (selectedParts['CPU']?.wattage || 0) + (selectedParts['GPU']?.wattage || 0) + 100;
        if (totalWatt > (psu.wattLimit || 0)) {
            return { status: 'error', message: `Power Alert: Requires ~${totalWatt}W but PSU provides ${psu.wattLimit}W` };
        }
        return { status: 'ok' };
    };

    const psuStatus = checkPSU();

    const handleShare = () => {
        if (psuStatus.status === 'error') return;
        localStorage.setItem('pc_shared_data', JSON.stringify({
            parts: selectedParts,
            totalPrice,
            speedScore,
            timestamp: new Date().toLocaleString()
        }));
        navigate('/shared-build');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors pb-20">
            <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Side: Component Selection */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-4xl font-black italic uppercase dark:text-white tracking-tighter">PC Configurator</h2>
                        <button
                            onClick={() => setSelectedParts({})}
                            className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all"
                        >
                            <span className="flex items-center gap-1.5"><RotateCcw size={14} /> Reset Build</span>
                        </button>
                    </div>

                    {psuStatus.status === 'error' && (
                        <div className="p-4 bg-red-500 text-white rounded-[2rem] flex items-center gap-4 animate-pulse shadow-lg shadow-red-500/20">
                            <AlertTriangle size={24} />
                            <p className="font-bold">{psuStatus.message}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DB_CATEGORIES.map((cat) => (
                            <div key={cat.id} className={`p-6 rounded-[2.5rem] border-2 flex items-center justify-between transition-all ${selectedParts[cat.id] ? 'border-cyan-500 bg-cyan-500/5 shadow-lg shadow-cyan-500/5' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40'}`}>
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border dark:border-white/10 shadow-sm overflow-hidden">
                                        {selectedParts[cat.id] ? (
                                            <img src={selectedParts[cat.id].image} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <Zap size={24} className="text-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{cat.name}</p>
                                        <p className="font-bold text-sm dark:text-white truncate max-w-[150px]">
                                            {selectedParts[cat.id]?.name || `Select ${cat.name}`}
                                        </p>
                                        {selectedParts[cat.id] && (
                                            <p className="text-xs font-black text-slate-400 font-mono italic">
                                                ${getBestPrice(selectedParts[cat.id]).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setActiveCategory(cat.id); setIsModalOpen(true); }}
                                    className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:scale-110 transition-transform shadow-md"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 dark:bg-slate-900/80 backdrop-blur-xl text-white p-8 rounded-[3.5rem] shadow-2xl sticky top-24 border border-white/5">
                        <div className="text-center mb-10">
                            <div className="inline-block p-4 rounded-full bg-cyan-500/10 mb-4">
                                <Trophy className="text-cyan-400" size={32} />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Performance Score</p>
                            <p className="text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                                {speedScore}
                            </p>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/10">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-slate-400 uppercase">Estimated Total</span>
                                <span className="text-3xl font-black font-mono text-cyan-400">${totalPrice.toLocaleString()}</span>
                            </div>

                            <div className="grid gap-3">
                                <button
                                    onClick={handleShare}
                                    disabled={psuStatus.status === 'error'}
                                    className="w-full py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all disabled:opacity-30 disabled:hover:bg-white"
                                >
                                    <Share2 size={18} /> Share Configuration
                                </button>
                                <button className="w-full py-5 bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-cyan-600 hover:text-white transition-all">
                                    <ShoppingCart size={18} /> Purchase via Amazon
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal Selection */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl animate-in zoom-in duration-300">
                        <div className="p-8 border-b dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">Select {activeCategory}</h3>
                                {(activeCategory === 'CPU' || activeCategory === 'Mainboard') && (selectedParts['CPU'] || selectedParts['Mainboard']) && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                                        <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">
                                            Socket Match: {selectedParts['CPU']?.socket || selectedParts['Mainboard']?.socket}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-all dark:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="relative mb-8">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text" placeholder="Search components..."
                                    className="w-full pl-14 pr-6 py-5 bg-slate-100 dark:bg-black/40 rounded-[1.5rem] outline-none font-bold dark:text-white border-2 border-transparent focus:border-cyan-500 transition-all shadow-inner"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                {filteredProducts.length > 0 ? filteredProducts.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => { setSelectedParts({ ...selectedParts, [activeCategory]: p }); setIsModalOpen(false); }}
                                        className="flex items-center gap-6 p-5 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] cursor-pointer hover:border-cyan-500 border-2 border-transparent transition-all group"
                                    >
                                        <div className="w-20 h-20 rounded-2xl bg-white shadow-md overflow-hidden group-hover:scale-110 transition-transform">
                                            <img src={p.image} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[10px] font-black text-cyan-500 uppercase">{p.brand} {p.socket && `• ${p.socket}`}</p>
                                                    <p className="font-bold text-lg dark:text-white leading-tight">{p.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-black text-slate-900 dark:text-white font-mono">${getBestPrice(p).toLocaleString()}</p>
                                                    <p className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Best Price Found</p>
                                                </div>
                                            </div>

                                            {/* Store Pricing Details */}
                                            <div className="flex gap-4 mt-3 pt-3 border-t dark:border-white/5">
                                                {Object.entries(p.prices).map(([shop, price]) => (
                                                    <div key={shop} className="flex items-center gap-1.5 opacity-60">
                                                        <Store size={10} className="text-slate-400" />
                                                        <span className="text-[9px] font-bold uppercase dark:text-slate-300">{shop}: ${price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 bg-slate-50 dark:bg-black/20 rounded-[3rem]">
                                        <p className="text-slate-400 font-black uppercase italic tracking-[0.2em]">No Compatible Parts Found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}