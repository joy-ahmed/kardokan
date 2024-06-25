// src/types/Product.ts
export interface Category {
    id: string;
    name: string;
  }
  
  export interface ProductCategory {
    productId: string;
    categoryId: string;
    category: Category;
  }
  
  export interface Image {
    id: string;
    type: string;
    url: string;
    productId: string | null;
    variantId: string | null;
  }
  
  export interface Variant {
    id: string;
    variantName: string;
    variantValue: string;
    variantPrice: number;
    variantInStock: number;
    productId: string;
    images: Image[];
  }
  
  export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    inStock: number;
    price: number;
    discount: number | null;
    catalogue: string;
    categories: ProductCategory[];
    variants: Variant[];
    images: Image[];
  }
  