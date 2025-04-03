// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
  todo: {
    input: "./openapi.json", // backendから取得したOpenAPIファイル
    output: {
      target: "./src/api/todo.ts", // 生成する場所
      client: "react-query", // axios | react-query
      baseUrl: "http://localhost:8787",
    },
  },
});
