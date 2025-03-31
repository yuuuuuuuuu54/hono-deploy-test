import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { usersSchema } from './db/schema';

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;

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

export default app;
