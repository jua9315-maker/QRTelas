import { Fabric } from '../types';

export const INITIAL_NICARAGUAN_FABRICS: Fabric[] = [
  {
    id: 'manta-masaya-01',
    qrCode: 'QRTELAS-MANTA-001',
    name: 'Manta Tradicional de Masaya',
    material: '100% Algodón Rústico Nicaragüense',
    weightGsm: 160,
    textureDescription: 'Tela fresca, respirable con tejido suave en ligamento tafetán. Ideal para el clima cálido tropical de Nicaragua.',
    colors: [
      { id: 'c1', name: 'Crudo Natural', hex: '#F5F2EB', isPrimary: true },
      { id: 'c2', name: 'Azul Añil de Granada', hex: '#1E3A8A' },
      { id: 'c3', name: 'Terracota Volcánico', hex: '#C2593F' },
      { id: 'c4', name: 'Verde Pino Jalapa', hex: '#2D5A27' },
      { id: 'c5', name: 'Sol de Chinandega', hex: '#EAB308' }
    ],
    sketches: [
      {
        id: 'sk1',
        title: 'Huipil Folclórico Tradicional',
        category: 'huipil',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        description: 'Boceto de Huipil de baile típico con bordados de pita e hilos de colores en escote.'
      },
      {
        id: 'sk2',
        title: 'Guayabera Artesanal Fresca',
        category: 'guayabera',
        imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
        description: 'Guayabera de manga corta con alforzas frontales confeccionada en manta hervida.'
      },
      {
        id: 'sk3',
        title: 'Vestido Bohemio Campestre',
        category: 'vestido',
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
        description: 'Vestido largo veraniego con volantes en capas y cintura elastizada.'
      }
    ],
    recommendedUses: [
      'Trajes folclóricos y Huipiles',
      'Guayaberas tradicionales',
      'Camisas y blusas frescas de verano',
      'Mantelería y artesanías para el hogar'
    ],
    careInstructions: [
      'Lavar a mano con agua fría para prevenir encogimiento',
      'Usar jabón suave sin blanqueador',
      'Planchar a temperatura media con vapor mientras esté ligeramente húmeda',
      'Secar a la sombra para preservar el tono natural'
    ],
    nicaraguaAvailability: [
      'Mercado de Artesanías de Masaya',
      'Mercado Oriental (Sector Telas y Mercería) - Managua',
      'Taller Textil Monimbó'
    ],
    supplierNote: 'Tejida artesanalmente en telares semi-industriales de la IV Región.',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'dacron-estampado-02',
    qrCode: 'QRTELAS-DACRON-002',
    name: 'Dacrón Algodonado Estampado',
    material: '65% Poliéster / 35% Algodón Fine',
    weightGsm: 120,
    textureDescription: 'Tela ligera, sedosa y de secado ultra rápido. Muy resistente a las arrugas y excelente retención de color.',
    colors: [
      { id: 'c21', name: 'Rosa Flor de Sacuanjoche', hex: '#F472B6', isPrimary: true },
      { id: 'c22', name: 'Celeste Mar de Corn Island', hex: '#38BDF8' },
      { id: 'c23', name: 'Blanco Puro', hex: '#FFFFFF' },
      { id: 'c24', name: 'Amarillo Guanacaste', hex: '#FACC15' }
    ],
    sketches: [
      {
        id: 'sk21',
        title: 'Blusa Escolar y Escofina',
        category: 'casual',
        imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
        description: 'Blusa de corte clásico con pliegues frontales y cuello campesino.'
      },
      {
        id: 'sk22',
        title: 'Vestido Infantil de Primavera',
        category: 'vestido',
        imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
        description: 'Diseño para niñas con falda circular y lacito decorativo en espalda.'
      }
    ],
    recommendedUses: [
      'Uniformes escolares y médicos',
      'Blusas y faldas juveniles',
      'Uniformes de restaurantes y servicio',
      'Forros y fundas de almohadas'
    ],
    careInstructions: [
      'Apta para lavado en lavadora ciclo normal',
      'Secar en secadora a temperatura baja',
      'Requiere muy poco planchado'
    ],
    nicaraguaAvailability: [
      'Tiendas El Encanto - Managua / León',
      'Mercado Roberto Huembes',
      'Mercado Central de Granada'
    ],
    supplierNote: 'Variedad de estampados florales y geométricos importados para confección masiva.',
    createdAt: '2026-01-15T12:30:00Z'
  },
  {
    id: 'lino-granada-03',
    qrCode: 'QRTELAS-LINO-003',
    name: 'Lino Tropical de Granada',
    material: '100% Lino Natural de Primera Quality',
    weightGsm: 210,
    textureDescription: 'Caída elegante con relieve natural característico del lino puro. Máxima frescura y distinción ejecutiva.',
    colors: [
      { id: 'c31', name: 'Arena Ometepe', hex: '#E5D3B3', isPrimary: true },
      { id: 'c32', name: 'Marfil Colonial', hex: '#FFFDF0' },
      { id: 'c33', name: 'Azul Noche San Juan del Sur', hex: '#0F172A' },
      { id: 'c34', name: 'Verde Oliva Estelí', hex: '#556B2F' }
    ],
    sketches: [
      {
        id: 'sk31',
        title: 'Guayabera Presidencial de Gala',
        category: 'guayabera',
        imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
        description: 'Guayabera formal de manga larga con alforzas tejidas a mano y botones de concha.'
      },
      {
        id: 'sk32',
        title: 'Pantalón Lino Formal de Verano',
        category: 'traje',
        imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
        description: 'Pantalón de vestir recto sin prensas con pretina ajustable.'
      }
    ],
    recommendedUses: [
      'Guayaberas formales de gala y bodas',
      'Trajes masculinos y femeninos de clima cálido',
      'Vestidos ejecutivos de alta costura'
    ],
    careInstructions: [
      'Lavado en seco recomendado o lavado a mano muy delicado',
      'No retorcer para exprimir',
      'Planchar con vapor a temperatura alta mientras conserva humedad'
    ],
    nicaraguaAvailability: [
      'Almacenes La Universal - Managua',
      'Casas de Moda en Granada',
      'Distribuidora Textil Nicarao'
    ],
    supplierNote: 'Edición limitada de lino peinado para sastrería de etiqueta.',
    createdAt: '2026-02-01T09:00:00Z'
  },
  {
    id: 'mezclilla-nic-04',
    qrCode: 'QRTELAS-MEZCLILLA-004',
    name: 'Mezclilla / Denim Estelí 12oz',
    material: '98% Algodón / 2% Elastano (Stretch)',
    weightGsm: 340,
    textureDescription: 'Denim resistente de alto gramaje con ligera elasticidad para flexibilidad en trabajo o moda casual.',
    colors: [
      { id: 'c41', name: 'Índigo Clásico', hex: '#1D2A44', isPrimary: true },
      { id: 'c42', name: 'Azul Pre-lavado', hex: '#3B82F6' },
      { id: 'c43', name: 'Negro Azabache', hex: '#18181B' }
    ],
    sketches: [
      {
        id: 'sk41',
        title: 'Chaqueta Vaquera con Detalles Bordados',
        category: 'casual',
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
        description: 'Chaqueta de mezclilla resistente con costuras reforzadas en hilo ámbar.'
      },
      {
        id: 'sk42',
        title: 'Pantalón Jeans de Trabajo / Campo',
        category: 'traje',
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
        description: 'Corte ergonómico con remaches metálicos y bolsillos reforzados.'
      }
    ],
    recommendedUses: [
      'Pantalones jeans de uso rudo y diario',
      'Chaquetas y chalecos de campo',
      'Delantales industriales y artesanales'
    ],
    careInstructions: [
      'Lavar al revés con colores similares',
      'No usar blanqueadores ni suavizantes en exceso',
      'Secar colgado a la sombra'
    ],
    nicaraguaAvailability: [
      'Zona Franca Las Mercedes (Sobrantes exportación)',
      'Mercado Oriental - Galerías de Telas',
      'Distribuidoras de Estelí'
    ],
    supplierNote: 'Calidad de exportación confeccionada para durar años.',
    createdAt: '2026-02-10T15:40:00Z'
  },
  {
    id: 'encaje-monimbo-05',
    qrCode: 'QRTELAS-ENCAJE-005',
    name: 'Encaje Típico Bordado Monimbó',
    material: '100% Rayón de Seda e Hilos de Poliéster',
    weightGsm: 110,
    textureDescription: 'Tejido de red bordado con motivos florales nicaragüenses, calados transparenciales y suavidad táctil.',
    colors: [
      { id: 'c51', name: 'Blanco Boda Novia', hex: '#FFFFFF', isPrimary: true },
      { id: 'c52', name: 'Crema Champán', hex: '#FDF6E3' },
      { id: 'c53', name: 'Negro Gala Folclórica', hex: '#000000' }
    ],
    sketches: [
      {
        id: 'sk51',
        title: 'Chal Típico de Mestizaje',
        category: 'huipil',
        imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
        description: 'Mantilla o chal con flecos anudados a mano para gala folclórica.'
      },
      {
        id: 'sk52',
        title: 'Sobrecapa Elegantísima de Noche',
        category: 'vestido',
        imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
        description: 'Capa con caídas asimétricas sobre tul transparente.'
      }
    ],
    recommendedUses: [
      'Detalles y mangas en trajes folclóricos de Güegüense y Mestizaje',
      'Vestidos de novia y XV años',
      'Mantillas tradicionales para fiestas patronales'
    ],
    careInstructions: [
      'Lavar estrictamente a mano con champú suave',
      'No retorcer ni exprimir',
      'Planchar sobre un paño seco a temperatura muy baja'
    ],
    nicaraguaAvailability: [
      'Barrio Monimbó - Masaya',
      'Mercado de Artesanías de Masaya',
      'Mercado Oriental Managua'
    ],
    supplierNote: 'Bordados artesanales inspirados en los diseños tradicionales de la cuna del folclore.',
    createdAt: '2026-03-01T11:20:00Z'
  }
];
