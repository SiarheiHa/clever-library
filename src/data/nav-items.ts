import { NavItem } from '../types/types';

const userControllItems: NavItem[] = [
  {
    name: 'Профиль',
    path: 'profile',
  },
  {
    name: 'Выход',
    path: 'singout',
  },
];

const testIds: Record<string, string> = {
  'books/all': 'showcase',
  terms: 'terms',
  contract: 'contract',
};

export { userControllItems, testIds };
