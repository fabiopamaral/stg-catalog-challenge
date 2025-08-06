export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
      };
    };
  };
};
