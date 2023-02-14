import { Category, NavItem } from '../types/types';

const categories: Category[] = [
  {
    name: 'Бизнес-книги',
    path: 'books/business',
    amount: '14',
  },
  {
    name: 'Детективы',
    path: 'books/detective',
    amount: '8',
  },
  {
    name: 'Детские книги',
    path: 'books/children',
    amount: '10',
  },
  {
    name: 'Зарубежная литература',
    path: 'books/foreign',
    amount: '2',
  },
  {
    name: 'История',
    path: 'books/history',
    amount: '5',
  },
  {
    name: 'Классическая литература',
    path: 'books/classic',
    amount: '12',
  },
  {
    name: 'Книги по психологии',
    path: 'books/psychology',
    amount: '11',
  },
  {
    name: 'Компьютерная литература',
    path: 'books/computers',
    amount: '54',
  },
  {
    name: 'Культура и искусство',
    path: 'books/culture',
    amount: '0',
  },
  {
    name: 'Наука и образование',
    path: 'books/science',
    amount: '2',
  },
  {
    name: 'Публицистическая литература',
    path: 'books/publicistic',
    amount: '0',
  },
  {
    name: 'Справочники',
    path: 'books/references',
    amount: '10',
  },
  {
    name: 'Фантастика',
    path: 'books/scifi',
    amount: '12',
  },
  {
    name: 'Юмористическая литература',
    path: 'books/humor',
    amount: '8',
  },
];

const navItems: NavItem[] = [
  {
    name: 'Витрина книг',
    path: 'books/all',
    submenu: {
      subtitle: 'Все книги',
      items: categories,
    },
  },
  {
    name: 'Правила пользования',
    path: 'terms',
  },
  {
    name: 'Договор оферты',
    path: 'contract',
  },
];

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

export { categories, navItems, userControllItems, testIds };
