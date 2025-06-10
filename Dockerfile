# マルチステージビルドを使用してイメージサイズを最適化
FROM node:18-alpine AS builder

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール（開発依存関係も含む）
RUN npm ci

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 本番用のNginxイメージ
FROM nginx:alpine

# ビルドされたファイルをNginxの公開ディレクトリにコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginxの設定ファイルをコピー（SPAルーティング対応）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ポート80を公開
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
