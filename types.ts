
export type DayOfWeek = 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì';

export interface WeekMenu {
  id: number;
  days: Record<DayOfWeek, string>;
}

export interface SnackCategory {
  name: string;
  items: string;
}

export interface SnackGroup {
  name: string;
  categories: SnackCategory[];
}

export interface SnackConfig {
  schedule: Record<DayOfWeek, string>;
  groups: SnackGroup[];
  warning: string;
}

export interface AppConfig {
  startDate: string; // ISO string
  menu: WeekMenu[];
  snack: SnackConfig;
}

export type TabType = 'daily' | 'full' | 'settings';
