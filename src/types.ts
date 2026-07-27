export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  isPrimary?: boolean;
}

export interface GarmentSketch {
  id: string;
  title: string;
  category: 'vestido' | 'huipil' | 'guayabera' | 'traje' | 'decoracion' | 'casual';
  imageUrl: string;
  description: string;
}

export interface Fabric {
  id: string;
  qrCode: string; // e.g. QRTELAS-MANTA-001
  name: string; // e.g. Manta de Masaya
  material: string; // e.g. 100% Algodón Nicaragüense
  weightGsm?: number; // e.g. 180 g/m²
  textureDescription: string;
  colors: ColorSwatch[];
  sketches: GarmentSketch[];
  recommendedUses: string[];
  careInstructions: string[];
  nicaraguaAvailability: string[]; // e.g. Mercado de Artesanías de Masaya, Mercado Oriental Managua
  supplierNote?: string;
  createdAt: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  autoOpenDetail: boolean;
  theme: 'light' | 'dark' | 'terracotta';
  cameraFacing: 'environment' | 'user';
}
