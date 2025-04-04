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

メモ
orvalで生成した関数がURLをハードコーディングしてしまう問題の解消方法(chat)

axiosInstance を使って baseURL を後付けで設定する（推奨）
orval は axios インスタンスを使ったカスタマイズが可能です。
以下のようにすれば、生成された関数にはURLが書かれず、axios側で制御できます。

ステップ：
`axiosInstance.ts` を作成

```
// src/api/axiosInstance.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
});
orval にこの axios を使わせる
```

```
// orval.config.ts
export default {
  myApi: {
    input: './openapi.yaml',
    output: {
      target: './src/api/client.ts',
      client: 'axios',
      override: {
        mutator: {
          path: './src/api/axiosInstance.ts',
          name: 'axiosInstance',
        },
      },
    },
  },
};
```
✅ こうするとどうなる？
orval が生成する関数はこうなる：

```
// 自動生成されたコード（抜粋）
export const getUser = (): Promise<User> => {
  return axiosInstance.get('/user'); // ← baseURL は別定義
};
💡 baseURL は環境変数（.env.production, .env.development など）で管理できる！
```
