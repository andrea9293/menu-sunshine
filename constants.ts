
import { WeekMenu, DayOfWeek } from './types';

export const DAYS_LIST: DayOfWeek[] = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];

export const DEFAULT_MENU: WeekMenu[] = [
  {
    id: 1,
    days: {
      'Lunedì': 'Ditalini con lenticchie',
      'Martedì': 'Riso al pomodoro',
      'Mercoledì': 'Pasta con patate',
      'Giovedì': 'Pennette alla bolognese',
      'Venerdì': 'Ditalini con fagioli'
    }
  },
  {
    id: 2,
    days: {
      'Lunedì': 'Riso con minestrone',
      'Martedì': 'Gnocchetti al sugo',
      'Mercoledì': 'Ditalini con lenticchie',
      'Giovedì': 'Fusilli al sugo con ricotta',
      'Venerdì': 'Ditalini con ceci'
    }
  },
  {
    id: 3,
    days: {
      'Lunedì': 'Pasta con piselli',
      'Martedì': 'Fusilli al pomodoro',
      'Mercoledì': 'Pasta con fagioli',
      'Giovedì': 'Pennette alla bolognese',
      'Venerdì': 'Riso e patate'
    }
  },
  {
    id: 4,
    days: {
      'Lunedì': 'Ditalini con lenticchie',
      'Martedì': 'Pasta con zucca',
      'Mercoledì': 'Pasta e fagioli',
      'Giovedì': 'Pasta al sugo',
      'Venerdì': 'Riso con verza o pasta con patate'
    }
  }
];

export const DEFAULT_START_DATE = "2026-01-07"; // Mercoledì
export const STORAGE_KEY = "sunshine_menu_config";
