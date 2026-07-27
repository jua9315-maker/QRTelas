import React from 'react';
import { Logo } from './Logo';
import { Camera, QrCode } from 'lucide-react';

interface HomeViewProps {
  onStartScanner: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartScanner }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 py-6 max-w-md mx-auto w-full text-center select-none">
      {/* Top Main Official Logo */}
      <div className="w-full pt-2 pb-2 flex justify-center">
        <Logo size="xl" />
      </div>

      {/* Center Main Giant Scan Button */}
      <div className="my-auto flex flex-col items-center justify-center w-full py-4">
        <div className="relative group flex items-center justify-center">
          {/* Outer Golden Glow Effects */}
          <div className="absolute -inset-5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" />
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-70 group-hover:scale-105 transition-transform duration-300" />

          {/* Main Scanner Button */}
          <button
            onClick={onStartScanner}
            id="btn-scan-main"
            aria-label="Escanear Código QR de Tela"
            className="relative w-52 h-52 sm:w-60 sm:h-60 bg-stone-900 rounded-full p-3 shadow-2xl flex flex-col items-center justify-center text-white border-4 border-amber-500/40 transition-all duration-300 transform active:scale-95 group-hover:border-amber-400 group-hover:scale-[1.03]"
          >
            {/* Inner Ring Texture */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-700 via-stone-900 to-amber-950 flex flex-col items-center justify-center p-4 relative overflow-hidden border border-amber-400/40 shadow-inner">
              
              {/* Radar Scanning Line Animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 via-transparent to-transparent animate-[spin_4s_linear_infinite]" />

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-lg group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors duration-300">
                  <Camera className="w-12 h-12 stroke-[2.2]" />
                </div>

                <div className="space-y-0.5">
                  <span className="block text-xl font-black tracking-widest uppercase text-amber-300 group-hover:text-white drop-shadow">
                    ESCANEAR
                  </span>
                  <span className="block text-[11px] font-bold text-amber-200/80 uppercase tracking-wider">
                    Código QR
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <p className="mt-8 text-xs text-stone-500 dark:text-stone-400 font-semibold max-w-xs flex items-center justify-center gap-1.5">
          <QrCode className="w-4 h-4 text-amber-600 shrink-0" />
          Apunta la cámara al código QR de la tela
        </p>
      </div>

      {/* Spacer for bottom balance */}
      <div className="h-4" />
    </div>
  );
};
