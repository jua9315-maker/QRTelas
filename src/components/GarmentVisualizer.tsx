import React, { useState } from 'react';
import { ColorSwatch, GarmentSketch } from '../types';
import { Sparkles, Shirt, Palette } from 'lucide-react';

interface GarmentVisualizerProps {
  sketches: GarmentSketch[];
  colors: ColorSwatch[];
  fabricName: string;
}

export const GarmentVisualizer: React.FC<GarmentVisualizerProps> = ({
  sketches,
  colors,
  fabricName,
}) => {
  const [selectedSketchIndex, setSelectedSketchIndex] = useState(0);
  const [activeColor, setActiveColor] = useState<ColorSwatch>(colors[0] || { id: 'c1', name: 'Original', hex: '#F5F5DC' });

  const activeSketch = sketches[selectedSketchIndex] || sketches[0];

  return (
    <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-5 shadow-2xl border border-amber-500/20 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-700/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-amber-300 tracking-wide">
              Bocetos & Visualizador
            </h3>
            <p className="text-[11px] text-stone-400">
              Prendas confeccionadas en {fabricName}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-900/60 rounded-full border border-amber-500/40 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Interactivo
        </span>
      </div>

      {/* Main Sketch Showcase Card */}
      {activeSketch && (
        <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-700 group">
          {/* Sketch Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src={activeSketch.imageUrl}
              alt={activeSketch.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Color Overlay Simulation Tint */}
            <div
              className="absolute inset-0 mix-blend-color opacity-35 transition-colors duration-500 pointer-events-none"
              style={{ backgroundColor: activeColor.hex }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
          </div>

          {/* Active Color Tint Badge overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-stone-700 text-xs font-semibold">
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: activeColor.hex }}
            />
            <span className="text-stone-200">{activeColor.name}</span>
          </div>

          {/* Bottom Sketch Details */}
          <div className="p-4 space-y-1 relative z-10">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {activeSketch.category}
            </div>
            <h4 className="text-base font-bold text-white">{activeSketch.title}</h4>
            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              {activeSketch.description}
            </p>
          </div>
        </div>
      )}

      {/* Sketch Selector Tabs */}
      {sketches.length > 1 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            Seleccionar Boceto de Prenda:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {sketches.map((sk, idx) => (
              <button
                key={sk.id}
                onClick={() => setSelectedSketchIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border ${
                  idx === selectedSketchIndex
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {sk.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Color Swatch Bar */}
      <div className="pt-2 border-t border-stone-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            Paleta de Colores Disponible:
          </span>
          <span className="text-[11px] font-mono text-amber-400 font-bold">
            {activeColor.hex}
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto py-1 no-scrollbar">
          {colors.map((c) => {
            const isSelected = activeColor.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveColor(c)}
                className={`group/btn relative flex flex-col items-center gap-1 p-1.5 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-2 border-amber-400 scale-105'
                    : 'hover:bg-stone-800 border border-transparent'
                }`}
              >
                <div
                  className="w-9 h-9 rounded-full border-2 border-white/20 shadow-md transition-transform group-hover/btn:scale-110 flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                  )}
                </div>
                <span className="text-[10px] font-medium text-stone-300 max-w-[60px] truncate text-center">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
