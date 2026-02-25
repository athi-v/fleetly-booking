export interface Excavator {
  id: string;
  name: string;
  model: string;
  dailyRate: number;
  capacity: string;
  weight: string;
  description: string;
  color: string; // accent color for card header
}

export const excavators: Excavator[] = [
  {
    id: '1',
    name: 'CAT 320',
    model: 'Caterpillar 320 GC',
    dailyRate: 1200,
    capacity: '1.19 m³',
    weight: '20,300 kg',
    description: 'Mid-size hydraulic excavator ideal for general construction and earthmoving.',
    color: '#f59e0b',
  },
  {
    id: '2',
    name: 'Komatsu PC200',
    model: 'Komatsu PC200-8M0',
    dailyRate: 1100,
    capacity: '0.93 m³',
    weight: '19,800 kg',
    description: 'Versatile excavator with excellent fuel efficiency and low operating cost.',
    color: '#3b82f6',
  },
  {
    id: '3',
    name: 'Hitachi ZX200',
    model: 'Hitachi Zaxis 200-7',
    dailyRate: 1050,
    capacity: '0.90 m³',
    weight: '20,500 kg',
    description: 'Reliable performance for medium-scale excavation and demolition work.',
    color: '#ef4444',
  },
  {
    id: '4',
    name: 'Volvo EC220',
    model: 'Volvo EC220E',
    dailyRate: 1350,
    capacity: '1.06 m³',
    weight: '22,400 kg',
    description: 'Premium excavator with superior operator comfort and Eco mode.',
    color: '#10b981',
  },
  {
    id: '5',
    name: 'JCB JS220',
    model: 'JCB JS220 LC',
    dailyRate: 950,
    capacity: '1.00 m³',
    weight: '21,700 kg',
    description: 'Cost-effective option for earthmoving and civil engineering projects.',
    color: '#f97316',
  },
  {
    id: '6',
    name: 'Liebherr R920',
    model: 'Liebherr R 920 Compact',
    dailyRate: 1450,
    capacity: '0.80 m³',
    weight: '18,900 kg',
    description: 'Compact powerhouse built for tight urban sites with high precision.',
    color: '#8b5cf6',
  },
];
