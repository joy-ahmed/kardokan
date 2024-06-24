import type { Request, Response } from "express";
import prisma from "../../prisma/db";
import { Prisma } from "@prisma/client";

type ProductSchema = Prisma.ProductCreateInput;
type VariantSchema = Prisma.VariantCreateInput;
type CategorySchema = Prisma.CategoryCreateInput;
type CatalogSchema = Prisma.CatalogCreateInput;

// @desc    Get all products
// @route   GET /api/products
export const getProducts = (req: Request, res: Response) => {
  res.json({ message: "all products" });
};

// @desc    Get a single product
// @route   GET /api/products/:id
export const getProduct = (req: Request, res: Response) => {
  res.json({ message: "single product" });
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (
  req: Request<ProductSchema>,
  res: Response
) => {
  const {
    title,
    description,
    price,
    available,
    style,
    images,
    variants,
    categories,
    catalogs,
  } = req.body;

  try {
    // Generate slug
    let slug = title.toLowerCase().replace(/\s/g, "-");
    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });
    if (existingProduct) {
      slug = `${slug}-${Date.now()}`;
    }
    // Create product
    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price,
        available,
        style,
        images: {
          create: images,
        },
        categories: {
          create: categories?.map((cat: CategorySchema) => ({
            Category: {
              connectOrCreate: {
                where: { name: cat.name },
                create: {
                  name: cat.name,
                  description: cat.description || "",
                },
              },
            },
          })),
        },
        variants: variants
          ? {
              create: variants.map((variant: VariantSchema) => ({
                name: variant.name,
                price: variant.price,
                available: variant.available,
                images: {
                  create: variant.images,
                },
              })),
            }
          : undefined,
        catalogs: {
          create: catalogs?.map((catalog: CatalogSchema) => ({
            Catalog: {
              connectOrCreate: {
                where: { name: catalog.name },
                create: { name: catalog.name },
              },
            },
          })),
        },
      },
      include: {
        variants: true,
        categories: {
          include: {
            Category: true,
          },
        },
        catalogs: {
          include: {
            Catalog: true,
          },
        },
      },
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};
