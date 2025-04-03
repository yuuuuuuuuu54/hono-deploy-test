import { drizzle } from 'drizzle-orm/d1';
import { todosSchema } from './db/schema';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { createTodoResponseSchema, createTodoSchema, todosResponseSchema } from './handler/schema/todo';
import { cors } from 'hono/cors';

type Bindings = {
	DB: D1Database;
};

const openApiapp = new OpenAPIHono<{ Bindings: Bindings }>();

// CORSミドルウェアを追加
openApiapp.use('/*', cors());

const getTodosRoute = createRoute({
	method: 'get',
	path: '/todos',
	responses: {
		200: {
			description: 'Todo list',
			content: {
				'application/json': {
					schema: todosResponseSchema,
				},
			},
		},
	},
});

openApiapp.openapi(getTodosRoute, async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(todosSchema);
	return c.json(
		result.map((todo) => ({
			id: todo.id.toString(),
			title: todo.title,
			completed: todo.completed === 1,
		}))
	);
});

const createTodoRoute = createRoute({
	method: 'post',
	path: '/todo',
	request: {
		body: {
			content: {
				'application/json': {
					schema: createTodoSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				'application/json': {
					schema: createTodoResponseSchema,
				},
			},
			description: 'Todo created',
		},
	},
});

openApiapp.openapi(createTodoRoute, async (c) => {
	const newTodo = c.req.valid('json');
	const db = drizzle(c.env.DB);
	await db.insert(todosSchema).values({
		title: newTodo.title,
		completed: newTodo.completed ? 1 : 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});
	return c.json({
		id: '1',
		title: newTodo.title,
		completed: newTodo.completed,
	});
});

openApiapp.doc('/openapi.json', {
	openapi: '3.1.0',
	info: {
		title: 'Todo API',
		version: '1.0.0',
	},
});

export default openApiapp;
