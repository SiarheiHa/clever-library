import { Feature } from '../types/types';

const features: Feature[] = [
  'publishing',
  'year',
  'pages',
  'coverType',
  'format',
  'genre',
  'weight',
  'isbn',
  'manufacturer',
];

const vocabulary: Record<Feature, string> = {
  publishing: 'Издательство',
  year: 'Год издания',
  pages: 'Страниц',
  coverType: 'Переплет',
  format: 'Формат',
  genre: 'Жанр',
  weight: 'Вес',
  isbn: 'ISBN',
  manufacturer: 'Изготовитель',
};

const BOOK_FEATURES_MOCK: Record<Feature, string> = {
  publishing: 'Питер',
  year: '2019',
  pages: '288',
  coverType: 'Мягкая обложка',
  format: '70х100',
  genre: 'Компьтерная литература',
  weight: '370 г',
  isbn: '978-5-4461-0923-4',
  manufacturer: 'ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29',
};

export { BOOK_FEATURES_MOCK, features, vocabulary };
