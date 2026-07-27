import React, { useState } from 'react';
import { Fabric, ColorSwatch, GarmentSketch } from '../types';
import {
  X,
  PlusCircle,
  Scissors,
  Palette,
  QrCode,
  Image,
  MapPin,
  Check,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface AddFabricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFabric: (newFabric: Fabric) => void;
}

export const AddFabricModal: React.FC<AddFabricModalProps> = ({
  isOpen,
  onClose,
  onAddFabric,
}) => {
  const [name, setName] = useState('');
  const [material, setMaterial] = useState('');
  const [weightGsm, setWeightGsm] = useState<number>(150);
  const [textureDescription, setTextureDescription] = useState('');
  const [qrCode, setQrCode] = useState('');

  // Colors state
  const [colors, setColors] = useState<ColorSwatch[]>([
    { id: 'c1', name: 'Color Principal', hex: '#3B82F6', isPrimary: true },
  ]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#EC4899');

  // Sketches state
  const [sketchTitle, setSketchTitle] = useState('Vestido Tradicional');
  const [sketchCategory, setSketchCategory] = useState<GarmentSketch['category']>('vestido');
  const [sketchUrl, setSketchUrl] = useState(
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
  );

  // Recommendations & Locations
  const [uses, setUses] = useState('Trajes típicos, Guayaberas, Blusas frescas');
  const [care, setCare] = useState('Lavar a mano con agua fría, no usar blanqueador, planchar con vapor');
  const [availability, setAvailability] = useState('Mercado Oriental Managua, Mercado de Artesanías de Masaya');

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!qrCode || qrCode.startsWith('QRTELAS-')) {
      const cleanSlug = val
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 8);
      const randomId = Math.floor(100 + Math.random() * 900);
      setQrCode(`QRTELAS-${cleanSlug || 'TELA'}-${randomId}`);
    }
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setColors([
      ...colors,
      {
        id: `c_${Date.now()}`,
        name: newColorName.trim(),
        hex: newColorHex,
      },
    ]);
    setNewColorName('');
  };

  const handleRemoveColor = (id: string) => {
    if (colors.length <= 1) return;
    setColors(colors.filter((c) => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !material.trim()) {
      alert('Por favor completa el nombre de la tela y su material.');
      return;
    }

    const finalQr = qrCode.trim() || `QRTELAS-TELA-${Date.now().toString().slice(-4)}`;

    const newFabric: Fabric = {
      id: `fabric_${Date.now()}`,
      qrCode: finalQr,
      name: name.trim(),
      material: material.trim(),
      weightGsm: Number(weightGsm) || 150,
      textureDescription: textureDescription.trim() || 'Tela suave de alta calidad para confección textil.',
      colors: colors,
      sketches: [
        {
          id: `sk_${Date.now()}`,
          title: sketchTitle,
          category: sketchCategory,
          imageUrl: sketchUrl,
          description: `Diseño de prenda recomendado en tela ${name}`,
        },
      ],
      recommendedUses: uses
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean),
      careInstructions: care
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      nicaraguaAvailability: availability
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    onAddFabric(newFabric);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg mx-auto bg-stone-50 dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-5 py-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900 dark:text-stone-100 tracking-tight">
                Agregar Nueva Tela
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Registro de tela en catálogo de Nicaragua
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* General Information Section */}
          <div className="space-y-3 p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
              <Scissors className="w-4 h-4" />
              Información Básica de la Tela
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Nombre de la Tela *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ej. Manta Orgánica de Masaya, Dacrón Estampado..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-medium border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Composición / Material *
                </label>
                <input
                  type="text"
                  required
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="Ej. 100% Algodón, 65% Poli..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-medium border border-stone-300 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Peso / Gramaje (g/m²)
                </label>
                <input
                  type="number"
                  value={weightGsm}
                  onChange={(e) => setWeightGsm(Number(e.target.value))}
                  placeholder="180"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-medium border border-stone-300 dark:border-stone-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Descripción de Textura y Tacto
              </label>
              <textarea
                rows={2}
                value={textureDescription}
                onChange={(e) => setTextureDescription(e.target.value)}
                placeholder="Tela fresca, liviana, resistente a las arrugas..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-medium border border-stone-300 dark:border-stone-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center justify-between">
                <span>Código QR Identificador</span>
                <span className="text-[10px] text-amber-600 font-normal">Auto-generado</span>
              </label>
              <div className="relative">
                <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value.toUpperCase())}
                  placeholder="QRTELAS-MANTA-001"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono text-xs font-bold border border-stone-300 dark:border-stone-700"
                />
              </div>
            </div>
          </div>

          {/* Color Swatches Creator */}
          <div className="space-y-3 p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
              <Palette className="w-4 h-4" />
              Variantes de Colores y Códigos Hex
            </div>

            {/* List of current added colors */}
            <div className="space-y-2">
              {colors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-lg border border-black/20 shadow-xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-bold text-stone-800 dark:text-stone-200">{c.name}</span>
                    <span className="font-mono text-stone-400 text-[11px]">{c.hex}</span>
                  </div>

                  {colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(c.id)}
                      className="p-1 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add new color input controls */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-9 h-9 rounded-xl border-0 bg-transparent cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Nombre del color (Ej: Azul Añil)"
                className="flex-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs border border-stone-300 dark:border-stone-700"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-3 py-2 bg-stone-900 dark:bg-stone-700 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors"
              >
                + Añadir
              </button>
            </div>
          </div>

          {/* Garment Sketch Section */}
          <div className="space-y-3 p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Image className="w-4 h-4" />
              Boceto / Prenda Sugerida
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Título del Boceto
                </label>
                <input
                  type="text"
                  value={sketchTitle}
                  onChange={(e) => setSketchTitle(e.target.value)}
                  placeholder="Ej. Huipil Tradicional"
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 text-xs border border-stone-300 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Categoría
                </label>
                <select
                  value={sketchCategory}
                  onChange={(e) => setSketchCategory(e.target.value as GarmentSketch['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 text-xs border border-stone-300 dark:border-stone-700"
                >
                  <option value="huipil">Huipil Folclórico</option>
                  <option value="guayabera">Guayabera</option>
                  <option value="vestido">Vestido</option>
                  <option value="traje">Traje / Pantalón</option>
                  <option value="casual">Ropa Casual</option>
                  <option value="decoracion">Decoración / Hogar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                URL de Imagen del Boceto
              </label>
              <input
                type="url"
                value={sketchUrl}
                onChange={(e) => setSketchUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 text-xs border border-stone-300 dark:border-stone-700"
              />
            </div>
          </div>

          {/* Uses & Locations */}
          <div className="space-y-3 p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              Usos y Mercado en Nicaragua
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Usos Recomendados (Separados por coma)
              </label>
              <input
                type="text"
                value={uses}
                onChange={(e) => setUses(e.target.value)}
                placeholder="Trajes típicos, Uniformes, Camisas de vestir..."
                className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 text-xs border border-stone-300 dark:border-stone-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Disponibilidad en Mercados de Nicaragua
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="Mercado Oriental, Masaya, Granada..."
                className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 text-xs border border-stone-300 dark:border-stone-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Guardar Tela en Catálogo
          </button>
        </form>
      </div>
    </div>
  );
};
