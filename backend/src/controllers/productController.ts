import type { Request, Response } from "express";
import prisma from "../../prisma/db";
import type { ProductSchema } from "../services/types";

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        variants: {
          include: {
            images: true,
          },
        },
        images: true,
      },
    });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single product
// @route   GET /api/products/:id
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        variants: {
          include: {
            images: true,
          },
        },
        images: true,
      },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (req: Request, res: Response) => {
  const {
    title,
    description,
    inStock,
    price,
    discount,
    categoryId,
    catalogue,
    variants,
    images,
  } = req.body as ProductSchema;

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
        inStock,
        price,
        discount,
        catalogue,
        categories: {
          create: {
            category: {
              connect: { id: categoryId },
            },
          },
        },
        variants: variants
          ? {
              create: variants.map((variant) => ({
                variantName: variant.variantName,
                variantValue: variant.variantValue,
                variantPrice: variant.variantPrice,
                variantInStock: variant.variantInStock,
                images: {
                  create: variant.images.map((image) => ({
                    type: image.type,
                    url: image.url,
                  })),
                },
              })),
            }
          : undefined,
        images: {
          create: images.map((image) => ({
            type: image.type,
            url: image.url,
          })),
        },
      },
    });

    res.status(201).json({ success: "Product created successfully", product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/// @desc    Update product
// @route   PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    inStock,
    price,
    discount,
    categoryId,
    catalogue,
    variants,
    images,
  } = req.body as ProductSchema;

  try {
    // Generate slug if title is changed
    let slug = title.toLowerCase().replace(/\s/g, "-");
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });
    if (existingProduct && existingProduct.id !== id) {
      slug = `${slug}-${Date.now()}`;
    }

    const updatedProductData: any = {
      title,
      slug,
      description,
      inStock,
      price,
      discount,
      catalogue,
      categories: {
        deleteMany: {}, // Clear existing relations
        create: {
          category: {
            connect: { id: categoryId },
          },
        },
      },
    };

    if (variants) {
      updatedProductData.variants = {
        deleteMany: {}, // Clear existing variants
        create: variants.map((variant) => ({
          variantName: variant.variantName,
          variantValue: variant.variantValue,
          variantPrice: variant.variantPrice,
          variantInStock: variant.variantInStock,
          images: {
            create: variant.images.map((image) => ({
              type: image.type,
              url: image.url,
            })),
          },
        })),
      };
    }

    if (images) {
      updatedProductData.images = {
        deleteMany: {}, // Clear existing images
        create: images.map((image) => ({
          type: image.type,
          url: image.url,
        })),
      };
    }

    const product = await prisma.product.update({
      where: { id },
      data: updatedProductData,
    });

    res.json({ success: "Product updated successfully", product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    delete a product
// @route   POST /api/products/:id

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
