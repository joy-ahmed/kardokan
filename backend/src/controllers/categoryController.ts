import type { Request, Response } from "express";
import prisma from "../../prisma/db";

// @desc    Get all categories
// @route   GET /api/categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single category
// @route   GET /api/categories/:id
export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res
      .status(201)
      .json({ success: "Category created successfully", category });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });
    res.json({ success: "Category updated successfully", category });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id },
    });
    res.json({ success: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
