// src/types.ts
export interface ProductSchema {
  title: string;
  slug: string;
  description: string;
  inStock: number;
  price: number;
  discount?: number;
  categoryId: string;
  catalogue: string;
  variants: VariantSchema[];
  images: ImageSchema[];
}

export interface VariantSchema {
  variantName: string;
  variantValue: string;
  variantPrice: number;
  variantInStock: number;
  images: ImageSchema[];
}

export interface ImageSchema {
  type: string;
  url: string;
}
