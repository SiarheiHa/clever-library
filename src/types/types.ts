export type NavItem = {
  name: string;
  path: string;
  submenu?: SubMenu;
};

export type SubMenu = {
  subtitle: string;
  items: Category[];
};

export type View = 'table' | 'list';

export type Feature =
  | 'publish'
  | 'issueYear'
  | 'pages'
  | 'cover'
  | 'format'
  | 'categories'
  | 'weight'
  | 'ISBN'
  | 'producer';

export interface BookDetail {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string;
  description: string | null;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: Image[] | null;
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
  user: Сommentator;
}

export interface Сommentator {
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

export type RegistrationFormData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type AuthFormData = {
  identifier: string;
  password: string;
};

export type EmailFormData = {
  email: string;
};

export type ResetPassFormData = {
  password: string;
  passwordConfirmation: string;
};

export interface User {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UserInfo {
  jwt: string | null;
  user: User | null;
}

export type UserState = {
  loading: boolean;
  userInfo: UserInfo | null;
  error: 1 | 400 | null;
  success: boolean;
};

export type AuthState = {
  loading: boolean;
  error: 1 | 400 | null;
  success: boolean;
  userAuthData: UserAuthData | null;
};

export type UserAuthData = {
  idToken: string;
  email: string | null;
  uid: string;
};

export type ForgotPassState = {
  loading: boolean;
  errorMessage: string | null;
  error: 1 | 400 | null;
  success: boolean;
};

// comment post

export interface CommentResponseData {
  data: CommentData;
  meta: object;
}

interface CommentData {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type CommentRequestData = {
  data: {
    rating: number;
    text: string;
    book: string;
    user: string;
  };
};

// booking

export type ChangeBookingRequestData = {
  bookingId: string;
  data: {
    order: boolean;
    dateOrder: string;
    book: string;
    customer: string;
  };
};

export type BookingRequestData = {
  data: {
    order: boolean;
    dateOrder: string;
    book: string;
    customer: string;
  };
};

export interface BookingResponseData {
  data: BookingData;
  meta: object;
}

export interface BookingData {
  id: number;
  attributes: BookingAttributes;
}

export interface BookingAttributes {
  order: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  dateOrder: Date;
}

export interface UserDetail extends Omit<User, 'provider'> {
  role: Role | null;
  comments: Comment[] | null;
  avatar: string | null;
  booking: Booking | null;
  delivery: Delivery | null;
  history: History | null;
}

interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
}

export type UploadResponseData = Array<{
  id: number;
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null | string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    large: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null | string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    medium: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null | string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null | string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null | string;
  createdAt: string;
  updatedAt: string;
}>;

export type UpdateAvatarRequestData = { id: string; data: { avatar: number } };

export type UpdateUserRequestData = { id: string; data: RegistrationFormData };

export interface UserFormFields extends Pick<UserDetail, 'email' | 'firstName' | 'lastName' | 'id' | 'phone'> {
  login: string;
  password: string;
}
