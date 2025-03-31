/// <reference types="node" />
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema.ts',
	dialect: 'sqlite',
	driver: 'd1-http',
  // 本番環境では以下のものを外しておく。
	// dbCredentials: {
	// 	accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
	// 	databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
	// 	token: process.env.CLOUDFLARE_D1_TOKEN!,
	// },
});
