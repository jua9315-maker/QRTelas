import { Fabric, AppSettings } from '../types';
import { INITIAL_NICARAGUAN_FABRICS } from '../data/nicaraguanFabrics';

const STORAGE_KEY_FABRICS = 'qrtelas_catalog_v1';
const STORAGE_KEY_SETTINGS = 'qrtelas_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  vibrationEnabled: true,
  autoOpenDetail: true,
  theme: 'light',
  cameraFacing: 'environment'
};

export function getStoredFabrics(): Fabric[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FABRICS);
    if (!raw) {
      saveFabrics(INITIAL_NICARAGUAN_FABRICS);
      return INITIAL_NICARAGUAN_FABRICS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveFabrics(INITIAL_NICARAGUAN_FABRICS);
    return INITIAL_NICARAGUAN_FABRICS;
  } catch (e) {
    console.error('Error loading fabrics from storage:', e);
    return INITIAL_NICARAGUAN_FABRICS;
  }
}

export function saveFabrics(fabrics: Fabric[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_FABRICS, JSON.stringify(fabrics));
  } catch (e) {
    console.error('Error saving fabrics to storage:', e);
  }
}

export function addFabricToCatalog(newFabric: Fabric): Fabric[] {
  const current = getStoredFabrics();
  const updated = [newFabric, ...current];
  saveFabrics(updated);
  return updated;
}

export function deleteFabricFromCatalog(fabricId: string): Fabric[] {
  const current = getStoredFabrics();
  const updated = current.filter((f) => f.id !== fabricId);
  saveFabrics(updated);
  return updated;
}

export function bulkImportFabricsToCatalog(importedFabrics: Fabric[]): Fabric[] {
  const current = getStoredFabrics();
  const currentQrMap = new Set(current.map((f) => f.qrCode.toUpperCase()));
  
  const newItems: Fabric[] = [];
  for (const item of importedFabrics) {
    let finalQr = (item.qrCode || `QRTELAS-${Date.now()}`).trim();
    if (currentQrMap.has(finalQr.toUpperCase())) {
      finalQr = `${finalQr}-${Math.floor(Math.random() * 1000)}`;
    }
    currentQrMap.add(finalQr.toUpperCase());
    newItems.push({
      ...item,
      qrCode: finalQr,
    });
  }

  const updated = [...newItems, ...current];
  saveFabrics(updated);
  return updated;
}

export function resetFabricsCatalogToDefault(): Fabric[] {
  saveFabrics(INITIAL_NICARAGUAN_FABRICS);
  return INITIAL_NICARAGUAN_FABRICS;
}

export function getStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
}

export function findFabricByQRCode(qrCode: string): Fabric | undefined {
  const fabrics = getStoredFabrics();
  const cleanQuery = qrCode.trim().toUpperCase();
  return fabrics.find(
    (f) =>
      f.qrCode.toUpperCase() === cleanQuery ||
      f.id.toUpperCase() === cleanQuery ||
      cleanQuery.includes(f.qrCode.toUpperCase())
  );
}
