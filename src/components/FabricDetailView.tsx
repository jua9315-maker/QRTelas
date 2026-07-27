import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Fabric } from '../types';
import { GarmentVisualizer } from './GarmentVisualizer';
import { generateQRCodeDataUrl } from '../lib/qrHelper';
import {
  Sparkles,
  ArrowLeft,
  QrCode,
  ShieldCheck,
  MapPin,
  Flame,
  Droplets,
  Share2,
  Copy,
  Check,
  Tag,
  Scissors,
  CheckCircle2,
} from 'lucide-react';

interface FabricDetailViewProps {
  fabric: Fabric;
  onBack: () => void;
  onScanAnother: () => void;
}

export const FabricDetailView: React.FC<FabricDetailViewProps> = ({
  fabric,
  onBack,
  onScanAnother,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'bocetos' | 'especs' | 'usos' | 'cuidados' | 'puntos'>('bocetos');

  // Trigger celebration confetti on scan view load
  useEffect(() => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981'],
    });

    generateQRCodeDataUrl(fabric.qrCode).then((url) => {
      setQrDataUrl(url);
    });
  }, [fabric]);

  const copyQRToClipboard = () => {
    navigator.clipboard.writeText(fabric.qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full max-w-md mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Floating Navigation Bar */}
      <div className="sticky top-0 z-30 bg-stone-100/90 dark:bg-stone-900/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-amber-600 transition-colors py-1 px-2.5 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Inicio
        </button>

        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase text-emerald-800 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 rounded-full border border-emerald-300/60">
            Escaneo Exitoso
          </span>
        </div>

        <button
          onClick={onScanAnother}
          className="px-3 py-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-amber-600 to-rose-600 rounded-full shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1"
        >
          <QrCode className="w-3.5 h-3.5" />
          Escanear Otra
        </button>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Main Hero Header Card */}
        <div className="relative rounded-3xl p-6 bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 text-white shadow-2xl border border-amber-500/30 overflow-hidden">
          {/* Subtle Background Accent Lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 space-y-3">
            {/* QR Identifier Tag */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-400/30">
                <Tag className="w-3.5 h-3.5" />
                {fabric.qrCode}
              </span>

              <button
                onClick={copyQRToClipboard}
                className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                title="Copiar Código QR"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Title & Material */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {fabric.name}
              </h1>
              <p className="text-xs font-semibold text-amber-400 mt-1 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                {fabric.material}
              </p>
            </div>

            {/* Texture Summary */}
            <p className="text-xs text-stone-300 leading-relaxed font-normal bg-stone-950/60 p-3 rounded-2xl border border-stone-800">
              {fabric.textureDescription}
            </p>

            {/* Primary Metrics Badges */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {fabric.weightGsm && (
                <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/80 text-center">
                  <span className="block text-[10px] text-stone-400 font-semibold uppercase">Gramaje / Peso</span>
                  <span className="text-sm font-extrabold text-amber-300">{fabric.weightGsm} g/m²</span>
                </div>
              )}
              <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/80 text-center">
                <span className="block text-[10px] text-stone-400 font-semibold uppercase">Colores Disponibles</span>
                <span className="text-sm font-extrabold text-amber-300">{fabric.colors.length} Variantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1.5 p-1 bg-stone-200 dark:bg-stone-800/80 rounded-2xl overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('bocetos')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'bocetos'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Bocetos & Colores
          </button>
          <button
            onClick={() => setActiveTab('usos')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'usos'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Usos
          </button>
          <button
            onClick={() => setActiveTab('cuidados')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'cuidados'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Cuidados
          </button>
          <button
            onClick={() => setActiveTab('puntos')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'puntos'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Puntos de Venta
          </button>
        </div>

        {/* Tab 1: Bocetos e Interactivo de prendas */}
        {activeTab === 'bocetos' && (
          <div className="space-y-4">
            <GarmentVisualizer
              sketches={fabric.sketches}
              colors={fabric.colors}
              fabricName={fabric.name}
            />

            {/* Hex Color Palette Reference */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <h3 className="text-xs font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Catálogo de Códigos Hexadecimales
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {fabric.colors.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700"
                  >
                    <div
                      className="w-8 h-8 rounded-xl border border-black/10 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate">
                        {c.name} {c.isPrimary && <span className="text-[10px] text-amber-600">(Principal)</span>}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                        {c.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Usos Recomendados */}
        {activeTab === 'usos' && (
          <div className="p-5 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Scissors className="w-5 h-5" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                Aplicaciones y Confección Recomendada
              </h3>
            </div>

            <ul className="space-y-2.5">
              {fabric.recommendedUses.map((useItem, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs font-semibold text-stone-800 dark:text-stone-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{useItem}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 3: Cuidados de Lavado */}
        {activeTab === 'cuidados' && (
          <div className="p-5 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Droplets className="w-5 h-5" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                Instrucciones de Lavado & Mantenimiento
              </h3>
            </div>

            <ul className="space-y-2.5">
              {fabric.careInstructions.map((care, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 text-xs font-semibold text-stone-800 dark:text-stone-200"
                >
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{care}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 4: Puntos de Venta Nicaragua */}
        {activeTab === 'puntos' && (
          <div className="p-5 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <MapPin className="w-5 h-5" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                Disponibilidad en Nicaragua
              </h3>
            </div>

            <div className="space-y-2">
              {fabric.nicaraguaAvailability.map((loc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs font-semibold text-stone-800 dark:text-stone-200"
                >
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>

            {fabric.supplierNote && (
              <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-[11px] text-stone-600 dark:text-stone-300 italic border border-stone-200 dark:border-stone-700">
                <strong>Nota del proveedor:</strong> {fabric.supplierNote}
              </div>
            )}
          </div>
        )}

        {/* Generated Printable QR Code Card */}
        <div className="p-5 bg-stone-900 text-white rounded-3xl border border-stone-800 shadow-xl flex flex-col items-center text-center space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <QrCode className="w-5 h-5" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
              Código QR Identificador de la Tela
            </h3>
          </div>

          {qrDataUrl ? (
            <div className="p-3 bg-white rounded-2xl shadow-inner border-2 border-amber-500/30">
              <img src={qrDataUrl} alt={`QR Code ${fabric.qrCode}`} className="w-40 h-40 object-contain" />
            </div>
          ) : (
            <div className="w-40 h-40 bg-stone-800 rounded-2xl animate-pulse flex items-center justify-center text-xs text-stone-400">
              Generando QR...
            </div>
          )}

          <div className="text-xs font-mono text-amber-300 font-bold">
            {fabric.qrCode}
          </div>

          <p className="text-[11px] text-stone-400 max-w-xs">
            Imprime o comparte este código QR para colocarlo en muestras de tela o catálogos físicos.
          </p>
        </div>
      </div>
    </div>
  );
};
