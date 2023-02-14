export type NavItem = {
  name: string;
  path: string;
  submenu?: SubMenu;
};

export type SubMenu = {
  subtitle: string;
  items: Category[];
};

// export type Category = {
//   name: string;
//   path: string;
//   amount: string;
// };

export type View = 'table' | 'list';

// export type Book = {
//   id: string;
//   cover: string;
//   images: string[];
//   title: string;
//   category: string;
//   path: string;
//   rating: number;
//   author: string;
//   year: number;
//   booked: boolean;
//   endDate: string;
//   review: number;
// };

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

// real types

// BOOK DETAIL

export interface BookDetail {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: Image[];
  categories: string[];
  comments: Comment[] | null;
  booking: Booking | null;
  delivery: Delivery | null;
  histories: History[] | null;
}

export interface Booking {
  id: number;
  order: boolean;
  dateOrder: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
}

export interface Comment {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: User;
}

export interface User {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: null | string;
}

export interface Delivery {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  recipientId: number;
  recipientFirstName: string;
  recipientLastName: string;
}

export interface History {
  id: number;
  userId: number;
}

export interface Image {
  url: string;
}

// BOOKS

export interface Book {
  issueYear: string;
  rating: number | null;
  title: string;
  authors: string[];
  image: Image | null;
  categories: string[];
  id: number;
  booking: Booking | null;
  delivery: Delivery | null;
  histories: History[] | null;
}

export interface ServerError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, string>;
  };
}

export interface Category {
  name: string;
  path: string;
  id: number;
}

// export enum Category {
//   Бизнес = 'Бизнес',
//   Детские = 'Детские',
//   Дизайн = 'Дизайн',
//   НонФикшн = 'Нон-фикшн',
//   Программирование = 'Программирование',
//   Психология = 'Психология',
//   Родителям = 'Родителям',
//   Хобби = 'Хобби',
//   ХудожественнаяЛитература = 'Художественная литература',
// }
