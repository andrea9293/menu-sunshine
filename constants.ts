
import { WeekMenu, DayOfWeek, SnackConfig } from './types';

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

export const DEFAULT_SNACK: SnackConfig = {
  schedule: {
    'Lunedì': 'Gruppo Cereali',
    'Martedì': 'Gruppo Frutta e Verdura',
    'Mercoledì': 'Gruppo Latte e Derivati',
    'Giovedì': 'Gruppo Cereali',
    'Venerdì': 'Gruppo Frutta e Verdura'
  },
  groups: [
    {
      name: 'Gruppo Cereali',
      categories: [
        { name: 'Prodotti da Forno', items: 'Crackers, grissini, fette biscottate, biscotti da colazione, cereali' },
        { name: 'Pane', items: 'Panino con marmellata, miele o cioccolata' },
        { name: 'Dolce', items: 'Pan di Spagna, Plum cake, crostate' }
      ]
    },
    {
      name: 'Gruppo Frutta e Verdura',
      categories: [
        { name: 'Frutta Fresca', items: 'Mele, pere, kiwi, banane, mandarini, ecc.' },
        { name: 'Verdura', items: 'Carote, finocchi, cetrioli, pomodorini, ecc.' },
        { name: 'Frutta Secca', items: 'Mandorle, nocciole, noci, fichi, datteri, ecc.' }
      ]
    },
    {
      name: 'Gruppo Latte e Derivati',
      categories: [
        { name: 'Yoghurt', items: 'Bianco, alla frutta, con cereali o da bere' },
        { name: 'Formaggi', items: 'Parmigiano, grana, formaggini, ecc.' },
        { name: 'Latte', items: 'In brick con cannuccia' }
      ]
    }
  ],
  warning: 'Patatine, snack salati, merendine confezionate e bibite gasate'
};

export const DEFAULT_START_DATE = "2026-01-07"; // Mercoledì
export const STORAGE_KEY = "sunshine_menu_config";
