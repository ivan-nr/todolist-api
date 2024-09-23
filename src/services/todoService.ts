import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import {
  CreateTodoInput,
  UpdateTodoInput,
  GetTodosQueryInput,
} from "../validators/todoValidator";

export const createTodo = async (input: CreateTodoInput, userId: number) => {
  const todo = await prisma.todo.create({
    data: {
      ...input,
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  return todo;
};

export const getTodos = async (userId: number, query: GetTodosQueryInput) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "id",
    sortOrder = "asc",
    search,
  } = query;

  const skip = (page - 1) * limit;

  const where: Prisma.TodoWhereInput = {
    userId,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [todos, total] = await Promise.all([
    prisma.todo.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.todo.count({ where }),
  ]);

  return { todos, total };
};

export const getTodoById = async (id: number, userId: number) => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  if (todo.userId !== userId) {
    throw new Error("Not authorized to view this todo");
  }

  return todo;
};

export const updateTodo = async (
  id: number,
  input: UpdateTodoInput,
  userId: number
) => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  if (todo.userId !== userId) {
    throw new Error("Not authorized to update this todo");
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: input,
  });

  return updatedTodo;
};

export const deleteTodo = async (id: number, userId: number) => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  if (todo.userId !== userId) {
    throw new Error("Not authorized to delete this todo");
  }

  await prisma.todo.delete({
    where: { id },
  });
};
