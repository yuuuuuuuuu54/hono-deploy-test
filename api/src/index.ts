import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { memoSchema, usersSchema } from './db/schema';

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => c.text('Hello World!'));
app.post('/test', async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.insert(usersSchema).values({
		name: 'test',
		email: 'test@test.com',
		password: 'test',
	});
	return c.json(result);
});
app.get('/test', async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(usersSchema);
	return c.json(result);
});

app.post('/test/memo', async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.insert(memoSchema).values({
		title: 'test',
		content: 'test',
	});
	return c.json(result);
});

app.get('/test/memo', async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(memoSchema);
	return c.json(result);
});



export default app;
