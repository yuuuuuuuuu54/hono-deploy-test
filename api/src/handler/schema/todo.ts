import { z } from '@hono/zod-openapi'

export const todoSchema = z.object({
  id: z.string().openapi({
    example: '1',
  }),
  title: z.string().openapi({
    example: 'Buy groceries',
  }),
  completed: z.boolean().openapi({
    example: false,
  }),
})
.openapi('Todo')

export const todoResponseSchema = z.object({todos: z.array(todoSchema).openapi('Todos'),})

export const todosResponseSchema = z.array(todoSchema).openapi('Todos')

export const createTodoSchema = todoSchema.omit({ id: true })

export const createTodoResponseSchema = todoSchema

export const updateTodoSchema = todoSchema.pick({ title: true, completed: true })