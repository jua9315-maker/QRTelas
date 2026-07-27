import React, { useState, useRef, useEffect } from 'react';
import { Settings, BookOpen, PlusCircle, Info, Sliders, LogOut } from 'lucide-react';

interface HeaderProps {
  onOpenCatalog: () => void;
  onOpenAddFabric: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  adminUser: string | null;
  onLogoutAdmin: () => void;
  onRequestAdminAuth: (targetAction?: 'catalog' | 'addFabric' | 'settings') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCatalog,
  onOpenAddFabric,
  onOpenSettings,
  onOpenAbout,
  adminUser,
  onLogoutAdmin,
  onRequestAdminAuth,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (menuOpen && adminUser) {
          // Auto logout when closing tools menu by clicking outside
          onLogoutAdmin();
        }
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, adminUser, onLogoutAdmin]);

  const handleGearClick = () => {
    if (!adminUser) {
      // Prompt for admin login
      onRequestAdminAuth('settings');
    } else {
      // Toggle menu if already logged in
      if (menuOpen) {
        onLogoutAdmin();
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    }
  };

  return (
    <header className="relative w-full px-4 py-3 flex items-center justify-between z-30 border-b border-stone-200/40 dark:border-stone-800/40 bg-transparent">
      {/* Blank left side - no text, no user badges, completely empty */}
      <div className="flex-1" />

      {/* Small Gear Tools Button on top right */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={handleGearClick}
          id="btn-tools-gear"
          aria-label="Herramientas de Configuración"
          className={`p-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center border shadow-sm ${
            menuOpen
              ? 'bg-amber-600 text-white border-amber-600 rotate-90 shadow-md ring-2 ring-amber-400/50'
              : 'bg-white/90 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-amber-950/50 hover:text-amber-700'
          }`}
          title="Herramientas y Configuraciones"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Dropdown Menu (Only visible when unlocked for Admin) */}
        {menuOpen && adminUser && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 bg-stone-900 text-white flex items-center justify-between border-b border-amber-500/20">
              <p className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
                <Sliders className="w-3.5 h-3.5" />
                Panel Administrador
              </p>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                {adminUser}
              </span>
            </div>

            <div className="p-1.5 space-y-1">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCatalog();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300 transition-colors font-medium text-sm"
              >
                <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="leading-tight font-bold">Catálogo de Telas</div>
                  <div className="text-[11px] text-stone-400 font-normal">Ver catálogo completo</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAddFabric();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300 transition-colors font-medium text-sm"
              >
                <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="leading-tight font-bold">Agregar Nueva Tela</div>
                  <div className="text-[11px] text-stone-400 font-normal">Registrar en catálogo</div>
                </div>
              </button>

              <div className="my-1 border-t border-stone-100 dark:border-stone-800" />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-medium text-sm"
              >
                <div className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="leading-tight font-bold">Configuraciones</div>
                  <div className="text-[11px] text-stone-400 font-normal">Ajustes del sistema</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAbout();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-medium text-sm"
              >
                <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <div className="leading-tight font-bold">Acerca de QRTelas</div>
                  <div className="text-[11px] text-stone-400 font-normal">Información de la app</div>
                </div>
              </button>

              <div className="my-1 border-t border-stone-100 dark:border-stone-800" />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogoutAdmin();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir y Bloquear</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
