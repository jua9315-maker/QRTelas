import React, { useState } from 'react';
import { Lock, User, Key, X, ShieldCheck, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (adminUsername: string) => void;
  targetAction?: string | null;
}

const ADMIN_CREDENTIALS = [
  { username: 'jangulo', password: 'jcar9315', name: 'J. Angulo' },
  { username: 'mmorales', password: 'torres23', name: 'M. Morales' },
];

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  targetAction,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUser = username.trim().toLowerCase();
    const matchedAdmin = ADMIN_CREDENTIALS.find(
      (admin) => admin.username.toLowerCase() === cleanUser && admin.password === password
    );

    if (matchedAdmin) {
      onLoginSuccess(matchedAdmin.username);
      setUsername('');
      setPassword('');
      setError(null);
    } else {
      setError('Usuario o contraseña de administrador incorrectos.');
    }
  };

  const getActionLabel = () => {
    if (targetAction === 'catalog') return 'acceder al Catálogo de Telas';
    if (targetAction === 'addFabric') return 'agregar o registrar nuevas telas';
    if (targetAction === 'settings') return 'acceder a las Configuraciones del sistema';
    return 'acceder a las Herramientas de Administrador';
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight text-white uppercase">
                Acceso Administrador
              </h2>
              <p className="text-[11px] text-amber-400 font-semibold">
                Área Protegida QRTelas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
              Para <strong className="text-amber-700 dark:text-amber-400">{getActionLabel()}</strong> debe iniciar sesión con una cuenta de administrador.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-semibold animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Usuario Administrador
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-stone-400 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jangulo o mmorales"
                required
                className="w-full pl-9 pr-3 py-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-stone-400 pointer-events-none">
                <Key className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-10 py-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <ShieldCheck className="w-4 h-4" />
              Iniciar Sesión Admin
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 font-semibold text-xs transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
