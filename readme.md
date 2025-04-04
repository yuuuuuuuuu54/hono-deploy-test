https://qiita.com/xYasi/items/925dc328f23f75c7cad0
これがローカルで開発するのに役立ちそうな情報

https://zenn.dev/moutend/articles/88beb607855a26
これがリモートにデプロイする際に役に立ちそうな情報
# hono-deploy-test


npx drizzle-kit generate
差分のsqlファイルはかせる

npx wrangler d1 migrations apply test-drizzle --local
これでローカルのdbに反映する



スキーマの変更をしたら
```
curl http://localhost:8787/openapi.json > openapi.json
npx orval --config orval.config.ts
```

いづれもフロントで実行すること。

使用スタック
* cloudflare workers
* cloudflare d1
* hono
* typescript
* zod
* openAPI
* orval
* react

上記の様な構成でopenapiのjsonファイルからorvalを使用してクライアント側のAPIコールの関数を作成して通信をする。
デプロイにはworkersを使用する予定

今回は単純な作成と削除だけを実行するアプリケーションを作成する。

