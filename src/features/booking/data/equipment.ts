export type EquipmentCategory =
  | 'Excavator'
  | 'Dozer'
  | 'Loader'
  | 'Compaction'
  | 'Telehandler'
  | 'Dump Truck'
  | 'Grader';

export interface Equipment {
  id: string;
  name: string;
  model: string;
  category: EquipmentCategory;
  dailyRate: number;
  stock: number;
  specs: { label: string; value: string }[];
  description: string;
  color: string;
}

export const equipment: Equipment[] = [
  // --- Excavators ---
  {
    id: 'exc-1',
    name: 'CAT 320',
    model: 'Caterpillar 320 GC',
    category: 'Excavator',
    dailyRate: 1200,
    stock: 4,
    specs: [{ label: 'Bucket', value: '1.19 m³' }, { label: 'Weight', value: '20,300 kg' }],
    description: 'Mid-size hydraulic excavator ideal for general earthmoving and construction.',
    color: '#f59e0b',
  },
  {
    id: 'exc-2',
    name: 'Komatsu PC200',
    model: 'Komatsu PC200-8M0',
    category: 'Excavator',
    dailyRate: 1100,
    stock: 3,
    specs: [{ label: 'Bucket', value: '0.93 m³' }, { label: 'Weight', value: '19,800 kg' }],
    description: 'Versatile excavator with excellent fuel efficiency and low running cost.',
    color: '#3b82f6',
  },
  {
    id: 'exc-3',
    name: 'Hitachi ZX200',
    model: 'Hitachi Zaxis 200-7',
    category: 'Excavator',
    dailyRate: 1050,
    stock: 2,
    specs: [{ label: 'Bucket', value: '0.90 m³' }, { label: 'Weight', value: '20,500 kg' }],
    description: 'Reliable medium excavator for earthmoving, demolition and trenching.',
    color: '#ef4444',
  },

  // --- Dozers ---
  {
    id: 'doz-1',
    name: 'CAT D6',
    model: 'Caterpillar D6 XE',
    category: 'Dozer',
    dailyRate: 1850,
    stock: 1,
    specs: [{ label: 'Blade', value: 'SU 4.51 m' }, { label: 'Weight', value: '22,700 kg' }],
    description: 'Electric drive dozer with superior fuel savings for heavy grading and pushing.',
    color: '#f97316',
  },
  {
    id: 'doz-2',
    name: 'Komatsu D85',
    model: 'Komatsu D85EX-18',
    category: 'Dozer',
    dailyRate: 2000,
    stock: 2,
    specs: [{ label: 'Blade', value: 'SU 4.94 m' }, { label: 'Weight', value: '28,800 kg' }],
    description: 'Large crawler dozer for bulk earthmoving, land clearing and heavy push work.',
    color: '#d97706',
  },

  // --- Loaders ---
  {
    id: 'ldr-1',
    name: 'Volvo L90H',
    model: 'Volvo L90H Wheel Loader',
    category: 'Loader',
    dailyRate: 1300,
    stock: 3,
    specs: [{ label: 'Bucket', value: '2.7 m³' }, { label: 'Tip Load', value: '10,500 kg' }],
    description: 'Powerful wheel loader for loading, carrying and stockpiling bulk materials.',
    color: '#10b981',
  },
  {
    id: 'ldr-2',
    name: 'JCB 3CX',
    model: 'JCB 3CX Backhoe Loader',
    category: 'Loader',
    dailyRate: 850,
    stock: 5,
    specs: [{ label: 'Dig Depth', value: '5.97 m' }, { label: 'Weight', value: '8,420 kg' }],
    description: 'Versatile backhoe loader — load on the front, dig and trench on the back.',
    color: '#f59e0b',
  },
  {
    id: 'ldr-3',
    name: 'CAT 226D',
    model: 'CAT 226D3 Skid Steer',
    category: 'Loader',
    dailyRate: 650,
    stock: 6,
    specs: [{ label: 'Rated Load', value: '998 kg' }, { label: 'Weight', value: '2,870 kg' }],
    description: 'Compact skid steer loader ideal for confined sites and light earthmoving.',
    color: '#f97316',
  },

  // --- Compaction ---
  {
    id: 'cmp-1',
    name: 'Dynapac CA2500',
    model: 'Dynapac CA2500D Roller',
    category: 'Compaction',
    dailyRate: 750,
    stock: 3,
    specs: [{ label: 'Drum Width', value: '2.13 m' }, { label: 'Weight', value: '11,500 kg' }],
    description: 'Smooth drum vibratory roller for compacting sub-base and asphalt layers.',
    color: '#6366f1',
  },
  {
    id: 'cmp-2',
    name: 'Wacker WP1540',
    model: 'Wacker Neuson WP1540A',
    category: 'Compaction',
    dailyRate: 120,
    stock: 8,
    specs: [{ label: 'Plate', value: '400 × 500 mm' }, { label: 'Weight', value: '68 kg' }],
    description: 'Petrol plate compactor for compacting granular soils, gravel and asphalt patches.',
    color: '#8b5cf6',
  },

  // --- Telehandlers ---
  {
    id: 'tel-1',
    name: 'JLG 4017RS',
    model: 'JLG 4017RS Telehandler',
    category: 'Telehandler',
    dailyRate: 900,
    stock: 2,
    specs: [{ label: 'Lift Height', value: '17.0 m' }, { label: 'Capacity', value: '4,000 kg' }],
    description: 'Rotating telehandler for precise placement of materials at height on all terrains.',
    color: '#14b8a6',
  },
  {
    id: 'tel-2',
    name: 'Manitou MT 1840',
    model: 'Manitou MT 1840 Easy',
    category: 'Telehandler',
    dailyRate: 950,
    stock: 3,
    specs: [{ label: 'Lift Height', value: '18.0 m' }, { label: 'Capacity', value: '4,000 kg' }],
    description: 'Straight-mast telehandler with wide reach for construction and agricultural sites.',
    color: '#0ea5e9',
  },

  // --- Dump Trucks ---
  {
    id: 'dmp-1',
    name: 'Volvo A25G',
    model: 'Volvo A25G ADT',
    category: 'Dump Truck',
    dailyRate: 1450,
    stock: 2,
    specs: [{ label: 'Payload', value: '24,000 kg' }, { label: 'Body', value: '15.0 m³' }],
    description: 'Articulated dump truck for off-road haulage on rough and steep terrain.',
    color: '#22c55e',
  },

  // --- Graders ---
  {
    id: 'grd-1',
    name: 'CAT 140',
    model: 'Caterpillar 140 Motor Grader',
    category: 'Grader',
    dailyRate: 1650,
    stock: 1,
    specs: [{ label: 'Blade', value: '3.66 m' }, { label: 'Weight', value: '17,200 kg' }],
    description: 'Motor grader for fine grading, shaping and maintaining roads and pads.',
    color: '#a855f7',
  },
];

export const categories = [...new Set(equipment.map((e) => e.category))] as EquipmentCategory[];
