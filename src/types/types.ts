export type NavItem = {
  name: string;
  path: string;
  submenu?: SubMenu;
};

export type SubMenu = {
  subtitle: string;
  items: Category[];
};

export type Category = {
  name: string;
  path: string;
  amount: string;
};

export type View = 'table' | 'list';

export type Book = {
  id: string;
  cover: string;
  images: string[];
  title: string;
  category: string;
  path: string;
  rating: number;
  author: string;
  year: number;
  booked: boolean;
  endDate: string;
  review: number;
};

export type Feature =
  | 'publishing'
  | 'year'
  | 'pages'
  | 'coverType'
  | 'format'
  | 'genre'
  | 'weight'
  | 'isbn'
  | 'coverType'
  | 'manufacturer';

export interface Review {
  id: string;
  user: string;
  date: string;
  rating: number;
  text: string;
}
