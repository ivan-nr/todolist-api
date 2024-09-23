import { Request, Response } from "express";
import * as todoService from "../services/todoService";
import {
  createTodoSchema,
  updateTodoSchema,
  getTodosQuerySchema,
} from "../validators/todoValidator";
import { z } from "zod";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const validatedData = createTodoSchema.parse(req.body);
    const todo = await todoService.createTodo(validatedData, req.user!.id);
    res.status(201).json(todo);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const validatedQuery = getTodosQuerySchema.parse(req.query);
    const { todos, total } = await todoService.getTodos(
      req.user!.id,
      validatedQuery
    );
    res.status(200).json({
      data: todos,
      page: validatedQuery.page || 1,
      limit: validatedQuery.limit || 10,
      total,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await todoService.getTodoById(id, req.user!.id);
    res.status(200).json(todo);
  } catch (error: any) {
    res
      .status(error.message.includes("Not authorized") ? 403 : 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = updateTodoSchema.parse(req.body);
    const todo = await todoService.updateTodo(id, validatedData, req.user!.id);
    res.status(200).json(todo);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res
        .status(error.message.includes("Not authorized") ? 403 : 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await todoService.deleteTodo(id, req.user!.id);
    res.status(204).send();
  } catch (error: any) {
    res
      .status(error.message.includes("Not authorized") ? 403 : 500)
      .json({ error: error.message || "Internal server error" });
  }
};
