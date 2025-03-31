https://qiita.com/xYasi/items/925dc328f23f75c7cad0
これがローカルで開発するのに役立ちそうな情報

https://zenn.dev/moutend/articles/88beb607855a26
これがリモートにデプロイする際に役に立ちそうな情報
# hono-deploy-test


npx drizzle-kit generate
差分のsqlファイルはかせる

npx wrangler d1 migrations apply test-drizzle --local
これでローカルのdbに反映する
