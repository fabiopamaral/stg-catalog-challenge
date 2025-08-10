export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
};

export type CartItem = {
  id: string;
  user_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
};

export type CartItems = CartItem & {
  product: Product;
};
