export type user = {
  _id: string;
  name: string;
  lastname: string;
  role: number | null;
  email: string;
  phone: string;
  phone_verify: boolean;
  email_verify: boolean;
  address: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type category = {
  _id: string;
  type: ["blog", "product", "training"];
  category_parent: string;
  title: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  children?: Category[];
  is_original: boolean;
  image: string;
};
export type property = {
  _id: string;
  title: string;
  type: "input" | "selector" | "multiple_selection";
  category: string;
  body: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type product = {
  _id: string;
  title: string;
  category: category;
  active_status: boolean;
  low_description: string;
  full_description: string;
  price: number;
  gallery: { _id: string; color: color; file: string }[];
  image: string;
  thumbnail: string;
  score: number;
  count_available: {
    _id: string;
    color: color;
    size: size;
    count: number | string;
  }[];
  count_purchased: number;
  discount: string;
  color: color[];
  size: size[];
  createdAt: Date | string;
  updatedAt: Date | string;
  properties: string[];
};
export type color = {
  _id: string;
  title: string;
  english_title: string;
  color_code: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type size = {
  _id: string;
  title: string;
  english_title: string;
  size: string;
  updatedAt: Date | string;
  createdAt: Date | string;
};
export type cart = {
  _id: string;
  user: string;
  product: product;
  color: color;
  size: size;
  count_order: number;
  coupon: {};
  updatedAt: Date | string;
  createdAt: Date | string;
};

export type code_post = {
  _id: string;
  user: user;
  title: string;
  postal_code: string;
  is_verify: boolean;
  updatedAt: Date | string;
  createdAt: Date | string;
};

export type order = {
  _id: string;
  active_order: boolean;
  title: string;
  zip_code: string;
  status: number;
  is_paid: boolean;
  pay_ment: string;
  receiver_delivery: string;
  description: string;
  user: user;
  purchases: { product: product; color: color; size: size; count: number }[];
  amount: number;
  updatedAt: Date | string;
  createdAt: Date | string;
};

export type payment_transactions = {
  _id: string;
  order: order;
  status: number;
  pay_ment: string;
  user: user | string;
  authority_payment: string;
  authority_transaction: string;
  amount: number;
  updatedAt: Date | string;
  createdAt: Date | string
};
