import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { AppSettings, Fabric } from '../types';
import {
  X,
  Settings,
  Volume2,
  VolumeX,
  Vibrate,
  RotateCcw,
  Download,
  Upload,
  ShieldAlert,
  ShieldCheck,
  LogOut,
  PlusCircle,
  BookOpen,
  Search,
  Trash2,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onResetCatalog: () => void;
  fabrics: Fabric[];
  adminUser: string | null;
  onLogoutAdmin: () => void;
  onOpenAddFabric: () => void;
  onImportFabrics: (imported: Fabric[]) => void;
  onDeleteFabric: (fabricId: string) => void;
  onSelectFabricDetail?: (fabric: Fabric) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetCatalog,
  fabrics,
  adminUser,
  onLogoutAdmin,
  onOpenAddFabric,
  onImportFabrics,
  onDeleteFabric,
  onSelectFabricDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'excel' | 'system'>('catalog');
  const [searchTerm, setSearchTerm] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    onLogoutAdmin(); // Automatically log out admin session upon exiting settings
    onClose();
  };

  // Export to Excel (.xlsx)
  const handleExportExcel = () => {
    try {
      const exportRows = fabrics.map((f) => ({
        'Código QR': f.qrCode,
        'Nombre de Tela': f.name,
        'Material / Composición': f.material,
        'Peso (gsm)': f.weightGsm || '',
        'Textura / Descripción': f.textureDescription || '',
        'Colores': f.colors ? f.colors.map((c) => c.name).join(', ') : '',
        'Usos Recomendados': f.recommendedUses ? f.recommendedUses.join(', ') : '',
        'Instrucciones de Cuidado': f.careInstructions ? f.careInstructions.join(', ') : '',
        'Disponibilidad en Nicaragua': f.nicaraguaAvailability ? f.nicaraguaAvailability.join(', ') : '',
        'Nota de Proveedor': f.supplierNote || '',
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportRows);
      
      // Auto-adjust column widths for clarity
      worksheet['!cols'] = [
        { wch: 22 }, // Código QR
        { wch: 25 }, // Nombre
        { wch: 28 }, // Material
        { wch: 12 }, // Peso
        { wch: 35 }, // Textura
        { wch: 25 }, // Colores
        { wch: 30 }, // Usos
        { wch: 30 }, // Cuidados
        { wch: 35 }, // Disponibilidad
        { wch: 25 }, // Proveedor
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Catálogo de Telas');

      const dateStr = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(workbook, `QRTelas_Catalogo_Nicaragua_${dateStr}.xlsx`);
      
      setImportStatus({
        type: 'success',
        message: `Catálogo exportado exitosamente a Excel (${fabrics.length} telas).`,
      });
    } catch (error) {
      console.error('Error exporting Excel:', error);
      setImportStatus({
        type: 'error',
        message: 'No se pudo generar el archivo de Excel. Inténtalo de nuevo.',
      });
    }
  };

  // Import from Excel / CSV (.xlsx, .xls, .csv)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

        if (!rawRows || rawRows.length === 0) {
          setImportStatus({
            type: 'error',
            message: 'El archivo Excel seleccionado está vacío o no contiene filas.',
          });
          return;
        }

        const newFabrics: Fabric[] = rawRows.map((row, index) => {
          const qrCode =
            row['Código QR'] ||
            row['Codigo QR'] ||
            row['qrCode'] ||
            row['QR'] ||
            row['Código'] ||
            `QRTELAS-IMP-${Date.now()}-${index + 1}`;

          const name =
            row['Nombre de Tela'] ||
            row['Nombre'] ||
            row['name'] ||
            `Tela Importada ${index + 1}`;

          const material =
            row['Material / Composición'] ||
            row['Material'] ||
            row['Composición'] ||
            row['material'] ||
            'Textil Tradicional';

          const weightGsm = Number(row['Peso (gsm)'] || row['Peso'] || row['weightGsm']) || 180;

          const textureDescription =
            row['Textura / Descripción'] ||
            row['Textura'] ||
            row['Descripción'] ||
            'Tela registrada desde importación Excel.';

          const recommendedUsesStr =
            row['Usos Recomendados'] || row['Usos'] || row['recommendedUses'] || '';
          const recommendedUses = typeof recommendedUsesStr === 'string' && recommendedUsesStr.trim().length > 0
            ? recommendedUsesStr.split(',').map((s) => s.trim())
            : ['Confección general', 'Artesanía nicaragüense'];

          const careInstructionsStr =
            row['Instrucciones de Cuidado'] || row['Cuidados'] || row['careInstructions'] || '';
          const careInstructions = typeof careInstructionsStr === 'string' && careInstructionsStr.trim().length > 0
            ? careInstructionsStr.split(',').map((s) => s.trim())
            : ['Lavar a mano', 'Secar a la sombra'];

          const nicaraguaAvailabilityStr =
            row['Disponibilidad en Nicaragua'] || row['Disponibilidad'] || row['Mercado'] || '';
          const nicaraguaAvailability = typeof nicaraguaAvailabilityStr === 'string' && nicaraguaAvailabilityStr.trim().length > 0
            ? nicaraguaAvailabilityStr.split(',').map((s) => s.trim())
            : ['Mercado Oriental, Managua', 'Masaya'];

          const supplierNote = row['Nota de Proveedor'] || row['Proveedor'] || '';

          return {
            id: `fabric-imp-${Date.now()}-${index}-${Math.floor(Math.random() * 1000)}`,
            qrCode: String(qrCode).trim(),
            name: String(name).trim(),
            material: String(material).trim(),
            weightGsm,
            textureDescription: String(textureDescription).trim(),
            colors: [
              { id: 'c1', name: 'Color Base', hex: '#d97706', isPrimary: true },
              { id: 'c2', name: 'Acento Natural', hex: '#059669' },
            ],
            sketches: [],
            recommendedUses,
            careInstructions,
            nicaraguaAvailability,
            supplierNote: String(supplierNote).trim(),
            createdAt: new Date().toISOString(),
          };
        });

        onImportFabrics(newFabrics);

        setImportStatus({
          type: 'success',
          message: `¡Se importaron exitosamente ${newFabrics.length} telas al catálogo!`,
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (err) {
        console.error('Error parsing Excel:', err);
        setImportStatus({
          type: 'error',
          message: 'Error al leer el archivo Excel. Asegúrate de que tenga un formato válido (.xlsx, .csv).',
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const filteredFabrics = fabrics.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.qrCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg mx-auto bg-stone-50 dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto">
        
        {/* Header Bar */}
        <div className="px-5 py-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-stone-900 dark:text-stone-100 tracking-tight">
                Configuraciones QRTelas
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Catálogo, Excel y Ajustes
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300"
            title="Guardar y Salir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 px-2 pt-2 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-2.5 px-3 rounded-t-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'catalog'
                ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 border-t-2 border-amber-500 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Catálogo ({fabrics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('excel')}
            className={`flex-1 py-2.5 px-3 rounded-t-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'excel'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 border-t-2 border-emerald-500 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel / CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 py-2.5 px-3 rounded-t-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'system'
                ? 'bg-white dark:bg-stone-900 text-indigo-700 dark:text-indigo-400 border-t-2 border-indigo-500 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Sistema</span>
          </button>
        </div>

        {/* Status Notification Banner */}
        {importStatus && (
          <div
            className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-bold animate-in fade-in shrink-0 ${
              importStatus.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {importStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{importStatus.message}</span>
            </div>
            <button
              onClick={() => setImportStatus(null)}
              className="p-1 rounded-full hover:bg-black/10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab 1: Catalog Management inside Settings */}
        {activeTab === 'catalog' && (
          <div className="p-4 space-y-3 overflow-y-auto flex-1">
            {/* Top Action Bar: Add Fabric */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-stone-500 dark:text-stone-400 tracking-wider">
                  Gestión de Telas Registradas
                </h3>
                <p className="text-[11px] text-stone-400">
                  Agrega, busca o administra telas en la base de datos
                </p>
              </div>

              <button
                onClick={onOpenAddFabric}
                className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all shrink-0 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Agregar Tela</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código QR, nombre o material..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Fabrics List */}
            <div className="space-y-2 mt-2">
              {filteredFabrics.length === 0 ? (
                <div className="p-6 text-center text-stone-400 bg-white dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <p className="text-xs font-semibold">No se encontraron telas en la búsqueda.</p>
                </div>
              ) : (
                filteredFabrics.map((fabric) => (
                  <div
                    key={fabric.id}
                    className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between gap-3 hover:border-amber-400/60 transition-colors"
                  >
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => onSelectFabricDetail && onSelectFabricDetail(fabric)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-extrabold border border-amber-300/60">
                          {fabric.qrCode}
                        </span>
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          {fabric.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {fabric.material} • {fabric.weightGsm} g/m²
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar "${fabric.name}" (${fabric.qrCode}) del catálogo?`)) {
                          onDeleteFabric(fabric.id);
                        }
                      }}
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="Eliminar Tela"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Excel / CSV Import & Export */}
        {activeTab === 'excel' && (
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            <div className="p-4 bg-emerald-500/10 dark:bg-emerald-950/40 rounded-2xl border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Intercambio de Datos Excel (.xlsx)
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Exporta la lista completa de telas a un archivo de Excel para respaldo o importa masivamente nuevas telas desde hojas de cálculo.
              </p>
            </div>

            {/* Export to Excel */}
            <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
              <div>
                <h4 className="text-xs font-extrabold text-stone-800 dark:text-stone-100">
                  1. Exportar Catálogo a Excel
                </h4>
                <p className="text-[11px] text-stone-400">
                  Descarga un archivo .xlsx con todas las columnas ({fabrics.length} telas registradas).
                </p>
              </div>

              <button
                onClick={handleExportExcel}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Download className="w-4 h-4" />
                Exportar a Excel (.xlsx)
              </button>
            </div>

            {/* Import from Excel */}
            <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
              <div>
                <h4 className="text-xs font-extrabold text-stone-800 dark:text-stone-100">
                  2. Importar Telas desde Excel o CSV
                </h4>
                <p className="text-[11px] text-stone-400">
                  Sube un archivo .xlsx o .csv con columnas como Código QR, Nombre, Material, etc.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-file-import-input"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Upload className="w-4 h-4" />
                Seleccionar Archivo Excel
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: System & Reset */}
        {activeTab === 'system' && (
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {/* Admin User Status Banner */}
            {adminUser && (
              <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-950/40 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      Administrador Activo
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Usuario: <span className="font-mono underline">{adminUser}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 hover:bg-rose-200 text-[11px] font-bold flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Salir y Bloquear
                </button>
              </div>
            )}

            {/* Sound & Vibration */}
            <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
              <h3 className="text-xs font-extrabold uppercase text-stone-400 tracking-wider">
                Retroalimentación Auditiva y Háptica
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {settings.soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-amber-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-stone-400" />
                  )}
                  <div>
                    <span className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                      Sonido al Escanear
                    </span>
                    <span className="text-[11px] text-stone-400">Tono auditivo al detectar QR</span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => onUpdateSettings({ ...settings, soundEnabled: e.target.checked })}
                  className="w-5 h-5 accent-amber-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700/60">
                <div className="flex items-center gap-2.5">
                  <Vibrate className="w-4 h-4 text-indigo-600" />
                  <div>
                    <span className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                      Vibración Háptica
                    </span>
                    <span className="text-[11px] text-stone-400">Vibra al encontrar la tela</span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={settings.vibrationEnabled}
                  onChange={(e) => onUpdateSettings({ ...settings, vibrationEnabled: e.target.checked })}
                  className="w-5 h-5 accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Reset Defaults */}
            <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/40 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                Restablecer Datos de Nicaragua
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-300">
                Restaura el catálogo original de telas tradicionales de Nicaragua.
              </p>
              <button
                onClick={() => {
                  if (confirm('¿Deseas restablecer el catálogo de telas a los datos por defecto de Nicaragua?')) {
                    onResetCatalog();
                    alert('Catálogo restablecido correctamente.');
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Restablecer Telas de Nicaragua
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-center shrink-0">
          <button
            onClick={handleClose}
            className="w-full py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-amber-500 transition-colors"
          >
            Guardar Cambios y Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
