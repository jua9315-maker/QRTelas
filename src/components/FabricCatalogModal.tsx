import React, { useState } from 'react';
import { Fabric } from '../types';
import {
  X,
  Search,
  PlusCircle,
  BookOpen,
  QrCode,
  Tag,
  Scissors,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface FabricCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabrics: Fabric[];
  onSelectFabric: (fabric: Fabric) => void;
  onOpenAddFabric: () => void;
}

export const FabricCatalogModal: React.FC<FabricCatalogModalProps> = ({
  isOpen,
  onClose,
  fabrics,
  onSelectFabric,
  onOpenAddFabric,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string>('todos');

  if (!isOpen) return null;

  // Extract unique materials
  const materialsList = Array.from(
    new Set(fabrics.map((f) => f.material.split(' ')[0] || f.material))
  );

  const filteredFabrics = fabrics.filter((fabric) => {
    const matchesSearch =
      fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fabric.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fabric.qrCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedMaterialFilter === 'todos' ||
      fabric.material.toLowerCase().includes(selectedMaterialFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg mx-auto bg-stone-50 dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900 dark:text-stone-100 tracking-tight">
                Catálogo de Telas
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {fabrics.length} telas registradas en Nicaragua
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAddFabric();
              }}
              className="p-2 px-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Agregar Tela</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Material Filter Controls */}
        <div className="p-4 bg-white/60 dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800 space-y-3 shrink-0">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, material o código QR..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs font-medium border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
            <span className="text-[11px] text-stone-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3" />
              Filtro:
            </span>
            <button
              onClick={() => setSelectedMaterialFilter('todos')}
              className={`px-3 py-1 rounded-full shrink-0 transition-colors ${
                selectedMaterialFilter === 'todos'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              Todos ({fabrics.length})
            </button>
            {materialsList.map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterialFilter(mat)}
                className={`px-3 py-1 rounded-full shrink-0 transition-colors ${
                  selectedMaterialFilter === mat
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Fabric Grid Catalog List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredFabrics.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-3">
              <Scissors className="w-10 h-10 mx-auto text-stone-300" />
              <p className="text-sm font-semibold">No se encontraron telas con esa búsqueda.</p>
              <button
                onClick={onOpenAddFabric}
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
              >
                Registrar Nueva Tela
              </button>
            </div>
          ) : (
            filteredFabrics.map((fabric) => (
              <div
                key={fabric.id}
                onClick={() => {
                  onClose();
                  onSelectFabric(fabric);
                }}
                className="group p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-md border border-amber-300/40 shrink-0">
                      {fabric.qrCode}
                    </span>
                    <span className="text-xs font-semibold text-stone-400 truncate">
                      {fabric.material}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                    {fabric.name}
                  </h3>

                  {/* Color Palette Indicators */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-semibold text-stone-400 uppercase">Colores:</span>
                    <div className="flex items-center gap-1">
                      {fabric.colors.slice(0, 5).map((c) => (
                        <span
                          key={c.id}
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                          title={`${c.name} (${c.hex})`}
                        />
                      ))}
                      {fabric.colors.length > 5 && (
                        <span className="text-[10px] text-stone-400 font-bold">
                          +{fabric.colors.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-400 group-hover:text-amber-600 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition-colors shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 dark:bg-stone-900/90 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Total: {filteredFabrics.length} resultados</span>
          <button
            onClick={() => {
              onClose();
              onOpenAddFabric();
            }}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            + Agregar Tela a Nicaragua
          </button>
        </div>
      </div>
    </div>
  );
};
