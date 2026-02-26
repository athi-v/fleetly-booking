import exc1 from '../../../assets/images/exc-1.jpg';
import exc2 from '../../../assets/images/exc-2.jpg';
import exc3 from '../../../assets/images/exc-3.jpg';
// import doz1 from '../../../assets/images/doz-1.jpg';
// import doz2 from '../../../assets/images/doz-2.jpg';
// import ldr1 from '../../../assets/images/ldr-1.jpg';
// import ldr2 from '../../../assets/images/ldr-2.jpg';
// import ldr3 from '../../../assets/images/ldr-3.jpg';
// import cmp1 from '../../../assets/images/cmp-1.jpg';
import tel1 from '../../../assets/images/tel-1.jpg';
import dmp1 from '../../../assets/images/dmp-1.jpg';
import grd1 from '../../../assets/images/grd-1.jpg';

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
    image: string;
    dailyRate: number;
    stock: number;
    specs: { label: string; value: string }[];
    description: string;
    color: string;
}

export const equipment: Equipment[] = [
    {
        id: 'exc-1',
        name: 'CAT 320',
        model: 'Caterpillar 320 GC',
        category: 'Excavator',
        dailyRate: 1200,
        stock: 4,
        image: exc1,
        specs: [
            { label: 'Bucket', value: '1.19 m³' },
            { label: 'Weight', value: '20,300 kg' },
        ],
        description:
            'Mid-size hydraulic excavator ideal for general earthmoving and construction.',
        color: '#f59e0b',
    },
    {
        id: 'exc-2',
        name: 'Komatsu PC200',
        model: 'Komatsu PC200-8M0',
        category: 'Excavator',
        dailyRate: 1100,
        stock: 3,
        image: exc2,
        specs: [
            { label: 'Bucket', value: '0.93 m³' },
            { label: 'Weight', value: '19,800 kg' },
        ],
        description:
            'Versatile excavator with excellent fuel efficiency and low running cost.',
        color: '#3b82f6',
    },
    {
        id: 'exc-3',
        name: 'Hitachi ZX200',
        model: 'Hitachi Zaxis 200-7',
        category: 'Excavator',
        dailyRate: 1050,
        stock: 2,
        image: exc3,
        specs: [
            { label: 'Bucket', value: '0.90 m³' },
            { label: 'Weight', value: '20,500 kg' },
        ],
        description:
            'Reliable medium excavator for earthmoving, demolition and trenching.',
        color: '#ef4444',
    },
    {
        id: 'doz-1',
        name: 'CAT D6',
        model: 'Caterpillar D6 XE',
        category: 'Dozer',
        dailyRate: 1850,
        stock: 1,
        image: exc2,
        specs: [
            { label: 'Blade', value: 'SU 4.51 m' },
            { label: 'Weight', value: '22,700 kg' },
        ],
        description:
            'Electric drive dozer with superior fuel savings for heavy grading and pushing.',
        color: '#f97316',
    },
    {
        id: 'doz-2',
        name: 'Komatsu D85',
        model: 'Komatsu D85EX-18',
        category: 'Dozer',
        dailyRate: 2000,
        stock: 2,
        image: exc1,
        specs: [
            { label: 'Blade', value: 'SU 4.94 m' },
            { label: 'Weight', value: '28,800 kg' },
        ],
        description:
            'Large crawler dozer for bulk earthmoving, land clearing and heavy push work.',
        color: '#d97706',
    },
    {
        id: 'ldr-1',
        name: 'Volvo L90H',
        model: 'Volvo L90H Wheel Loader',
        category: 'Loader',
        dailyRate: 1300,
        stock: 3,
        image: exc3,
        specs: [
            { label: 'Bucket', value: '2.7 m³' },
            { label: 'Tip Load', value: '10,500 kg' },
        ],
        description:
            'Powerful wheel loader for loading, carrying and stockpiling bulk materials.',
        color: '#10b981',
    },
    {
        id: 'ldr-2',
        name: 'JCB 3CX',
        model: 'JCB 3CX Backhoe Loader',
        category: 'Loader',
        dailyRate: 850,
        stock: 5,
        image: tel1,
        specs: [
            { label: 'Dig Depth', value: '5.97 m' },
            { label: 'Weight', value: '8,420 kg' },
        ],
        description:
            'Versatile backhoe loader — load on the front, dig and trench on the back.',
        color: '#f59e0b',
    },
    {
        id: 'ldr-3',
        name: 'CAT 226D',
        model: 'CAT 226D3 Skid Steer',
        category: 'Loader',
        dailyRate: 650,
        stock: 6,
        image: tel1,
        specs: [
            { label: 'Rated Load', value: '998 kg' },
            { label: 'Weight', value: '2,870 kg' },
        ],
        description:
            'Compact skid steer loader ideal for confined sites and light earthmoving.',
        color: '#f97316',
    },
    {
        id: 'cmp-1',
        name: 'Dynapac CA2500',
        model: 'Dynapac CA2500D Roller',
        category: 'Compaction',
        dailyRate: 750,
        stock: 3,
        image: dmp1,
        specs: [
            { label: 'Drum Width', value: '2.13 m' },
            { label: 'Weight', value: '11,500 kg' },
        ],
        description:
            'Smooth drum vibratory roller for compacting sub-base and asphalt layers.',
        color: '#6366f1',
    },
    {
        id: 'tel-1',
        name: 'JLG 4017RS',
        model: 'JLG 4017RS Telehandler',
        category: 'Telehandler',
        dailyRate: 900,
        stock: 2,
        image: tel1,
        specs: [
            { label: 'Lift Height', value: '17.0 m' },
            { label: 'Capacity', value: '4,000 kg' },
        ],
        description:
            'Rotating telehandler for precise placement of materials at height on all terrains.',
        color: '#14b8a6',
    },
    {
        id: 'dmp-1',
        name: 'Volvo A25G',
        model: 'Volvo A25G ADT',
        category: 'Dump Truck',
        dailyRate: 1450,
        stock: 2,
        image: dmp1,
        specs: [
            { label: 'Payload', value: '24,000 kg' },
            { label: 'Body', value: '15.0 m³' },
        ],
        description:
            'Articulated dump truck for off-road haulage on rough and steep terrain.',
        color: '#22c55e',
    },
    {
        id: 'grd-1',
        name: 'CAT 140',
        model: 'Caterpillar 140 Motor Grader',
        category: 'Grader',
        dailyRate: 1650,
        stock: 1,
        image: grd1,
        specs: [
            { label: 'Blade', value: '3.66 m' },
            { label: 'Weight', value: '17,200 kg' },
        ],
        description:
            'Motor grader for fine grading, shaping and maintaining roads and pads.',
        color: '#a855f7',
    },
];
export const categories = [
    ...new Set(equipment.map((e) => e.category)),
] as EquipmentCategory[];
