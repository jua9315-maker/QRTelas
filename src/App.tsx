import React, { useState, useEffect } from 'react';
import { Fabric, AppSettings } from './types';
import {
  getStoredFabrics,
  addFabricToCatalog,
  deleteFabricFromCatalog,
  bulkImportFabricsToCatalog,
  resetFabricsCatalogToDefault,
  getStoredSettings,
  saveStoredSettings,
  findFabricByQRCode,
} from './lib/storage';
import { playScanSound, triggerVibration } from './lib/feedback';

import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { FabricDetailView } from './components/FabricDetailView';
import { QRScannerModal } from './components/QRScannerModal';
import { FabricCatalogModal } from './components/FabricCatalogModal';
import { AddFabricModal } from './components/AddFabricModal';
import { SettingsModal } from './components/SettingsModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AboutModal } from './components/AboutModal';
import { AlertTriangle, PlusCircle, Smartphone } from 'lucide-react';

export default function App() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [settings, setSettings] = useState<AppSettings>(getStoredSettings());

  // Admin Authentication State (Transient per session, auto-closes on exit)
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [pendingTargetAction, setPendingTargetAction] = useState<'catalog' | 'addFabric' | 'settings' | null>(null);

  // Views & Modals State
  const [activeView, setActiveView] = useState<'home' | 'detail'>('home');
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isAddFabricOpen, setIsAddFabricOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // NotFound QR Alert state
  const [notFoundQr, setNotFoundQr] = useState<string | null>(null);

  useEffect(() => {
    const loadedFabrics = getStoredFabrics();
    setFabrics(loadedFabrics);
  }, []);

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  const handleResetCatalog = () => {
    const defaultFabrics = resetFabricsCatalogToDefault();
    setFabrics(defaultFabrics);
    if (selectedFabric) {
      const match = defaultFabrics.find((f) => f.id === selectedFabric.id);
      setSelectedFabric(match || null);
      if (!match) setActiveView('home');
    }
  };

  const handleAddFabric = (newFabric: Fabric) => {
    const updated = addFabricToCatalog(newFabric);
    setFabrics(updated);
    setSelectedFabric(newFabric);
    setActiveView('detail');
  };

  const handleDeleteFabric = (fabricId: string) => {
    const updated = deleteFabricFromCatalog(fabricId);
    setFabrics(updated);
    if (selectedFabric?.id === fabricId) {
      setSelectedFabric(null);
      setActiveView('home');
    }
  };

  const handleImportFabrics = (importedFabrics: Fabric[]) => {
    const updated = bulkImportFabricsToCatalog(importedFabrics);
    setFabrics(updated);
  };

  // QR Code Detected Event Handler
  const handleQRDetected = (scannedCode: string) => {
    setIsScannerOpen(false);

    const match = findFabricByQRCode(scannedCode);

    if (match) {
      if (settings.soundEnabled) playScanSound();
      if (settings.vibrationEnabled) triggerVibration();

      setSelectedFabric(match);
      setActiveView('detail');
      setNotFoundQr(null);
    } else {
      setNotFoundQr(scannedCode);
    }
  };

  // Admin Guard Wrapper
  const requireAdminAccess = (action: 'catalog' | 'addFabric' | 'settings', onSuccess: () => void) => {
    if (adminUser) {
      onSuccess();
    } else {
      setPendingTargetAction(action);
      setIsAdminAuthOpen(true);
    }
  };

  const handleAdminLoginSuccess = (username: string) => {
    setAdminUser(username);
    setIsAdminAuthOpen(false);

    // Fulfill pending action after login
    if (pendingTargetAction === 'catalog') {
      setIsCatalogOpen(true);
    } else if (pendingTargetAction === 'addFabric') {
      setIsAddFabricOpen(true);
    } else {
      setIsSettingsOpen(true);
    }
    setPendingTargetAction(null);
  };

  const handleLogoutAdmin = () => {
    setAdminUser(null);
    setIsCatalogOpen(false);
    setIsAddFabricOpen(false);
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-900 dark:text-stone-100 font-sans antialiased flex flex-col items-center justify-center sm:py-6 sm:px-4 selection:bg-amber-500 selection:text-white">
      {/* Mobile Shell Frame Container */}
      <div className="w-full max-w-md bg-stone-50 dark:bg-stone-950 sm:rounded-[40px] shadow-2xl border-0 sm:border-8 sm:border-stone-800 min-h-screen sm:min-h-[840px] flex flex-col relative overflow-hidden my-auto">
        
        {/* Status Bar Accent (Simulated Mobile APK notch) */}
        <div className="hidden sm:flex items-center justify-between px-6 py-2 bg-stone-100 dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800 text-[10px] font-mono text-stone-400 select-none">
          <div className="flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-amber-500" />
            <span>QRTelas APK • Nic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>3:00 PM</span>
          </div>
        </div>

        {/* Header Bar with Gear Settings Menu */}
        <Header
          onOpenCatalog={() => requireAdminAccess('catalog', () => setIsCatalogOpen(true))}
          onOpenAddFabric={() => requireAdminAccess('addFabric', () => setIsAddFabricOpen(true))}
          onOpenSettings={() => requireAdminAccess('settings', () => setIsSettingsOpen(true))}
          onOpenAbout={() => setIsAboutOpen(true)}
          adminUser={adminUser}
          onLogoutAdmin={handleLogoutAdmin}
          onRequestAdminAuth={(action) => requireAdminAccess(action || 'settings', () => setIsSettingsOpen(true))}
        />

        {/* Main View Area */}
        <main className="flex-1 flex flex-col overflow-y-auto relative">
          {activeView === 'home' && (
            <HomeView
              onStartScanner={() => setIsScannerOpen(true)}
            />
          )}

          {activeView === 'detail' && selectedFabric && (
            <FabricDetailView
              fabric={selectedFabric}
              onBack={() => setActiveView('home')}
              onScanAnother={() => setIsScannerOpen(true)}
            />
          )}
        </main>
      </div>

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleQRDetected}
      />

      {/* Fabric Catalog Modal (Requires Admin) */}
      <FabricCatalogModal
        isOpen={isCatalogOpen && !!adminUser}
        onClose={() => {
          setIsCatalogOpen(false);
          handleLogoutAdmin();
        }}
        fabrics={fabrics}
        onSelectFabric={(fabric) => {
          setSelectedFabric(fabric);
          setActiveView('detail');
          handleLogoutAdmin();
        }}
        onOpenAddFabric={() => requireAdminAccess('addFabric', () => setIsAddFabricOpen(true))}
      />

      {/* Add Fabric Modal (Requires Admin) */}
      <AddFabricModal
        isOpen={isAddFabricOpen && !!adminUser}
        onClose={() => {
          setIsAddFabricOpen(false);
        }}
        onAddFabric={handleAddFabric}
      />

      {/* Admin Auth Login Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => {
          setIsAdminAuthOpen(false);
          setPendingTargetAction(null);
        }}
        onLoginSuccess={handleAdminLoginSuccess}
        targetAction={pendingTargetAction}
      />

      {/* Settings Modal (Requires Admin) */}
      <SettingsModal
        isOpen={isSettingsOpen && !!adminUser}
        onClose={() => {
          setIsSettingsOpen(false);
          handleLogoutAdmin();
        }}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetCatalog={handleResetCatalog}
        fabrics={fabrics}
        adminUser={adminUser}
        onLogoutAdmin={handleLogoutAdmin}
        onOpenAddFabric={() => setIsAddFabricOpen(true)}
        onImportFabrics={handleImportFabrics}
        onDeleteFabric={handleDeleteFabric}
        onSelectFabricDetail={(fabric) => {
          setSelectedFabric(fabric);
          setActiveView('detail');
          setIsSettingsOpen(false);
          handleLogoutAdmin();
        }}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Not Found QR Code Alert Modal */}
      {notFoundQr && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-6 border border-amber-500/30 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-300">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">
                Tela No Encontrada
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                El código QR <span className="font-mono font-bold text-amber-600">"{notFoundQr}"</span> no está registrado en el catálogo de Nicaragua.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setNotFoundQr(null);
                  requireAdminAccess('addFabric', () => setIsAddFabricOpen(true));
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                Registrar Tela (Solo Administrador)
              </button>

              <button
                onClick={() => setNotFoundQr(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
