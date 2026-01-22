
export type DayOfWeek = 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì';

export interface WeekMenu {
  id: number;
  days: Record<DayOfWeek, string>;
}

export interface AppConfig {
  startDate: string; // ISO string
  menu: WeekMenu[];
}

export type TabType = 'daily' | 'full' | 'settings';
