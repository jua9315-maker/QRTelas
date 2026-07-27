import React from 'react';
import { X, QrCode, ShieldCheck, Sparkles, Smartphone, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md mx-auto bg-stone-50 dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-auto">
        
        <div className="px-5 py-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            QRTelas APK
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4 max-h-[75vh] overflow-y-auto">
          <Logo size="md" showSubtitle={false} />

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
              QRTelas Nicaragua
            </h2>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Plataforma Digital de Escaneo Textil
            </p>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
            QRTelas es la aplicación móvil diseñada para artesanos, sastres, diseñadores y comerciantes de textiles en Nicaragua. Permite identificar instantáneamente los tipos de tela (manta, dacrón, lino, mezclilla, encajes de Monimbó) escaneando sus códigos QR.
          </p>

          <div className="grid grid-cols-2 gap-2 text-left pt-2">
            <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              <QrCode className="w-5 h-5 text-amber-600 mb-1" />
              <div className="text-xs font-bold text-stone-800 dark:text-stone-200">Escáner QR</div>
              <div className="text-[10px] text-stone-400">Lectura instantánea de cámaras</div>
            </div>

            <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              <Sparkles className="w-5 h-5 text-rose-600 mb-1" />
              <div className="text-xs font-bold text-stone-800 dark:text-stone-200">Prendas & Bocetos</div>
              <div className="text-[10px] text-stone-400">Visualización de colores Hex</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs font-semibold text-amber-900 dark:text-amber-200 flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            Hecho para la industria textil de Nicaragua
          </div>
        </div>

        <div className="p-4 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-center text-[11px] text-stone-400">
          QRTelas • Edición 2026
        </div>
      </div>
    </div>
  );
};
